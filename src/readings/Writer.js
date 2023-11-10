/**/

/* micro to handle all writing (storing) of data (by devices) */

/* details perhaps partly based on Express routers */

export class Writer {
    storeReading(json) {
        console.log(`cruft : json:`, json);
        
        if (json.systolic - json.diastolic > 50) {
            return "Wide";
        }

        return "Narrow";
    }
 
    run() { }
}

let writer = new Writer();

/* run() should start receiver, etc., maybe just wire together event handling */
writer.run();
