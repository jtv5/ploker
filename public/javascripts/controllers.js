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
    $socket.on('updateUsers', function (data) {
        //console.log(getUserCoordinatesRec(data));
        data = ['1','2','3','4','5','6','7','8'];
        $scope.users = getUserCoordinatesRec(data,width,height);
    });
}]);

function getUserCoordinatesCircle(users)
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
        var y = parseInt(Math.sin((div * i) * (Math.PI / 180)) * radius);
        var x = parseInt(Math.cos((div * i) * (Math.PI / 180)) * radius);
        var cord = {top: (y + totalOffset).toString() + "px", left: (x + totalOffset).toString() + "px"};
        cord['name'] = users[i-1];
        usersLocation.push(cord);
    }
    return usersLocation;
}

function getUserCoordinatesRec(users, parentOffsetWidth, parentOffsetHeight)
{
    var numUser = users.length;
    //var div = 360 / numUser;
    var radius = 25;
    var width = parentOffsetWidth;
    var height = parentOffsetHeight;
    var usersLocation = [];
    if(numUser%2) {
        usersLocation.push({top: parseInt(height/2 - radius) + "px", left: -2*radius + "px", name: users[0]});
        var num = (numUser-1)/2;
        for (var i = 1; i <= num; ++i)
        {
            var y = -2*radius;
            var x = parseInt(i * width / (num+1));
            var cord = {top: y + "px", left: (x - radius).toString() + "px"};
            cord['name'] = users[i];
            usersLocation.push(cord);
        }
        var count = 1;
        for (var i = num + 1; i < numUser; ++i)
        {
            var y = height;
            var x = parseInt((count++) * width / (num+1));
            var cord = {top: y + "px", left: (x - radius).toString() + "px"};
            cord['name'] = users[i];
            usersLocation.push(cord);
        }
    } else {
        usersLocation.push({top: parseInt(height/2 - radius) + "px", left: -2*radius + "px", name: users[0]});
        usersLocation.push({top: parseInt(height/2 - radius) + "px", left: width + "px", name: users[1]});
        var num = (numUser-2)/2;
        for (var i = 1; i <= num; ++i)
        {
            var y = -2*radius;
            var x = parseInt(i * width / (num+1));
            var cord = {top: y + "px", left: (x - radius).toString() + "px"};
            cord['name'] = users[i+1];
            usersLocation.push(cord);
        }
        var count = 1;
        for (var i = num + 1; i < numUser-1; ++i)
        {
            var y = height;
            var x = parseInt((count++) * width / (num+1));
            var cord = {top: y + "px", left: (x - radius).toString() + "px"};
            cord['name'] = users[i+1];
            usersLocation.push(cord);
        }
    }
    return usersLocation;
}