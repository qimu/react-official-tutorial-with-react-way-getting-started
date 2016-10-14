import path from 'path';
import express from 'express';
var fs = require('fs');
import low from 'lowdb';
import fileAsync from 'lowdb/lib/file-async';

const db = low('db.json', {
  storage: fileAsync
});

db.defaults({comments: []})
  .value();

const comments = db.get('comments');


var bodyParser = require('body-parser');

var app = express();
var server;

const PATH_STYLES = path.resolve(__dirname, '../client/styles');
const PATH_DIST = path.resolve(__dirname, '../../dist');

app.use('/styles', express.static(PATH_STYLES));
app.use(express.static(PATH_DIST));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

var COMMENTS_FILE = path.join(__dirname, 'comments.json');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  // fs.readFile(COMMENTS_FILE, function(err, data) {
  //   if (err) {
  //     console.error(err);
  //     process.exit(1);
  //   }
  //   res.json(JSON.parse(data));
  // });
  const commentsNow = comments.value();
  res.json(commentsNow);
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});




server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;

  console.log('Server is listening at %s', port);
});
