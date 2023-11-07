/**/

/* structure for one reading for one patient; some elements probably arbitrary */

export class Reading {
    data;
    
    /* readings arg has to be an array of key-value arrays, like [ [k,v], [k,v] ]*/
    constructor(data) {
        this.data = new Map(data);
    }
}
