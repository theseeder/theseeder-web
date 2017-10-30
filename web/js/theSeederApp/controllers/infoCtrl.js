/**
 * @namespace infoCtrl
 *
 * @author: TheSeeder
 * @version: v0.1
 *
 * @description
 * handles functionality for the info page
 *
 */
(function () {
    'use strict';

    angular
        .module('theSeederApp')
        .controller('infoCtrl', infoController);

    function infoController($scope, $http) {

        var vm = this;

        vm.baseUrl = 'api.theseeder.ml';

        vm.access = {};

        // controller API
        vm.init = init;


        /**
         * @name init
         * @desc data initialization function
         * @memberOf infoCtrl
         */
        function init() {
            angular.element(document).ready(function () {
              $('.tooltipped').tooltip();
              getAuthorized();
            });
        }

        function getAuthorized () {
          $http({
            method: 'GET',
            url: 'https://' + vm.baseUrl + '/access'
          }).then(function successCallback(response) {
            vm.access = response.data;
            if (vm.access.authorized) {
              Materialize.toast("success!!!!!!!!1", 3000);
            } else {
              Materialize.toast("sorry scrub, no user and password for you", 3000);
            }
          }, function errorCallback(response) {
            console.log(response);
          });
        }

        // call init function on firstload and reload
        vm.init();
    }

})();



  