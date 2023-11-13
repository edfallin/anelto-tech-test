/**/

import { ATestSource } from "risei/ATestSource";
import Watcher from "../src/endpoints/Watcher.js";

export class WatcherTests extends ATestSource {
    tests = [
        { on: Watcher, with: [ ] },
        { of: "dropFrom" },
        { for: "Elements matching the second arg are deleted from the first arg.", /* good */
          in: [
            /* Original array: */
            [ { patientId: 5, timestamp: 10, datum: 10 }, { patientId: 10, timestamp: 20, datum: 9 }, 
              { patientId: 10, timestamp: 30, datum: 8 }, { patientId: 5, timestamp: 40, datum: 7 }, 
              { patientId: 5, timestamp: 50, datum: 6 }, { patientId: 10, timestamp: 60, datum: 5 } ],
            /* Elements to remove: */
            [ { patientId: 5, timestamp: 10, datum: 10 }, 
              { patientId: 10, timestamp: 30, datum: 8 }, 
              { patientId: 10, timestamp: 60, datum: 5 } ] 
          ], 
          /* Remaining elements: */
          out: [ { patientId: 10, timestamp: 20, datum: 9 }, 
                 { patientId: 5, timestamp: 40, datum: 7 }, 
                 { patientId: 5, timestamp: 50, datum: 6 } ] ,
          from: (target, test) => { return test.in[0]; } 
        }
    ];
}

