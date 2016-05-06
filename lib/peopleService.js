'use strict';

const request = require('request');
const Q = require('q');
const RANDOMUSERAPI = 'https://randomuser.me/api/?inc=name,picture';

let users = {};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function get(id) {
  let deferred = Q.defer();
  
  if (!users[id]) {
    request.get(RANDOMUSERAPI, function (err, response, body) {
      if (err || response.statusCode !== 200) {
        deferred.reject(err);
        return;
      }
      
      body = JSON.parse(body);
      let user = body.results[0];
      
      users[id] = {
        picture: user.picture.medium,
        name: capitalize(user.name.first) + ' ' + capitalize(user.name.last)
      };
      
      deferred.resolve(user);
    });
  } else {
    deferred.resolve(users[id]);
  }
  
  return deferred.promise;
}


module.exports = { get: get };