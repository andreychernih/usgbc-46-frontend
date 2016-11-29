'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.signup',
  'myApp.confirm',
  'myApp.signin',
  'myApp.signout',
  'myApp.version',
  'ngMap'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/signin'});
}]).

controller('AppCtrl', ['$scope', 'currentUserService', '$location', function($scope, currentUserService, $location) {
  $scope.currentUser = function() { return currentUserService.get(); }
}]).

factory('currentUserService', function() {
  var currentUser = null;
  function set(data) {
    currentUser = data;
  }
  function get() {
    if (currentUser) {
      return currentUser;
    } else {
      var data = { UserPoolId : 'us-west-2_jgBW5EV5h',
        ClientId : '6bs2n2qs29hile7l41oqspsltd'
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
      var cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession(function(err, session) {
          if (err) {
            alert(err);
            return;
          }
          console.log('session validity: ' + session.isValid());
        });
      }
      return cognitoUser;
    }
  }

  return {
    set: set,
    get: get
  }
});
