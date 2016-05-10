(function () {
  angular.module('dashboard')
    .factory('Conference', ConferenceService);

  ConferenceService.$inject = ['$http', 'io', '$rootScope'];

  function ConferenceService($http, io, $rootScope) {
    var participants = {};

    initialize();

    function initialize() {
      
    }

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