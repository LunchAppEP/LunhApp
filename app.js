var express = require('express');
var fs = require('fs');
var multer  = require('multer');
var mongoose = require('mongoose');
var database = require('./config/database');
var config = require('config');
var parseMenu = require('./public/js/parseMenu.js');

mongoose.connect(config.get('mongoose:uri'));

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

app.set('port' , config.get('port'));

app.use(express.static('public'));

app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' +  config.get('port') );
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

//удаление устаревшиего меню

var dataOldWeekFriday = new Date();
dataOldWeekFriday.setDate(now.getDate() - 16 ); //находим необхдимую неделю для удаления ( минус 2 недели незед)

while (dataOldWeekFriday.getDay() != 5 ) {
    dataOldWeekFriday.setDate(dataOldWeekFriday.getDate() + 1); //находим пятницу недели которую неоходимо удалить из БД
}
var deletaPeriod = []; //создаем на наполняем массив датами которые хотим удалить из БД
for (var t = 0; t < 5; t++) {
    deletaPeriod[t] = dataOldWeekFriday.getDate()- t  + '/' + (dataOldWeekFriday.getMonth() +1)  + '/' + dataOldWeekFriday.getFullYear();
};


app.get('/hello', function (req, res) {
    Dish.remove({
            'date': {
                $in: deletaPeriod
            }
        } , function (err , resulr) {
            if (err) return handleError(err);
            res.send(resulr);
        }
    );
});

//для выборки и просмотра текущей базы данных , вспомогательная для разработки 
// app.get('/db', function (req, res) {
//
//     var query = Dish.find(  {}, function(err, docs){
//
//         if (err) return handleError(err);
//         res.send(docs);
//     });
//
// });


fs.watch('./uploads', {encoding: 'utf8'}, function (eventType, filename) {
    console.log(eventType);
    if (filename) {
        console.log(filename);
        var all = fs.readFileSync(('./uploads/menu.txt'),'utf8');
        if (all.length > 0) {
            var menu = parseMenu.createMenu(all);
            parseMenu.saveMenu(menu);
        }
    };
})

