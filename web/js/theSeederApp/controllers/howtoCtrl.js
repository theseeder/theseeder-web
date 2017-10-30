/**
 * @namespace howtoCtrl
 *
 * @author: TheSeeder
 * @version: v0.1
 *
 * @description
 * handles functionality for the howto page
 *
 */
(function () {
    'use strict';

    angular
        .module('theSeederApp')
        .controller('howtoCtrl', howtoController);

    function howtoController($scope) {

        var vm = this;

        // controller API
        vm.init = init;


        /**
         * @name init
         * @desc data initialization function
         * @memberOf howtoCtrl
         */
        function init() {
            angular.element(document).ready(function () {
                $('.tooltipped').tooltip();
            });
        }

        // call init function on firstload and reload
        vm.init();
    }

})();



  