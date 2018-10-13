var express = require("express");
var router = express.Router();

const events = require("../server/events");

router.get("/events", function(req, res, next) {
  const { amount, page, type } = req.query;
  events.getEvents(page, type, amount).then(data => {
    if (!data.error) {
      res.send(data.events);
    } else {
      res.status(400).send(data.error);
    }
  });
});



module.exports = router;
