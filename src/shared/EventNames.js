/**/

/* Lists all events that may be listened to by system's microservices. */

export class EventNames {
    // Readings domain.
    static addReading = "AddReading";
    static getReadings = "GetReadings";

    // Patients domain.
    static addPatient = "AddPatient";
    static removePatient = "RemovePatient";

    // Fail condition.
    static noSuchEvent = "NoSuchEvent";
    
    static namesList() {
        return [ EventNames.addReading, EventNames.getReadings, 
                 EventNames.addPatient, EventNames.removePatient, 
                 EventNames.noSuchEvent ];
    }
}
