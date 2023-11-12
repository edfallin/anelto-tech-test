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
        let existing = await this.patients.findOne({ patientId: patient.patientId });
        
        if (existing) {
            return true;
        }
        
        let result = await patients.insertOne(patient);
        return result;
    }
    
    async unstorePatient(patientId) {
        let existing = await this.patients.findOne({ patientId });
        
        if (!existing) {
            return false;
        }
        
        let result = await this.patients.deleteOne({ patientId });
     }
    
    async storeReading(reading) {
        let patient = await this.patients.findOne({ patientId: reading.patientId });
        let uid = patient._id;
        let readings = this.store.collection(`readings-patient-${ uid }`);

        let result = await readings.insertOne(reading);
        return result;
     }
    
    async getPatientReadings(patientId, from, to) { 
        let patient = await this.patients.findOne({ patientId });
    }
    
    async #getReadingCollectionFor(patientId) {
        let patient = await this.patients.findOne({ patientId });
        let uid = patient._id;  // ObjectId() not needed for naming use.
        let collection = this.store.collection(`readings-${ uid }`);
        return collection;
    }
    
}
