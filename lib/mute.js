'use strict';

const twilio = require('twilio');
const client = twilio();

module.exports = function (req, res, next) {
  client.conferences(req.body.conference).participants(req.body.sid).update({
    muted: req.body.mute ? 'True' : 'False'
  }, function(err, participant) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    res.send(participant);
  });
}
