/**/

/* Express app to try simultaneous node instances talking to each other. */

let express = require("express");
let app = express();

let other = "http://localhost:32223";

let port = 31113;

app.get("/", (req, res) => {
    console.log(`cruft : req.originalUrl:`, req.originalUrl);
    fetcher().then(text => res.send("reached" + text));
});

app.listen(port);



async function fetcher() {
    let response = await fetch(other);
    let result = await response.text();
    return result;
}
