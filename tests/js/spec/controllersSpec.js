//mock socket
plannerPoker.factory("socket", function($rootScope){
  this.events = {};
  // Receive Events
  this.on = function(eventName, callback){
    if(!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  // Send Events
  this.emit = function(eventName, data, emitCallback){
    if(this.events[eventName]){
      angular.forEach(this.events[eventName], function(callback){
        $rootScope.$apply(function() {
          callback(data);
        });
      });
    };
    if(emitCallback) emitCallback();
  }
});

describe('planningPokerCtrl', function(){
    var socket;
    beforeEach(function() {
        module('plannerPoker');

        inject(function($injector) {
            socket = $injector.get('socket');
        });
    });
    it('should display cards on the table', inject(function($controller) {
        var scope = {},
        ctrl = $controller('PlanningPokerCtrl', {$scope:scope,$socket:socket});
        expect(scope.cards.length).toBe(10);
    }));
});