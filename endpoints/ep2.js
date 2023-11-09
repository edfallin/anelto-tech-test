/**/

/* Express app to try simultaneous node instances talking to each other. */

let express = require("express");
let app = express();


let other = "https://localhost:31113";

app.get("/", (req, res, next) => {
    console.log(`cruft : req.originalUrl:`, req.originalUrl);
    res.send("It worked.");
});


let port = 32223;

app.listen(port);


