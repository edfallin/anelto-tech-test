/**/

import MongoClient from "mongodb";

export default class Storage {
    store;
    
    constructor() {
        /* No operations. */
    }
    
    async init() {
        let client = await new MongoClient(`mongodb://127.0.0.1:27017`, { useUnifiedTopology: true });
        await client.connect();
        this.store = client.db("local");
    }
    
    storePatient(patient) { }
    
    unstorePatient() { }
    
    storeReading(reading) { }
    
    getPatientReadings() { }
    
}
