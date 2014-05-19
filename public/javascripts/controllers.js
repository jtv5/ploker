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
    var parentdiv = document.getElementById('big-rec');
    var width = parentdiv.offsetWidth;
    var height = parentdiv.offsetHeight;
    var radius = 25;
    $socket.on('updateUsers', function (data) {
        var userCoord = new UserCoordinatesRec(data, radius, width, height);
        $scope.users = userCoord.getAssignedUsersToCoordinates();
    });
}]);

