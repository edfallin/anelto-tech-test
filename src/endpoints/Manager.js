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
    
    interpretStoreResult(raw) /* passed */ {
        if (!raw.acknowledged) {
            if (raw.already) {
                return { ok: true, status: 200, content: raw.message };
            }
            else {
                return { ok: false, status: 400, content: "Bad request data.  Please review your input." };
            }
        }
        
        return { ok: true, status: 201, content: "Patient added." };
    }
    
    unstorePatient(id) {
        this.store.unstorePatient(patient);
    }
}

