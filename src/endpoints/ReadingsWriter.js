/**/

/* External endpoint for patient data. */

import express from "express";
// import { Writer } from "../readings/Writer.js";
import { Storage } from "../storage/Storage.js";

// let app = express();
// app.use(express.json());

// let service = new Writer();

// app.post("/add/", (req, res) => {
//     let outcome = service.storeReading(req.body);
//     res.ok = true;
//     res.send("Added");
// });

// app.listen(31001);


/* micro to handle all writing (storing) of data (by devices) */

/* details perhaps partly based on Express routers */

export class Writer {
    #port = 31001;
    #app;
    
    constructor() {
        this.initHttp();
        this.initExternalListeners();
    }

    initHttp() {
        this.#app = express();
        this.#app.use(express.json());
    }

    initExternalListeners() {
        this.#app.post("/add/", (req, res) => {
            let outcome = this.storeReading(req.body);
            res.ok = true;
            res.send("Added");
        });

        // registers self to pub-sub with HTTP fetch
    }

    run() {
        this.#app.listen(this.#port);
    }

    storeReading(json) {
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
