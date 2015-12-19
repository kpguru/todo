angular.module('todoApp').controller("TodoListController", function($scope, $timeout, $routeParams, Task) {
  var serverErrorHandler;

  $scope.init = function() {
    this.taskService = new Task(serverErrorHandler);
    return $scope.tasks = this.taskService.all();
  };

  $scope.deleteTask = function(task) {
    lowerPrioritiesBelow(task);
    this.taskService["delete"](task);
    return $scope.tasks.splice($scope.tasks.indexOf(task), 1);
  };

  $scope.dueDatePicked = function(task) {
    return this.taskService.update(task, {
      due_date: task.due_date
    });
  };

  $scope.dueDateNullLast = function(task) {
    var ref;
    return (ref = task.due_date) != null ? ref : '2999-12-31';
  };
  serverErrorHandler = function() {
    return alert("There was a server error, please reload the page and try again.");
  };
});
