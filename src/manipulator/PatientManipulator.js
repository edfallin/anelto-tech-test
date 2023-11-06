/**/

import { Receiver } from "../https/Receiver.js";
import { Sender } from "../https/Sender.js";
import { Patients } from "../patients/Patients.js";

/* micro to handle all patient manipulation (add, remove, maybe edit) */

/* details perhaps partly based on Express routers */

export class PatientManipulator {
    #receiver;
    #sender;
    
    constructor() {
        this.#receiver = new Receiver();
        this.#sender = new Sender();
    }

    run() {
        this.#receiver.wireRoutes(routes);
    }
}

let manipulator = new PatientManipulator();

/* run() should start receiver, etc., maybe just wire together event handling */
manipulator.run();
