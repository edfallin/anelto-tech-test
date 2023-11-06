/**/

import { Receiver } from "../https/Receiver.js";
import { Sender } from "../https/Sender.js";

/* micro to handle all writing (storing) of data (by devices) */

export class DataWriter {
    run() { }
}

let writer = new DataWriter();

/* run() should start receiver, etc., maybe just wire together event handling */
writer.run();
