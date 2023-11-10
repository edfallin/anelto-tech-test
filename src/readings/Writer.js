/**/

/* micro to handle all writing (storing) of data (by devices) */

/* details perhaps partly based on Express routers */

export class Writer {
    storeReading(json) {
        console.log(`cruft : json:`, json);
        
        if (json.reading === true) {
            return true;
        }

        return false;
    }
 
    run() { }
}

let writer = new Writer();

/* run() should start receiver, etc., maybe just wire together event handling */
writer.run();
