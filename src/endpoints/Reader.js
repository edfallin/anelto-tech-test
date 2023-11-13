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
        this.app.get("get-readings/:id/:from/:to", (req, res) => {
            let { id, from, to } = req.params;
            console.log(`cruft : id, from, to:`, id, ",", from, ",", to);
        });
    }
    
    wireToPubSub() {
        /* No operations: not a pub-sub publisher or subscriber. */
    }
    
    getReadings(id, from, to) {
        return this.store.getPatientReadings(id, from, to);
    }
    
    run() {
        super.run();
        this.store.init();
    }
}

