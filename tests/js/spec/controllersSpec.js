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
    var width = 200;
    var height = 100;
    var radius = 25;
    it("gets user coordinates around the table for one person", function() {
        var users = ['1'];
        var userCoord = new UserCoordinatesRec(users, radius, width, height);
        var expected = [{top: "25px", left: "-50px", type: 'left'}]
        expect(expected).toEqual(userCoord.getCoordinates());
    });

    it("gets user coordinates and assigned name around the table for one person", function() {
        var users = ['1'];
        var userCoord = new UserCoordinatesRec(users, radius, width, height);
        var expected = [{top: "25px", left: "-50px", type: 'left', name: "1"}]
        expect(expected).toEqual(userCoord.getAssignedUsersToCoordinates());
    });

    it("gets user coordinates around the table for 2 people", function() {
        var users = ['1','2'];
        var userCoord = new UserCoordinatesRec(users, radius, width, height);
        var expected = [
          { top : '25px', left : '-50px', type: 'left'},
          { top : '25px', left : '200px', type: 'right'}
        ];
        expect(expected).toEqual(userCoord.getCoordinates());
    });

    it("gets user coordinates around the table for 3 people", function() {
        var users = ['1','2','3'];
        var userCoord = new UserCoordinatesRec(users, radius, width, height);
        var expected = [
          { top : '25px', left : '-50px', type: 'left'},
          { top : '-50px', left : '75px', type: 'top'},
          { top : '100px', left : '75px', type: 'bottom'}
        ];
        expect(expected).toEqual(userCoord.getCoordinates());
    });

    it("gets user coordinates around the table for 4 people", function() {
        var users = ['1','2','3','4'];
        var userCoord = new UserCoordinatesRec(users, radius, width, height);
        var expected = [
          { top : '25px', left : '-50px', type: 'left'},
          { top : '25px', left : '200px', type: 'right'},
          { top : '-50px', left : '75px', type: 'top'},
          { top : '100px', left : '75px', type: 'bottom'}
        ];
        expect(expected).toEqual(userCoord.getCoordinates());
    });

    it("gets user coordinates around the table for 5 people", function() {
        var users = ['1','2','3','4','5'];
        var userCoord = new UserCoordinatesRec(users, radius, width, height);
        var expected = [
          { top : '25px', left : '-50px', type: 'left'},
          { top : '-50px', left : '41px', type: 'top'},
          { top : '-50px', left : '108px', type: 'top'},
          { top : '100px', left : '41px', type: 'bottom'},
          { top : '100px', left : '108px', type: 'bottom'}
        ];
        expect(expected).toEqual(userCoord.getCoordinates());
    });

    it("gets user coordinates and assigned name around the table for 5 people", function() {
        var users = ['1','2','3','4','5'];
        var userCoord = new UserCoordinatesRec(users, radius, width, height);
        var expected = [
          { top : '25px', left : '-50px', type: 'left', name: "1"},
          { top : '-50px', left : '41px', type: 'top', name: "2"},
          { top : '-50px', left : '108px', type: 'top', name: "3"},
          { top : '100px', left : '41px', type: 'bottom', name: "4"},
          { top : '100px', left : '108px', type: 'bottom', name: "5"}
        ];
        expect(expected).toEqual(userCoord.getAssignedUsersToCoordinates());
    });
});