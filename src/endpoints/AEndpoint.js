/**/

import express from "express";

/* Superclass for all standard endpoints. */

export default class AEndpoint {
    port;
    app;
    name;
    
    constructor() /* verified */ {
        this.initHttp();
        this.initExternalListeners();
    }
    
    initHttp() /* verified */ {
        this.app = express();
        this.app.use(express.json());
    }
    
    initExternalListeners() /* verified */ {
        this.app.get("/identify", (req, res) => {
            res.ok = true;
            res.send(`${ this.name } is listening.`);
        });
    }
    
    async wireToPubSub() {
        throw new Error("wireToPubSub() must be implemented in subclass.");
    }
    
    run() /* verified */ {
        this.app.listen(this.port);
        console.log(`${ this.name } listening on port ${ this.port }.`);
        this.wireToPubSub().then(() => { });
    }
}
