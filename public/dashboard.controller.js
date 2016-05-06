(function () {
  angular.module('dashboard')
    .controller('DashboardController', DashboardController);
  
  DashboardController.$inject = ['Conference', '$scope', '$log', '$interval', 'moment']

  function DashboardController(Conference, $scope, $log, $interval, moment) {
    var vm = this;
    vm.logs = [];
    vm.noParticipants = true;
    vm.times = {};
    
    $scope.$on('conferenceStatus.update', function (evt, data) {
      $scope.$apply(function () {
        vm.logs.push(data.message);
        vm.participants = Conference.getParticipants();
        vm.noParticipants = Object.keys(vm.participants).length === 0;
      })
    });
    
    $interval(function () {
      if (vm.participants) {
        vm.times = {};
        Object.keys(vm.participants).forEach(function (sid) {
          vm.times[sid] = moment.duration(Date.now() - vm.participants[sid].joined);
        });
      }
    }, 1000);
  }
})();