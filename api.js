/* The API controller
   Exports 3 methods:
   * post - Creates a new thread
   * list - Returns a list of threads
   * show - Displays a thread and its posts
*/


var Thread = require('./model/thread.js');
var Post = require('./model/post.js');

exports.post = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
}

exports.list = function(req, res) {
  Thread.find(function(err, threads) {
    res.send(threads);
  });
}

exports.myList = function(req, res) {
  Thread.find({}, function(err, threads) {
    if(err) {
      req.flash('error', err);
      console.log(err);
    }
    req.flash('notice', 'Nalezeno');
    req.flash('info', 'Nalezeno');
    res.render('thread/index', {
      title: 'List of Threads',
      threads: threads
    });
  });
}

// first locates a thread by title, then locates the replies by thread ID.
exports.show = (function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread) {
        var posts = Post.find({thread: thread._id}, function(error, posts) {
          res.send([{thread: thread, posts: posts}]);
        });
    })
});
