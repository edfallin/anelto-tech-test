/**/

/* Micro to handle all writing (storing) of data, with external endpoint. */

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

export default class Writer extends AEndpoint {
    pubSubUrl = "http://localhost:3033/send-message";
    
    constructor() {
        super();
        this.port = 31001;
        this.name = "Writer";
        this.store = new Storage();
    }

    initExternalListeners() {
        super.initExternalListeners();
        this.initAdder();
    }
    
    initAdder() {
        /* %cruft, add output to pub-sub here */
        this.app.post("/add-reading/", (req, res) => {
            console.log(`cruft : req.body:`, req.body);
            this.storeReading(req.body)
                .then(outcome => {
                    let { ok, status, content } = outcome;
                    res.ok = ok;
                    res.status = status;
                    res.send(content);
                });
        });
    }
    
    wireToPubSub() {
        /* Wires to write to pub-sub only. */
    }

    async storeReading(json) {
        let result = await this.store.storeReading(json);
        
        if (!result.acknowledged) {
            return { 
                ok: false, status: 500, 
                content: "Error adding reading.  Reading not added.  Please review system status." 
            };
        }
        
        return { ok: true, status: 201, content: "Reading added." };
    }
    
    async publishReading(json) {
        let message = { event: "new-reading", content: json };
    
        let post = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: { 
                message 
            }
        };
        
        await fetch(this.pubSubUrl, post);
    }
    
    run() {
        super.run();
        this.store.init();
    }

}

