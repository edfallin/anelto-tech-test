/**/

/* External endpoint for patient data. */

import express from "express";
import { Writer } from "../readings/Writer.js";

let app = express();
app.use(express.json());


let service = new Writer();
// let source = import("../src/readings/Writer.js")
//     .then(source => service = new source.Writer());


app.post("/add/", (req, res) => {
    let outcome = service.storeReading(req.body);
    res.ok = true;
    res.send("Added");
});


app.listen(31001);
