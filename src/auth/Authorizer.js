/**/

/* entry point: first authenticates, then (in theory) authorizes based on roles or claims; 
   claims would be like "is-patient" and "is-doctor"; former can write, latter can read */

/* for the purposes of this demo, authenticated is authorized */

import { Authenticator } from "./Authenticator.js";

export class Authorizer {
    #authenticator;
    
    constructor() {
        this.#authenticator = new Authenticator();
    }

    isAuthorized(claims, usage) { 
        let isAuthenticated = this.#authenticator.isAuthenticated();
        
        // Not identified, not authorized.
        if (!isAuthenticated) { return false; }
        
        /* The three supported cases follow. */
        
        /* Additional authorization rules would be limiating reading patients to their own doctors, 
           and added authorization allowances would be allowing patients to see their own readings. */
        
        // Adding / removing patients.
        if (usage === "control" && claims.includes("is-maintainer")) {
            return true;
        }
        
        // Saving readings for a patient.
        if (usage === "write" && claims.includes("is-patient")) {
            return true;
        }
        
        // Reading readings for patients.
        if (usage === "read" && claims.includes("is-doctor")) {
            return true;
        }
        
        /* Fall-through: not a supported case. */
        return false;
     }
}
