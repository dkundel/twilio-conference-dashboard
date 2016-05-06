(function () {
  angular.module('dashboard')
    .directive('conferenceParticipant', conferenceParticipantDirective);

  conferenceParticipantDirective.$inject = ['Conference'];

  function conferenceParticipantDirective(Conference) {
    function link(scope, element, attributes) {
      scope.muteParticipant = Conference.muteParticipant;
    }
    
    return {
      templateUrl: '/participant-template.html',
      restrict: 'E',
      replace: true,
      scope: {
        info: '=',
        time: '='
      },
      link: link
    }
  }
})();