/**/

import express from "express";

/* Superclass for all standard endpoints. */

export default class AEndpoint {
    port;
    app;
    name;
    
    constructor() {
        this.initHttp();
        this.initExternalListeners();
        this.wireToPubSub();
    }
    
    initHttp() {
        this.app = express();
        this.app.use(express.json());
    }
    
    initExternalListeners() {
        this.app.get("/identify", (req, res) => {
            res.ok = true;
            res.send(`${ this.name } is listening.`);
        });
    }
    
    wireToPubSub() {
        throw new Error("wireToPubSub() must be implemented in subclass.");
    }
    
    run() {
        console.log(`cruft : run()`);
        this.app.listen(this.port);
        console.log(`${ this.name } listening on port ${ this.port }.`);
    }
}
