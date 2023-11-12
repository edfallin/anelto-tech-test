/**/

import { MongoClient } from "mongodb";

export default class Storage {
    db;
    patients;
    
    constructor() /* ok */ {
        /* No operations. */
    }
    
    async init() /* ok */ {
        let client = await new MongoClient(`mongodb://127.0.0.1:27017`);
        await client.connect();
        this.db = client.db("local");
        this.patients = this.db.collection("patients");
    }
    
    async storePatient(patient) /* verified */ {
        let patientId = patient.patientId;
        let existing = await this.patients.findOne({ patientId });
        
        if (existing) {
            let already = { 
                acknowledged: false,
                already: true,
                message: `Patient with ID ${ patientId } already exists.  Not re-added.` 
            };
            return already;
        }
        
        let result = await this.patients.insertOne(patient);
        return result;
    }
    
    async unstorePatient(patientId) /* verified */ {
        let existing = await this.patients.findOne({ patientId });
        
        if (!existing) {
            return `Patient with ID ${ patientId } does not exist.  Not re-deleted.`;
        }
        
        /* Patient readings are dropped as well as patient. */
        
        // Must come first because .patients is searched.
        let readings = await this.#getReadingCollectionFor(patientId);
        readings.drop();
        
        let result = await this.patients.deleteOne({ patientId });
        return result;
     }
    
    async storeReading(reading) /* verified */ {
        let readings = await this.#getReadingCollectionFor(reading.patientId);
        let result = await readings.insertOne(reading);
        return result;
     }
    
    async getPatientReadings(patientId, from, to) /* verified */ { 
        let collection = await this.#getReadingCollectionFor(patientId);
        let result = await collection.find(
            { 
                $and: [
                    { patientId: patientId },
                    { timestamp: { $gte: from } },
                    { timestamp: { $lte: to } }
                  ] 
            } );
        return result.toArray();
    }
    
    async #getReadingCollectionFor(patientId) /* verified */ {
        let patient = await this.patients.findOne({ patientId });
        let uid = patient._id;
        let collection = this.db.collection(`readings-${ uid }`);
        return collection;
    }
    
}
