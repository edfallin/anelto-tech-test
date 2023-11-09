/**/

/* External endpoint for patient data. */

let express = require("express");
let app = express();
let service;

let source = import("../src/readings/Writer.js").then(source => service = new source.Writer());

app.post("/add/", (req, res) => {
    res.send(service.test);
});

app.listen(31001);
