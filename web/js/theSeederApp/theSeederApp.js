/**
 * @name theSeederApp module configuration
 *
 * @author TheSeeder
 * @version v0.1
 *
 * @description
 * hanldes top level configuration
 *
 */
(function () {
  'use strict';

  var app = angular.module('theSeederApp', ['ui.router', 'angular-loading-bar', 'ngAnimate'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 1;
    }]);
  app.directive('updateTitle', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
      return {
        link: function (scope, element) {

          var listener = function (event, toState) {

            var title = 'TheSeeder';
            if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

            $timeout(function () {
              element.text(title);
            }, 0, false);
          };

          $rootScope.$on('$stateChangeSuccess', listener);
        }
      };
    }
  ]);
  app.directive('highlighter', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        model: '=highlighter'
      },
      link: function(scope, element) {
        scope.$watch('model', function (nv, ov) {
          if (nv !== ov) {
            element.addClass('highlight');
            $timeout(function () {
              element.removeClass('highlight');
            }, 2000);
          }
        });
      }
    };
  }]);
  app.filter('bytes', function() {
    return function(bytes, precision) {
      if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
      if (typeof precision === 'undefined') precision = 1;
      var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
          number = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
    }
  });
  app.filter("trust", ['$sce', function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    }
  }]);

  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    //define module-specific routes here
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'views/partials/index.html',
        controller: 'indexCtrl',
        controllerAs: 'indexVm',
        data: {
          pageTitle: 'TheSeeder'
        }
      })
      .state('info', {
        url: '/info',
        templateUrl: 'views/partials/info.html',
        controller: 'infoCtrl',
        controllerAs: 'infoVm',
        data: {
          pageTitle: 'TheSeeder\'s Info Page'
        }
      })
      .state('howto', {
        url: '/howto',
        templateUrl: 'views/partials/howto.html',
        controller: 'howtoCtrl',
        controllerAs: 'howtoVm',
        data: {
          pageTitle: 'TheSeeder\'s How To Page'
        }
      })
      .state('status', {
        url: '/status',
        templateUrl: 'views/partials/status.html',
        controller: 'statusCtrl',
        controllerAs: 'statusVm',
        data: {
          pageTitle: 'TheSeeder\'s Status Page'
        }
      })
      .state('donate', {
        url: '/donate',
        templateUrl: 'views/partials/donate.html',
        controller: 'donateCtrl',
        controllerAs: 'donateVm',
        data: {
          pageTitle: 'TheSeeder\'s Donation Page'
        }
      });
    $urlRouterProvider.otherwise('/');
  }

})();

$(document).ready(function () {
  $('.button-collapse').sideNav({
    closeOnClick: true
  });
});