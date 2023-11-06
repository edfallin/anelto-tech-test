/**/

import { express } from "express";

/* wraps HTTPS operations for all micro's, for reduced code */

export class Receiver {
    wireRoutes(wirings) {
        /* builds HTTP routings using Express syntax as defined 
           in wirings arg, which may be a pre-structured type */
    }

    startListening() {
        /* works like Express */

        // let router = express.Router();
        
        /* maybe emits a new CustomEvent when something is heard, 
           or maybe runs a provided delegate */
       
       /* custom events:  https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent */
    }
}
