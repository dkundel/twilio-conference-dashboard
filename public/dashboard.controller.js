(function () {
  angular.module('dashboard')
    .controller('DashboardController', DashboardController);
  
  DashboardController.$inject = ['$interval', 'moment']

  function DashboardController($interval, moment) {
    var vm = this;
    vm.logs = [];
    vm.noParticipants = true;
    vm.times = {};
    
    // update the times for every call periodically
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