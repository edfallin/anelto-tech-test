/**/

/* Express app to try simultaneous node instances talking to each other. */

let express = require("express");
let app = express();

let other = "http://localhost:32223";

let port = 31113;
app.set("port", port);
app.use(express.json());


app.get("/", (req, res) => {
    console.log(`cruft : req.originalUrl:`, req.originalUrl);
    res.send("reached");
});

app.listen(port);

