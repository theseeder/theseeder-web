/**
 * @namespace donateCtrl
 *
 * @author: TheSeeder
 * @version: v0.1
 *
 * @description
 * handles functionality for the index page
 *
 */
(function () {
    'use strict';

    angular
        .module('theSeederApp')
        .controller('donateCtrl', donateController);

    function donateController($scope, $http) {

        var vm = this;

        vm.balance = {
            paypal: {},
        };

        vm.baseUrl = 'api.theseeder.ml';

        // controller API
        vm.init = init;


        /**
         * @name init
         * @desc data initialization function
         * @memberOf donateCtrl
         */
        function init() {
            angular.element(document).ready(function () {
              getPaypalBalance();
            });
        }

        function getPaypalBalance() {
          $http({
            method: 'GET',
            url: 'https://' + vm.baseUrl + '/balance/paypal'
          }).then(function successCallback(response) {
            response.data.modified = moment(response.data.modified).fromNow();
            vm.balance.paypal = response.data;
          }, function errorCallback(response) {
            console.log(response);
          });
        }


        // call init function on firstload and reload
        vm.init();
    }

})();