
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , routes = require('./routes')
  , api = require('./api.js');

var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/test');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

//app.dynamicHelpers({ messages: require('express-messages') });
// Some dynamic view helpers
  app.dynamicHelpers({

    request: function(req){
      return req;
    },

    hasMessages: function(req){
      if (!req.session) return false;
      return Object.keys(req.session.flash || {}).length;
    },

    // flash messages
    messages: require('express-messages'),
/*
    // dateformat helper. Thanks to gh-/loopj/commonjs-date-formatting
    dateformat: function(req, res) {
      return require('./lib/dateformat').strftime;
    },

    // generate token using express-csrf module
    csrf: csrf.token
*/
  });


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.post('/thread', api.post);
app.get('/thread/:title.:format?', api.show);
app.get('/thread', api.list);
app.get('/threads', api.myList);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
