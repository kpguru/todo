angular.module('todoApp').controller("UserController", function($scope, $routeParams, $location, Task, User) {
  var serverErrorHandler;
  
  return serverErrorHandler = function() {
    return alert("There was a server error, please reload the page and try again.");
  };
});
