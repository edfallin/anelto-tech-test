/**/

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

/* %cruft : adding and subtracting patients */

export class Manager extends AEndpoint {
    constructor() {
        super();
        this.port = 31005;
        this.name = "Manager";
    }
    
    initExternalListeners() {
        super.initExternalListeners();
        this.initAdder();
        this.initRemover();
    }
    
    initAdder() {
        this.app.post("/add-patient/", (req, res) => {
            let outcome = this.storePatient(req.body);
            res.ok = true;
            res.status = 201;  // Created.
            res.send();
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
    
    storePatient(json) {
    }
    
    unstorePatient(id) {
    }
}

let manager = new Manager();
manager.run();
