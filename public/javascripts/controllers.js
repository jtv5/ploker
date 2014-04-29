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
        {'number': '100'}
    ];

    $socket.emit('join room', { room: game });    

    $scope.sendCard = function(card) {
        $socket.emit('send card', { card: card, room: game, fromUser: userName});
    };

}]);

plannerPoker.controller('PokerTableCtrl', ['$scope', '$socket', function($scope, $socket) {   
    $socket.on('updateCards', function (data) {
        $scope.pokerCards = data;
    });
}]);