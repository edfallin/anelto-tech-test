/**/

import AEndpoint from "./AEndpoint.js";
import Storage from "../storage/Storage.js";

/* Micro to handle all reading of data (by doctors), with external endpoint. */

export default class Reader extends AEndpoint {
    constructor() {
        super();
        this.port = 31003;
        this.name = "Reader";
    }

    initExternalListeners() {
        super.initExternalListeners();
        this.initGetter();
    }
    
    initGetter() {
        this.app.get("/patient/{id}/{from}/{to}", (req, res) => {
        });
    }
    
    wireToPubSub() {
        /* No operations: not a pub-sub publisher or subscriber. */
    }
    
    // run() {
    //     this.#app.listen(this.#port);
    //     console.log(`Reader listening on port ${ this.#port } for calls to ... .`);
    // }

    getReadings() { }
}

