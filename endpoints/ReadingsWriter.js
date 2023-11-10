/**/

/* External endpoint for patient data. */

let express = require("express");
let app = express();
app.use(express.json());


let service;
let source = import("../src/readings/Writer.js")
    .then(source => service = new source.Writer());


app.post("/add/", (req, res) => {
    console.log(`cruft : req.body:`, req.body);
    let outcome = service.storeReading(req.body);
    
    res.send(`Service reported outcome: ${ outcome }`);
});


app.listen(31001);
