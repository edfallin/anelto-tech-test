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
    let didStore = service.storeReading(req.body);
    
    if (didStore) {
        res.ok = true;
        res.send("OK: didStore returned true");
        return;
    }
    
    res.send("didStore returned false");
});


app.listen(31001);
