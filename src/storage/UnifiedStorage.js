/**/

/* Represents all data used in the system at present, aside from security info. */

/* The structure is by patient, then by day, then by hour. */

export class UnifiedStorage {
    patients;
    
    constructor() {
        patients = [ ];
    }
}
