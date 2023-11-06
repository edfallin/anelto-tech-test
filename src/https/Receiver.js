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
           which composing class can listen to with 
           addEventListener() on instance of this class */
       
       /* custom events:  https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent */
    }
}
