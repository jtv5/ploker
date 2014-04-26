
/*
 * GET home page.
 */

exports.play = function(req, res){
    var game = req.params.game;
    console.log('game ID: ' + game);
    res.render('play', {title: "Planner Poker", game: game});
};