/**/

/* Express app to try simultaneous node instances talking to each other. */

let express = require("express");
let https = require("https");
let debug = require("debug")("ep2:server");

let other = "https://localhost:31113";

let app = express();


let port = 32223;
app.set("port", port);
app.use(express.json());


app.get("/", (req, res, next) => {
    console.log(`cruft : req.originalUrl:`, req.originalUrl);
});

let server = https.createServer(app);

server.listen();
server.on("error", whenErrorRaised);
server.on("listening", whenListeningStarts);

console.log(`cruft : end of run script`);

// region Server event listeners

function whenErrorRaised(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function whenListeningStarts() {
    console.log(`cruft : listener run`);
    let addr = server.address();
    console.log(`cruft : addr:`, addr);
    let bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
}

// endregion Server event listeners

