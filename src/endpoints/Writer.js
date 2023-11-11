/**/

/* Micro to handle all writing (storing) of data, with external endpoint. */

import express from "express";

export class Writer {
    #port = 31001;
    #app;
    
    constructor() {
        this.initHttp();
        this.initExternalListeners();
        this.wireToPubSub();
    }

    initHttp() {
        this.#app = express();
        this.#app.use(express.json());
    }

    initExternalListeners() {
        this.#app.get("/", (req, res) => {
            res.ok = true;
            res.send("Writer is listening.");
        });
    
        this.#app.post("/add/", (req, res) => {
            let outcome = this.storeReading(req.body);
            res.ok = true;
            res.send(`Added.  ${ outcome }`);
        });

        /* %cruft : more listeners here */
    }
    
    wireToPubSub() {
        /* %cruft : registers self to pub-sub with HTTP fetch */
    }

    run() {
        this.#app.listen(this.#port);
        console.log(`Writer listening on port ${ this.#port } for calls to /add/.`);
    }

    storeReading(json) {
        /* %cruft : instead of using storage directly, sends to pub-sub */
    
        console.log(`cruft : json:`, json);
        
        if (json.systolic - json.diastolic > 50) {
            return "Range is wide";
        }

        return "Range is narrow";
    }

    isValidReading(json) {
    }

}

let writer = new Writer();
writer.run();


/* %cruft : perhaps factor common code here and in Reader to a superclass */

