/**/

import { Receiver } from "../pub-sub/Receiver.js";
import { Sender } from "../pub-sub/Sender.js";

/* micro to handle all reading of data (by doctors) */

/* details perhaps partly based on Express routers */

export class Reader {
    init() {
        // registers self to pub-sub with HTTP fetch
    }

    getReadings() { }
}
