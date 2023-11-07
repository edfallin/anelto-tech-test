/**/

import { Receiver } from "../pub-sub/Receiver.js";
import { Sender } from "../pub-sub/Sender.js";

/* micro to handle all reading of data (by doctors) */

/* details perhaps partly based on Express routers */

export class Reader {
    run() { }
    getReadings() { }
}

let reader = new Reader();

/* run() should start receiver, etc., maybe just wire together event handling */
reader.run();


// reader does things like this:
//  with run(), adds self to dispatcher
//  at each dispatch burst, does this:
//    looks at event name using regex;
//    if event matches supported events, 
//    branches to method for that purpose;

//    each method does this:
//      JSON-parses to intended object (Axios for typing?),
//      then uses its args to call a method on an abstraction point
//      (for now at least) and gets back any data; 
//      then pushes that data back to the queue
