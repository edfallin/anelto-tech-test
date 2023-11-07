/**/

import { ATestSource } from "risei/ATestSource";
import { EventWirer } from "../global/EventWirer.js";
import { EventNames } from "../global/EventNames.js";

export class EventWirerTests extends ATestSource {
    tests = [
        { on: EventWirer, with: [ ] },

        { of: "parseEventName" },
        { for: "When known event name exists as .eventName, returns that name.", 
            in: [ "{ eventName: \"AddReading\", random: \"value\", meaningless: \"property\" }" ], 
            out: EventNames.addReading },
        { for: "When unknown event name exists as .eventName, returns EventNames.noSuchEvent.", 
            in: [ "{ eventName: \"InventedName\", random: \"value\", meaningless: \"property\" }" ], 
            out: EventNames.noSuchEvent },
        { for: "When no .eventName property exists, returns EventNames.noSuchEvent.", 
            in: [ "{ somethingToConsider: \"AddReading\", random: \"value\", meaningless: \"property\" }" ], 
            out: EventNames.noSuchEvent },
        
    ];
}
