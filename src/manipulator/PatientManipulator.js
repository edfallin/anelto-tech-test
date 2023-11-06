/**/

import { Receiver } from "../https/Receiver.js";
import { Sender } from "../https/Sender.js";

/* micro to handle all patient manipulation (add, remove, maybe edit) */

export class PatientManipulator {
    run() { }
}

let manipulator = new PatientManipulator();

/* run() should start receiver, etc., maybe just wire together event handling */
manipulator.run();
