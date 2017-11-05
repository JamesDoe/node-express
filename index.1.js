const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyparser = require("body-parser");

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyparser.json());

app.all("/dishes", (req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-type","text/plain")
    next();
});

app.get ("/dishes", (req,res,next) => {
    res.send("Will send all the dishes to you.");
});

app.post ("/dishes", (req,res,next) => {
    res.end("Will add the dishes: " + req.body.name + " with details: " + req.body.description);
});

app.put ("/dishes", (req,res,next) => {
    res.statusCode = 403;
    res.end("PUT response not supported on /dishes.");
});

app.delete ("/dishes", (req,res,next) => {
    res.end("Deleting all dishes!");
});

app.get ("/dishes/:dishID", (req,res,next) => {
    res.end("Will send details for dish " + req.params.dishID + " to you.");
});

app.post ("/dishes/:dishID", (req,res,next) => {
    res.statusCode = 403;
    res.end("POST response not supported on /dishes/.");
});

app.put ("/dishes/:dishID", (req,res,next) => {
    res.write("Updating dish: " + req.params.dishID + "\n")
    res.end("Will update dish: " + req.body.name + " with details: " + req.body.description);    
});

app.delete ("/dishes/:dishID", (req,res,next) => {
    res.end("Deleting dish: " + req.params.dishID + "!");
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type","text-html");
    res.end("<html><body><h1>This is my Express Server.</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Express Server running at http://${hostname}:${port}`)
});