/**/

import AEndpoint from "./AEndpoint.js";

/* Returns latest results for a patient in real time. */

export default class Watcher extends AEndpoint {
    current;

    constructor() {
        super();
        this.port = 31005;
        this.name = "Reader";
        this.current = [ ];
    }

    initExternalListeners() {
        super.initExternalListeners();
        this.initWiredAdder();
        this.initGetter();
    }

    initWiredAdder() {
    //     /* Responds to events sent by pub-sub.  */
    //
    //     this.app.post("/add-current", (req, res) => {
    //         let body = req.body;
    //         this.maybeAddToCurrent(body.message);
    //        
    //         res.ok = true;
    //         res.status = 200;
    //         res.send();
    //     });
    }

    initGetter() {
    //     this.app.get("/get-current/:id", (req, res) => {
    //         let id = req.params.id;
    //         let content = this.getCurrent(id);
    //        
    //         res.ok = ok;
    //         res.status = status
    //         res.send(content)
    //     });
    }

    wireToPubSub() {
    //     // Wiring by registering URL so messages are sent here.
    //     await fetch(
    //         "https:localhost:3033/register",
    //         { method: "post",
    //             body: `http://localhost:${ this.port }/add-current`,
    //             headers: {
    //                 "Content-Type": "text/plain"
    //             }
    //         }
    //     );
    }

    maybeAddToCurrent(message) {
    //     let event = JSON.parse(message);
    //    
    //     // The maybe: Don't add if not a new reading.
    //     if (event.type !== "new-reading") {
    //         return;
    //     }
    //    
    //     // Actually adding, if a new reading.
    //     this.current.push(event.content);
    }

    getCurrent(id) {
        // All patients' readings are stored together.
        let current = this.current
            .filter(x => x.patientId === id);

        // Copying to avoid post-removal fails.
        let output = [ ...current ];

        // Now stale, so dumped.
        this.dropFrom(this.current, output);

        return output;
    }

    dropFrom(current, readings) {
        for (let reading of readings) {
            // If these reading values match, all match.
            let at = current.findIndex(
                x => x.patientId == reading.patientId 
                && x.timestamp == reading.timestamp
            );
            
            current.splice(at, 1);
        }
    }

    run() {
        super.run();
    }
}
