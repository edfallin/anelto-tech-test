/**/

/* structure for one reading for one patient; some elements probably arbitrary */

export class PatientReading {
    patientId;
    readings;
    
    /* readings arg has to be an array of key-value arrays, like [ [k,v], [k,v] ]*/
    constructor(patientId, readings) {
        this.patientId = patientId;
        this.readings = new Map(readings);
    }
}
