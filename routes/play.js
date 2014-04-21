
/*
 * GET home page.
 */

exports.play = function(req, res){
  res.render('play', {title: "Planner Poker"});
};