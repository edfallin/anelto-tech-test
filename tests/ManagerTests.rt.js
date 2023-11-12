/**/

import { ATestSource } from "risei/ATestSource";
import Manager from "../src/endpoints/Manager.js";
import AEndpoint from "../src/endpoints/AEndpoint.js";
// import Storage from "../src/storage/Storage.js";

export class ManagerTests extends ATestSource {
    tests = [
        { on: Manager, with: [ ] },
        { plus: [ { on: AEndpoint, of: "run" }, { on: Manager, of: "run" } ] },
        /* %cruft : ?cruft */
        // { plus: [ { on: Storage, of: "", as: 10 } ] },

        { of: "interpretStoreResult" },
        { for: "When storage call returns already-exists, outputs OK, 200, and already-exists message.", /* good */
          in: [ { acknowledged: false, already: true, message: `Patient already exists.` } ],  // Spoof message.
          out: { ok: true, status: 200, content: `Patient already exists.` } },
    ];
}
