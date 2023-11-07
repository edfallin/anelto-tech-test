/**/

import { EventNames } from "./EventNames.js";

/* Wires events to methods, and invokes methods for inbound events based on wirings. */

export class EventWirer {
    #instance;
    #methodsByName;

    wire(instance, /* Map: */ methodsByName) {
        this.#instance = instance;
        this.#methodsByName = methodsByName;
    }
    
    dispatch(text) {
        let map = new Map();  /* cruft */

        let name = this.parseEventName(text);

        // This event is not observed by this listener.
        if (!this.#methodsByName.has(name)) {
            return;
        }

        let method = this.#methodsByName.get(name);

        return this.invokeMethod(method, text);
    }
    
    parseEventName(text) {
    }
    
    invokeMethod(method, text) {
        // OOP context.
        method = method.bind(this.#instance);
        
        // Actually invoking.
        let output = method(text);
        
        return output;
    }
}
