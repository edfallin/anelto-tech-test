/**/

/* External endpoint for patient data. */

let express = require("express");
let app = express();
app.use(express.json());


let service;
let source = import("../src/readings/Writer.js")
    .then(source => service = new source.Writer());


app.post("/add/", (req, res) => {
    let outcome = service.storeReading(req.body);
    res.ok = true;
    res.send("Added");
});


app.listen(31001);
