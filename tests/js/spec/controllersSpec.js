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

/*
describe('PlanningPokerCtrl', function(){
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
*/

describe("getUserCoordinatesRec", function() {
    it("gets user coordinates around the table for one person", function() {
        var users = ['1'];
        var width = 200;
        var height = 100;
        var expected = [{top: "25px", left: "-50px", name: "1"}]

        expect(getUserCoordinatesRec(users,width,height)).toEqual(expected);
    });

    it("gets user coordinates around the table for 2 people", function() {
        var users = ['1','2'];
        var width = 200;
        var height = 100;
        var expected = [
          { top : '25px', left : '-50px', name : '1' },
          { top : '25px', left : '200px', name : '2' }
        ];
        expect(getUserCoordinatesRec(users,width,height)).toEqual(expected);
    });

    it("gets user coordinates around the table for 3 people", function() {
        var users = ['1','2','3'];
        var width = 200;
        var height = 100;
        var expected = [
          { top : '25px', left : '-50px', name : '1' },
          { top : '-50px', left : '75px', name : '2' },
          { top : '100px', left : '75px', name : '3' }
        ];
        expect(getUserCoordinatesRec(users,width,height)).toEqual(expected);
    });

    it("gets user coordinates around the table for 4 people", function() {
        var users = ['1','2','3','4'];
        var width = 200;
        var height = 100;
        var expected = [
          { top : '25px', left : '-50px', name : '1' },
          { top : '25px', left : '200px', name : '2' },
          { top : '-50px', left : '75px', name : '3' },
          { top : '100px', left : '75px', name : '4' }
        ];
        expect(getUserCoordinatesRec(users,width,height)).toEqual(expected);
    });
});