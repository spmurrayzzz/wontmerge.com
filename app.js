var express = require('express'),
  app = express(),
  fs = require('fs'),
  mustacheExpress = require('mustache-express'),
  sizeOf = require('image-size'),
  assetsPath = __dirname + '/assets',
  images;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/templates');
app.use('/assets', express.static(assetsPath));

images = fs.readdirSync(assetsPath + '/img');

app.get('/', function(req, res){
  var rand = Math.round(Math.random() * (images.length - 1)),
    randomImg = images[rand],
    size = sizeOf(assetsPath + '/img/' + randomImg);
    res.render('index.mustache', { image: randomImg, size: size });
});

app.listen(80);
