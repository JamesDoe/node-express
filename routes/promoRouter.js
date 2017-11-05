const express = require("express");
const bodypaser = require("body-parser");

const promoRouter = express.Router();

promoRouter.use(bodypaser.json());

promoRouter.route("/")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-type","text/plain")
    next();
})
.get ((req,res,next) => {
    res.send("Will send all the promotions to you.");
})
.post ((req,res,next) => {
    res.end("Will add the promotions: " + req.body.name + " with details: " + req.body.description);
})
.put ((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT response not supported on /promotions.");
})
.delete ((req,res,next) => {
    res.end("Deleting all promotions!");
});

promoRouter.route("/:promoID")
.get ((req,res,next) => {
    res.end("Will send details for promotion " + req.params.promoID + " to you.");
})
.post ((req,res,next) => {
    res.statusCode = 403;
    res.end("POST response not supported on /promotions/.");
})
.put ((req,res,next) => {
    res.write("Updating promotion: " + req.params.promoID + "\n")
    res.end("Will update promotion: " + req.body.name + " with details: " + req.body.description);    
})
.delete ((req,res,next) => {
    res.end("Deleting promotion: " + req.params.promoID + "!");
});

module.exports = promoRouter;