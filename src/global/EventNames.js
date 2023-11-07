/**/

/* Lists all events that may be listened to by system's microservices. */

public class EventNames {
    // Readings domain.
    static addReading = "AddReading";
    static getReadings = "GetReadings";

    // Patients domain.
    static addPatient = "AddPatient";
    static removePatient = "RemovePatient";
    
    // Fail condition.
    static noSuchEvent = "NoSuchEvent";
}
