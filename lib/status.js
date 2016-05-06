'use strict';

let io;

const twilio = require('twilio');
const PeopleService = require('./superheroService');
const client = twilio();

function statusRouteHandler(req, res, next) {
  const eventName = req.body.StatusCallbackEvent;
  const callSid = req.body.CallSid;
  const accountSid = req.body.AccountSid;
  let data = {
    name: req.body.FriendlyName,
    conference: req.body.ConferenceSid
  };
  
  if (eventName.indexOf('participant-') !== 0) {
    io.emit(eventName, data);
    res.status(200).send();
    return;
  }
  
  client.calls(callSid).get(function (err, call) {
    data.number = call.fromFormatted;
    data.muted = req.body.Muted === 'true';
    data.sid = callSid;
    
    PeopleService.get(callSid).then((profile) => {
      data.profile = profile;
      io.emit(eventName, data);
    });
  });
  
  res.status(200).send();
}

module.exports = function (ioInstance) {
  io = ioInstance;
  
  return statusRouteHandler;
}