/**/

/* Structure for one reading for one patient; blood pressure chosen as an obvious topic. */

export class Reading {
    patientId;
    systolic;
    diastolic;
    
    constructor(patientId, systolic, diastolic) {
        this.patientId = patientId;
        this.systolic = systolic;
        this.diastolic = diastolic;
    }
}
