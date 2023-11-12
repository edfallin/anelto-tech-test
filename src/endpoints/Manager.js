/**/

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

/* %cruft : adding and subtracting patients */

export default class Manager extends AEndpoint {
    store;
    
    constructor() {
        super();
        this.port = 31005;
        this.name = "Manager";
        this.store = new Storage();
    }
    
    initExternalListeners() {
        super.initExternalListeners();
        this.initAdder();
        this.initRemover();
    }
    
    initAdder() {
        this.app.post("/add-patient/", (req, res) => {
            let outcome = this.storePatient(req.body);
            res.ok = outcome.ok;
            res.status = outcome.status;
            res.send(outcome.content);
        });
    }
    
    initRemover() {
        this.app.delete("/remove-patient/", (req, res) => {
            res.ok = true;
            res.send();
        });
    }
    
    wireToPubSub() {
        /* No operations: not a pub-sub publisher or subscriber. */
    }
    
    storePatient(patient) {
        let raw = this.store.storePatient(patient);
        return this.interpretStoreResult(raw);
    }
    
    interpretStoreResult(raw) {
        if (raw.acknowledged === false) {
            if (already) {
                return { ok: true, status: 200, content: raw.message };
            }
        }
        
        return { ok: true, status: 200, content: "winning!" };
    }
    
    unstorePatient(id) {
        this.store.unstorePatient(patient);
    }
}

