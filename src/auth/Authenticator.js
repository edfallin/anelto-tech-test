/**/

/* not an entry point; called by Authorizer */

/* ideally, jwt */

export class Authenticator {
    // Everyone's a winner.
    isAuthenticated() { return true; }
}
