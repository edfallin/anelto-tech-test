/**/

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

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
            console.log(`cruft : req.body:`, req.body);
            this.storePatient(req.body)
                .then(outcome => {
                    let { ok, status, content } = outcome;
                    res.ok = ok;
                    res.status = status;
                    res.send(content);
                });
        });
    }
    
    initRemover() {
        this.app.delete("/remove-patient/", (req, res) => {
             this.unstorePatient(req.body)
                .then(outcome => {
                    let { ok, status, content } = outcome;
                    res.ok = ok;
                    res.status = status;
                    res.send(content);
                });
        });
    }
    
    wireToPubSub() {
        /* No operations: not a pub-sub publisher or subscriber. */
    }
    
    async storePatient(patient) {
        let raw = await this.store.storePatient(patient);
        console.log(`cruft : raw:`, raw);
        return this.interpretStoreResult(raw);
    }
    
    interpretStoreResult(raw) /* passed */ {
        if (!raw.acknowledged) {
            if (raw.already) {
                return { ok: true, status: 200, content: raw.message };
            }
            else {
                return { 
                    ok: false, status: 400, 
                    content: "Bad request data.  Patient not added.  Please review your input." 
                };
            }
        }
        
        return { ok: true, status: 201, content: "Patient added." };
    }
    
    async unstorePatient(id) {
        let raw = await this.store.unstorePatient(patient);
        return this.interpretUnstoreResult(raw);
    }
    
    interpretUnstoreResult(raw) /* passed */ {
        if (!raw.acknowledged) {
            if (raw.already) {
                return { ok: true, status: 200, content: raw.message };
            }
            else {
                return { 
                    ok: false, status: 400, 
                    content: "Bad request data.  Patient not removed.  Please review your input." 
                };
            }
        }
        
        return { ok: true, status: 200, content: "Patient removed." }
    }
    
    run() {
        super.run();
        this.store.init();
    }
}

