/**/

/* Micro to handle all writing (storing) of data, with external endpoint. */

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

export class Writer extends AEndpoint {
    
    constructor() {
        super();
        this.port = 31001;
        this.name = "Writer";
    }

    initExternalListeners() {
        super.initExternalListeners();
        this.initAdder();
    }
    
    initAdder() {
        this.app.post("/add-reading/", (req, res) => {
            let outcome = this.storeReading(req.body);
            res.ok = true;  // No new URL, so not 201 created.
        });
    }
    
    wireToPubSub() {
        /* Wires to write to pub-sub only. */
    }

    storeReading(json) {
        /* %cruft : instead of using storage directly, sends to pub-sub */
    
        console.log(`cruft : json:`, json);
        
        if (json.systolic - json.diastolic > 50) {
            return "Range is wide";
        }

        return "Range is narrow";
    }

    // isValidReading(json) {
    // }

}

let writer = new Writer();
writer.run();


/* %cruft : perhaps factor common code here and in Reader to a superclass */

