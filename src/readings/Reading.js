/**/

/* Structure for one reading for one patient; blood pressure chosen as an obvious topic. */

export class Reading {
    patientId;
    timestamp;
    systolic;
    diastolic;
    
    constructor(patientId, systolic, diastolic) {
        this.patientId = patientId;
        this.timestamp = new Date();
        this.systolic = systolic;
        this.diastolic = diastolic;
    }
}
