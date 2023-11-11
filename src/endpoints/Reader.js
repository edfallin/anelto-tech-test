/**/

import express from "express";

/* Micro to handle all reading of data (by doctors), with external endpoint. */

export class Reader {
    #port = 31003;
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
            res.send("Reader is listening.");
        });

        /* %cruft : listeners here */
    }
    
    wireToPubSub() {
        /* %cruft : registers self to pub-sub with HTTP fetch */
    }
    
    run() {
        this.#app.listen(this.#port);
        console.log(`Reader listening on port ${ this.#port } for calls to ... .`);
    }

    getReadings() { }
}

let reader = new Reader();
reader.run();
