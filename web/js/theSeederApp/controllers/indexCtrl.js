/**
 * @namespace indexCtrl
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
        .controller('indexCtrl', indexController);

    function indexController($scope) {

        var vm = this;

        // controller API
        vm.init = init;


        /**
         * @name init
         * @desc data initialization function
         * @memberOf indexCtrl
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