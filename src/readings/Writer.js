/**/

import { Receiver } from "../pub-sub/Receiver.js";
import { Sender } from "../pub-sub/Sender.js";

/* micro to handle all writing (storing) of data (by devices) */

/* details perhaps partly based on Express routers */

export class Writer {
    run() { }
}

let writer = new Writer();

/* run() should start receiver, etc., maybe just wire together event handling */
writer.run();
