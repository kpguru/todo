angular.module('todoApp').controller("DashboardController", function($scope, $routeParams, $location, Task, User) {
  var serverErrorHandler;
  
  $scope.user_id = $routeParams.user_id;
  
  if($scope.user_id){
    this.userService = new User(serverErrorHandler);
    $scope.tasks = this.userService.tasks($scope.user_id);
    $scope.user = this.userService.show($scope.user_id);
  }else{
    this.userService = new User(serverErrorHandler);
    $scope.pending_users = this.userService.pendings();
    $scope.approved_users = this.userService.approved();
    this.taskService = new Task(serverErrorHandler);
    $scope.tasks = this.taskService.all();
  }
  
  $scope.addTask = function(name) {
    var task;
    task = new Task(serverErrorHandler).create({ name: name, user_id: $scope.user_id });
    $scope.tasks.unshift(task);
    return $scope.taskName = "";
  };
  
  $scope.deleteTask = function(task, index) {
    var result;
    result = confirm("Are you sure you want to complete this task?");
    if (result) {
      new Task(serverErrorHandler)["delete"](task);
      return $scope.tasks.splice(index, 1);
    }
  };
  
  $scope.dueDatePicked = function(task) {
    return new Task(serverErrorHandler).update(task, {
      due_date: task.due_date
    });
  };

  $scope.completeTask = function(task, index) {
    new Task(serverErrorHandler).update(task, {
      completed: true
    });
    return $scope.tasks.splice(index, 1);
  };
  
  $scope.userTask = function(user) {    
    $location.path('/users/'+user.id+'')
  };
  
  $scope.approveUser = function(user, index) {
    var result;
    result = confirm("Are you sure you want to approve this user?");
    if (result) {
      new User(serverErrorHandler).update(user, {approved: true});
      $scope.pending_users.splice(index, 1);
      $scope.approved_users.unshift(user);
    }
  };
  $scope.rejectUser = function(user, index) {
    var result;
    result = confirm("Are you sure you want to reject this user?");
    if (result) {
      new User(serverErrorHandler).update(user, {approved: false});
      $scope.approved_users.splice(index, 1);
      $scope.pending_users.unshift(user);
    }
  };

  return serverErrorHandler = function() {
    return alert("There was a server error, please reload the page and try again.");
  };
});
