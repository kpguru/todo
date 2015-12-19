angular.module('todoApp').factory('User', function($resource, $http) {
  var User;
  return User = (function() {
    function User(errorHandler) {
      var defaults;
      this.service = $resource('/api/users', {
        id: '@id'
      }, {
        update: {
          url: '/api/users/:id',
          method: 'PATCH'
        },
        show: {
          url: '/api/users/:id',
          method: 'GET'
        }
      });
      this.errorHandler = errorHandler;
      defaults = $http.defaults.headers;
      defaults.patch = defaults.patch || {};
      defaults.patch['Content-Type'] = 'application/json';
    }

    User.prototype.all = function() {
      return this.service.query((function() {
        return null;
      }), this.errorHandler);
    };
    
    User.prototype.tasks = function(id) {
      var Task = $resource('/api/users/:id/tasks',
        {id: id}, {
        task: {method:'GET'}
       });
       return Task.query(function() {})
    };
    
    User.prototype.pendings = function(id) {
      var Pending = $resource('/api/users/pendings',
        {}, {
        task: {method:'GET'}
       });
       return Pending.query(function() {})
    };
    
    User.prototype.approved = function(id) {
      var Approved = $resource('/api/users/approved',
        {}, {
        task: {method:'GET'}
       });
       return Approved.query(function() {})
    };
    
    User.prototype.update = function(user, attrs) {
      new this.service({
        user: attrs
      }).$update({
        id: user.id
      }, (function() {
        return null;
      }), this.errorHandler);
    };
    
    User.prototype.show = function(id) {
      new this.service({
      }).$show({
        id: id
      }, (function() {
        return null;
      }), this.errorHandler);
    };

    return User;

  })();
});
