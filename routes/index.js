
/*
 * GET home page.
 */

exports.index = function(req, res){
  req.flash('info', 'text');
  res.render('index', { title: 'Express' })
};
