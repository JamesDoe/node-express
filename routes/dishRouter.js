const express = require("express");
const bodypaser = require("body-parser");

const dishRouter = express.Router();

dishRouter.use(bodypaser.json());

dishRouter.route("/")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-type","text/plain")
    next();
})
.get ((req,res,next) => {
    res.send("Will send all the dishes to you.");
})
.post ((req,res,next) => {
    res.end("Will add the dishes: " + req.body.name + " with details: " + req.body.description);
})
.put ((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT response not supported on /dishes.");
})
.delete ((req,res,next) => {
    res.end("Deleting all dishes!");
});

dishRouter.route("/:dishID")
.get ((req,res,next) => {
    res.end("Will send details for dish " + req.params.dishID + " to you.");
})
.post ((req,res,next) => {
    res.statusCode = 403;
    res.end("POST response not supported on /dishes/.");
})
.put ((req,res,next) => {
    res.write("Updating dish: " + req.params.dishID + "\n")
    res.end("Will update dish: " + req.body.name + " with details: " + req.body.description);    
})
.delete ((req,res,next) => {
    res.end("Deleting dish: " + req.params.dishID + "!");
});

module.exports = dishRouter;