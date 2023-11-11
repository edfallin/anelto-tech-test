/**/

import { Storage } from "../storage/Storage.js";

/* micro to handle all writing (storing) of data (by devices) */

/* details perhaps partly based on Express routers */

export class Writer {
    init() {
        // registers self to pub-sub with HTTP fetch
    }

    storeReading(json) {
        console.log(`cruft : json:`, json);
        
        if (json.systolic - json.diastolic > 50) {
            return "Wide";
        }

        return "Narrow";
    }

    isValidReading(json) {
    }

}

