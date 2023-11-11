/**/

/* Express app to try simultaneous node instances talking to each other. */

import express from "express";
let app = express();

let other = "http://localhost:32223";

let port = 31113;

app.get("/", (req, res) => {
    console.log(`cruft : req.originalUrl:`, req.originalUrl);
    fetcher().then(text => res.send("ep1 invoked.  Reached ep2, which returned this: " + text));
});

app.listen(port);



async function fetcher() {
    let response = await fetch(other);
    
    if (!response.ok) {
        return `Could not fetch from ${ other }.`;
    }
    
    let result = await response.text();
    return result;
}
