/**/

import { ATestSource } from "risei/ATestSource";
import { EventWirer } from "../src/shared/EventWirer.js";
import { EventNames } from "../src/shared/EventNames.js";

export class EventWirerTests extends ATestSource {
    tests = [
        { on: EventWirer, with: [ ] },

        { of: "parseEventName" },
        { for: "When known event name exists as .eventName, returns that name.", /* good */
            in: [ "{ eventName: \"AddReading\", random: \"value\", meaningless: \"property\" }" ], 
            out: EventNames.addReading },
        { for: "When unknown event name exists as .eventName, returns EventNames.noSuchEvent.", /* good */
            in: [ "{ eventName: \"InventedName\", random: \"value\", meaningless: \"property\" }" ], 
            out: EventNames.noSuchEvent },
        { for: "When no .eventName property exists, returns EventNames.noSuchEvent.", /* good */
            in: [ "{ somethingToConsider: \"AddReading\", random: \"value\", meaningless: \"property\" }" ], 
            out: EventNames.noSuchEvent },

        { of: "invokeMethod", 
            with: [ new Wireable(), /* empty arg for Map: */ [ ] ] 
        },
        { for: "When called, the provided method is invoked and its output returned.", /* good */
          in: [ Wireable.prototype.callable, "instance field is " ],
          out: "instance field is field-value" }

    ];
}

class Wireable {
    #field = "field-value";

    callable(text) {
        return text + this.#field;
    }
}
