/**/

import { EventNames } from "./EventNames.js";

/* Wires events to methods, and invokes methods for inbound events based on wirings. */

export class EventWirer {
    #instance;
    #methodsByName;
    
    static #knownEventNames = EventNames.namesList();

    constructor(instance, /* Map: */ methodsByName) {
        this.#instance = instance;
        this.#methodsByName = methodsByName;
    }

    dispatch(text) {
        let name = this.parseEventName(text);

        // This event is not observed by this listener.
        if (!this.#methodsByName.has(name)) {
            return;
        }

        let method = this.#methodsByName.get(name);

        return this.invokeMethod(method, text);
    }

    parseEventName(text) /* passed */ {
        // Lighter than early JSON parsing.
        let toFind = /eventName: "(.*?)"/;  // Not /g: should only be found once.
        let found = text.match(toFind);
        
        // No property at all.
        if (found === null) {
            return EventNames.noSuchEvent;
        }
        
        let name = found[1];
        
        // Name found but isn't know.
        if (!EventWirer.#knownEventNames.includes(name)) {
            return EventNames.noSuchEvent;
        }
        
        // Fall-through: known name.
        return name;
    }

    invokeMethod(method, text) {
        // OOP context.
        method = method.bind(this.#instance);

        // Actually invoking.
        let output = method(text);

        return output;
    }
}
