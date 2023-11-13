/**/

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

/* Micro to handle all reading of data (by doctors), with external endpoint. */

export default class Reader extends AEndpoint {
    constructor() {
        super();
        this.port = 31005;
        this.name = "Reader";
        this.store = new Storage();
    }

    initExternalListeners() {
        super.initExternalListeners();
        this.initGetter();
    }
    
    initGetter() {
        this.app.get("/get-readings/:id/:from/:to", (req, res) => {
            let { id, from, to } = req.params;
            
            this.getReadings(id, new Date(from), new Date(to))
                .then(outcome => {
                    let { ok, status, content } = outcome;
                    res.ok = ok;
                    res.status = status
                    res.send(content)
                });
        });
    }
    
    wireToPubSub() /* ok */ {
        /* No operations: not a pub-sub publisher or subscriber. */
    }
    
    async getReadings(id, from, to) {
        let readings = await this.store.getPatientReadings(id, from, to);
        return this.interpretReadings(readings);
    }
    
    interpretReadings(readings) {
        if (!Array.isArray(readings)) {
            return { 
                ok: false, status: 400, 
                content: "Bad request contents.  No readings returned.  Please review your input." 
            };
        }
        
        if (readings.length === 0) {
            return {
                ok: true, status: 200,
                content: "Request did not match any data.  No readings returned.  Please review your input."
            };
        }
        
        return { ok: true, status: 200, content: readings };
    }
    
    run() {
        super.run();
        this.store.init();
    }
}

