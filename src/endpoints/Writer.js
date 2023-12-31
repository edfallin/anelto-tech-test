/**/

/* Micro to handle all writing (storing) of data, with external endpoint. */

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

export default class Writer extends AEndpoint {
    pubSubUrl = "http://localhost:3033/send-message";
    doSkipPubSub = false;
    
    constructor(skip = false) {
        super();
        this.port = 31003;
        this.name = "Writer";
        this.store = new Storage();
        this.doSkipPubSub = skip;
    }

    initExternalListeners() {
        super.initExternalListeners();
        this.initAdder();
    }
    
    initAdder() {
        this.app.post("/add-reading/", (req, res) => {
            let reading = req.body;

            this.storeReading(reading)
                .then(outcome => {
                    let { ok, status, content } = outcome;
                    res.ok = ok;
                    res.status = status;
                    res.send(content);
                })
                .then(() => {
                    delete reading._id;
                    
                    // For some trial / test conditions.
                    if (this.doSkipPubSub) {
                        return;
                    }
                    
                    this.publishReading(reading);
                });
        });
    }
    
    async wireToPubSub() {
        /* No wiring needed: Pub-sub URL called from this microservice instead. */
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
    
    async publishReading(reading) {
        let message = { type: "new-reading", content: reading };
        let json = JSON.stringify(message);
    
        let post = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: { 
                message: json 
            }
        };
        
        await fetch(this.pubSubUrl, post);
    }
    
    run() {
        super.run();
        this.store.init();
    }

}

