const express = require("express");
const bodypaser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodypaser.json());

leaderRouter.route("/")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-type","text/plain")
    next();
})
.get ((req,res,next) => {
    if (req.originalUrl == "/leaders") {res.end("GET not supported on /leaders.")} else {res.end("Will send all the leaders to you.")}
})
.post ((req,res,next) => {
    if (req.originalUrl == "/leaders") {res.end("POST not supported on /leaders.")} else {res.end("Will add the leaders: " + req.body.name + " with details: " + req.body.description);}
})
.put ((req,res,next) => {
    if (req.originalUrl == "/leaders") {res.end("PUT not supported on /leaders.")} else {res.statusCode = 403;     res.end("PUT response not supported on /leadership.")}
})
.delete ((req,res,next) => {
    if (req.originalUrl == "/leaders") {res.end("DELETE not supported on /leaders.")} else {res.end("Deleting all leaders!")}
});

leaderRouter.route("/:leaderID")
.get ((req,res,next) => {
    res.end("Will send details for leader " + req.params.leaderID + " to you.");
})
.post ((req,res,next) => {
    res.statusCode = 403;
    res.end("POST response not supported on /leaders/.");
})
.put ((req,res,next) => {
    res.write("Updating leader: " + req.params.leaderID + "\n")
    res.end("Will update leader: " + req.body.name + " with details: " + req.body.description);    
})
.delete ((req,res,next) => {
    res.end("Deleting leader: " + req.params.leaderID + "!");
});

module.exports = leaderRouter;