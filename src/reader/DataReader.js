/**/

import { Receiver } from "../https/Receiver.js";
import { Sender } from "../https/Sender.js";

/* micro to handle all reading of data (by doctors) */

export class DataReader {
    run() { }
}

let reader = new DataReader();

/* run() should start receiver, etc., maybe just wire together event handling */
reader.run();
