(function () {
  angular.module('dashboard')
    .factory('Conference', ConferenceService);

  ConferenceService.$inject = ['$http', 'io', '$rootScope'];

  function ConferenceService($http, io, $rootScope, $interval) {
    var participants = {};
    var socket = io();
    
    var events = [ 
      'conference-start',
      'conference-end',
      'participant-join',
      'participant-leave',
      'participant-mute',
      'participant-unmute'
    ]
    
    events.forEach(function (event) {
      socket.on(event, function (data) {
        var eventData = {
          event: event,
          data: data,
          message: getEventMessage(event, data)
        };
        
        if ('participant-join') {
          data.joined = Date.now();
        }
        
        if (event === 'participant-leave') {
          delete participants[data.sid];
        } else if (event.indexOf('participant-') === 0) {
          participants[data.sid] = data;
        }
        
        
        $rootScope.$broadcast('conferenceStatus.update', eventData);
      });
    });
    
    function getParticipants() {
      return participants;
    }
    
    function muteParticipant(muted, sid, conference) {
      return $http.post('/mute', {
        mute: !muted,
        sid: sid,
        conference: conference
      });
    }
    
    function getEventMessage(event, data) {
      switch (event) {
        case 'conference-start':
          return 'The conference "' + data.name + '" has started.';
        case 'conference-end':
          return 'The conference "' + data.name + '" has ended.';
        case 'participant-join':
          return data.profile.name + ' has joined.';
        case 'participant-leave':
          return data.profile.name + ' left.';
        case 'participant-mute':
          return data.profile.name + ' is now muted.';
        case 'participant-unmute':
          return data.profile.name + ' is not anymore muted.';
        default:
          return '';
      }
    }
    
    return {
      getParticipants: getParticipants,
      muteParticipant: muteParticipant
    }
  }
})();