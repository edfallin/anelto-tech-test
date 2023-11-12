/**/

import { MongoClient } from "mongodb";

export default class Storage {
    store;
    patients;
    
    constructor() {
        /* No operations. */
    }
    
    async init() {
        let client = await new MongoClient(`mongodb://127.0.0.1:27017`);
        await client.connect();
        this.store = client.db("local");
        this.patients = this.store.collection("patients");
    }
    
    async storePatient(patient) {
        let patientId = patient.patientId;
        let existing = await this.patients.findOne({ patientId });
        
        if (existing) {
            return `Patient with ID ${ patientId } already exists.  Not adding.`;
        }
        
        let result = await this.patients.insertOne(patient);
        return result;
    }
    
    async unstorePatient(patientId) {
        let existing = await this.patients.findOne({ patientId });
        
        if (!existing) {
            return `Patient with ID ${ patientId } does not exist.  Not deleting.`;
        }
        
        /* Patient readings are dropped as well as patient. */
        
        // Must come first because .patients is searched.
        let readings = await this.#getReadingCollectionFor(patientId);
        readings.drop();
        
        let result = await this.patients.deleteOne({ patientId });
        return result;
     }
    
    async storeReading(reading) {
        let readings = await this.#getReadingCollectionFor(reading.patientId);
        let result = await readings.insertOne(reading);
        return result;
     }
    
    async getPatientReadings(patientId, from, to) { 
        let collection = await this.#getReadingCollectionFor(patientId);
        let result = await collection.find({ });
        return result;
    }
    
    async #getReadingCollectionFor(patientId) {
        let patient = await this.patients.findOne({ patientId });
        let uid = patient._id;
        let collection = this.store.collection(`readings-${ uid }`);
        return collection;
    }
    
}
