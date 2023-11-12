/**/

import { ATestSource } from "risei/ATestSource";
import Manager from "../src/endpoints/Manager.js";
import AEndpoint from "../src/endpoints/AEndpoint.js";
// import Storage from "../src/storage/Storage.js";

export class ManagerTests extends ATestSource {
    tests = [
        { on: Manager, with: [ ] },

        { of: "interpretStoreResult" },
        { for: "When storage call not ack'd but already, outputs OK, 200, and already-exists message.", /* good */
          in: [ { acknowledged: false, already: true, message: `Patient already exists.` } ],  // Spoof message.
          out: { ok: true, status: 200, content: `Patient already exists.` } },
        { for: "When storage call not ack'd and not already, outputs not-OK, 400, and fail message.", /* good */
          in: [ { acknowledged: false } ],
          out: { ok: false, status: 400, content: "Bad request data.  Please review your input." } }, /* good */
        { for: "When storage call ack'd, outputs OK, 201, and success message.", /* good */
          in: [ { acknowledged: true } ],
          out: { ok: true, status: 201, content: `Patient added.` } }
    ];
}
