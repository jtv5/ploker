function UserCoordinatesRec(users, radius, width, height) {
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.usersLocation = [];
    this.numUser = users.length;
    this.users = users;
}

UserCoordinatesRec.prototype.getTopCoord = function() {
    var num = this.getSymetricNumber(this.numUser);
    for (var i = 1; i <= num; ++i)
    {
        var x = parseInt(i * this.width / (num+1));
        var cord = {top: -2 * this.radius + "px", left: (x - this.radius) + "px"};
        cord.type = 'top';
        this.usersLocation.push(cord);
    }
    return this.usersLocation;
}

UserCoordinatesRec.prototype.getBottomCoord = function() {
    var count = 1;
    var num = this.getSymetricNumber(this.numUser);
    var last = this.getBottomLastNumber(this.numUser);
    for (var i = num + 1; i < last; ++i)
    {
        var x = parseInt((count++) * this.width / (num+1));
        var cord = {top: this.height + "px", left: (x - this.radius) + "px"};
        cord.type = 'bottom';
        this.usersLocation.push(cord);
    }
    return this.usersLocation;
}

UserCoordinatesRec.prototype.getSymetricNumber = function(numUser) {
    var num = (numUser-2)/2;
    if(numUser%2) {
        num = (numUser-1)/2;
    }
    return num;
}

UserCoordinatesRec.prototype.getBottomLastNumber = function(numUser) {
    var num = numUser-1;
    if(numUser%2) {
        num = numUser;
    }
    return num;
}

UserCoordinatesRec.prototype.getFirstUserCoord = function() {
    var coord =  {top: parseInt(this.height/2 - this.radius) + "px", left: -2 * this.radius + "px"};
    coord.type = 'left';
    this.usersLocation.push(coord);
    return coord;
}

UserCoordinatesRec.prototype.getSecondUserCoord = function() {
    var coord = null;
    if(! (this.numUser%2)) {
        coord = {top: parseInt(this.height/2 - this.radius) + "px", left: this.width + "px"};
        coord.type = 'right';
        this.usersLocation.push(coord);
    }
    return coord;
}

UserCoordinatesRec.prototype.getCoordinates = function() {
    this.getFirstUserCoord();
    this.getSecondUserCoord();
    this.getTopCoord();
    this.getBottomCoord();
    return this.usersLocation;
}


UserCoordinatesRec.prototype.getAssignedUsersToCoordinates = function() {
    var coord = this.getCoordinates();
    for (var i = 0; i < this.numUser; ++i)
    {
        coord[i].name = this.users[i];
    }
    return coord;
}