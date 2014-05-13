var plannerPoker = angular.module('plannerPoker', []);

plannerPoker.factory('$socket', function ($rootScope) {
  var socket = io.connect('http://localhost:3000/');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
 
plannerPoker.controller('PlanningPokerCtrl', ['$scope', '$socket', function($scope, $socket) {
    $scope.cards = [
        {'number': '0'},
        {'number': '1/2'},
        {'number': '2'},
        {'number': '3'},
        {'number': '5'},
        {'number': '8'},
        {'number': '13'},
        {'number': '21'},
        {'number': '40'},
        {'number': '100'},
        {'number': '???'}
    ];

    $socket.emit('join room', { room: game, userName: userName });    

    $scope.sendCard = function(card) {
        $socket.emit('send card', { card: card, room: game, fromUser: userName});
    };

}]);

plannerPoker.controller('PokerTableCtrl', ['$scope', '$socket', function($scope, $socket) {   
    $socket.on('updateCards', function (data) {
        $scope.pokerCards = data;
    });
}]);

plannerPoker.controller('PokerUserTableCtrl', ['$scope', '$socket', function($scope, $socket) {   
    $socket.on('updateUsers', function (data) {
        console.log(getUserCoordinates(data));
        $scope.users = getUserCoordinates(data);
    });
}]);

function getUserCoordinates(users)
{
    var numUser = users.length;
    var div = 360 / numUser;
    var radius = 100;
    var parentdiv = document.getElementById('big-circle');
    var offsetToParentCenter = parseInt(parentdiv.offsetWidth / 2);  //assumes parent is square
    var offsetToChildCenter = 25;
    var totalOffset = offsetToParentCenter - offsetToChildCenter;
    var usersLocation = [];
    for (var i = 1; i <= numUser; ++i)
    {
        var childdiv = document.createElement('div');
        var y = parseInt(Math.sin((div * i) * (Math.PI / 180)) * radius);
        var x = parseInt(Math.cos((div * i) * (Math.PI / 180)) * radius);
        var cord = {top: (y + totalOffset).toString() + "px", left: (x + totalOffset).toString() + "px"};
        cord['name'] = users[i-1];
        usersLocation.push(cord);
    }
    return usersLocation;
}