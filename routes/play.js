
/*
 * GET home page.
 */

exports.play = function(req, res){
    var game = req.params.game;
    if(! req.session.userName) {
        res.redirect('/' + game);
    }
    res.render('play', {title: "Planner Poker", game: game, userName: req.session.userName});
};