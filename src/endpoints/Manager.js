/**/

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

export default class Manager extends AEndpoint {
    store;
    
    constructor() /* verified */ {
        super();
        this.port = 31005;
        this.name = "Manager";
        this.store = new Storage();
    }
    
    initExternalListeners() /* verified */ {
        super.initExternalListeners();
        this.initAdder();
        this.initRemover();
    }
    
    initAdder() /* verified */ {
        this.app.post("/add-patient/", (req, res) => {
            this.storePatient(req.body)
                .then(outcome => {
                    let { ok, status, content } = outcome;
                    res.ok = ok;
                    res.status = status;
                    res.send(content);
                });
        });
    }
    
    initRemover() /* verified */ {
        this.app.delete("/remove-patient/:patientId", (req, res) => {
            let patientId = req.params.patientId;
            console.log(`cruft : patientId:`, patientId);
            this.unstorePatient(patientId)
                .then(outcome => {
                    let { ok, status, content } = outcome;
                    res.ok = ok;
                    res.status = status;
                    res.send(content);
                });
        });
    }
    
    wireToPubSub() /* ok */ {
        /* No operations: not a pub-sub publisher or subscriber. */
    }
    
    async storePatient(patient) /* verified */ {
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
    
    async unstorePatient(id) /* verified */ {
        let raw = await this.store.unstorePatient(id);
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

