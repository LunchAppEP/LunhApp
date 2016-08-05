var express = require('express');
var fs = require('fs');
var multer  = require('multer');
var mongoose = require('mongoose');
var database = require('./config/database');
var parseMenu = require('./public/js/parseMenu.js');
mongoose.connect(database.url);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.txt')
    }
});
var upload = multer({ storage: storage });

var app = express();
app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


app.get('/', function (req, res) {
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile('index.html', options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }

    })
});

app.get('/api/menu', function(req, res) {
    var promise = Dish.find().exec();
    promise.then(function(dishes) {
        res.send(dishes);
    })
});

app.post('/uploads', upload.single('menu'), function(req, res) {
    res.sendStatus(202);
});

fs.watch('./uploads', {encoding: 'utf8'}, function (eventType, filename) {
    console.log(eventType);
    if (filename) {
        console.log(filename);
        var all = fs.readFileSync(('./uploads/menu.txt'),'utf8');
        if (all.length > 0) {
            var menu = parseMenu.createMenu(all);
            parseMenu.saveMenu(menu);
        }
    }
});