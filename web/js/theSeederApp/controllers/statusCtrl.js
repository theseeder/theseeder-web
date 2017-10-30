/**
 * @namespace statusCtrl
 *
 * @author: TheSeeder
 * @version: v0.1
 *
 * @description
 * handles functionality for the status page
 *
 */
(function () {
  'use strict';

  angular
    .module('theSeederApp')
    .controller('statusCtrl', statusController);

  function statusController($scope, $interval, $http) {

    var vm = this;
    vm.statsInterval = null;
    vm.spinner = {router: true, limits: true, node: true};

    vm.status = {
      router: {},
      node: {},
    };
    vm.limits = {
      so: {},
    };

    vm.baseUrl = 'api.theseeder.ml';

    // controller API
    vm.init = init;


    /**
     * @name init
     * @desc data initialization function
     * @memberOf statusCtrl
     */
    function init() {
      angular.element(document).ready(function () {
        $('.tooltipped').tooltip();
        getRouterStatus();
        getSOLimits();
        getNodeStatus();
        vm.statsInterval = $interval(function() {
          getRouterStatus();
          getSOLimits();
          getNodeStatus();
          }, 10000);
      });
    }


    function getRouterStatus() {
      $http({
        method: 'GET',
        url: `https://${vm.baseUrl}/status/router`
      }).then(function successCallback(response) {
        vm.spinner.router = false;
        response.data.modified = moment(response.data.modified).fromNow();
        vm.status.router = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    function getNodeStatus() {
      $http({
        method: 'GET',
        url: `https://${vm.baseUrl}/status/node`
      }).then(function successCallback(response) {
        vm.spinner.node = false;
        response.data.modified = moment(response.data.modified).fromNow();
        vm.status.node = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    function getSOLimits() {
      $http({
        method: 'GET',
        url: `https://${vm.baseUrl}/limits/so`
      }).then(function successCallback(response) {
        vm.spinner.limits = false;
        response.data.modified = moment(response.data.modified).fromNow();
        vm.limits.so = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
    }


    $scope.$on('$destroy', function () {
      if (vm.statsInterval) {
        $interval.cancel(vm.statsInterval);
      }
    });

    // call init function on firstload
    vm.init();
  }

})();