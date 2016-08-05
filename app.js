/**
 * Created by ievgeniia.krolitska on 7/22/2016.
 */
var express = require('express');
var fs = require('fs');
var multer  = require('multer');
var mongoose = require('mongoose');
var database = require('./config/database');
var config = require('config');



mongoose.connect(config.get('mongoose:uri'));



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

var Dish = require('./models/dish');
var Dinner = require('./models/dinner');

//Регулярные выражения для парсинга меню
var complexPattern = /комплексные обеды/ig;
var daysPattern = /понедельник|вторник|среда|четверг|пятница/ig;
var findDishes = /[^0-9]+\s\d{2,3}\s\d{1,}\s*/g;
var typesPattern = /\s+[А-я]+\s*[А-я]*\s*\s{3,}/g;
var dishNamePattern = /[^0-9]+/;
var dishInfoPattern = /[^0-9]+\s\d{2,3}\s/g;
var weightPattern = /\d{2,3}/;
var dinnerPattern = /[^0-9]+\d{2,3}\s\d{2}\s([^0-9]+\d{2,3}\s{2})+/g;

//Сохраняем текущую дату
var now = new Date();

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

});

function parseMenu(file) {
    file = file.replace(/\r/g, ' ');
    var allArr = file.split(complexPattern);
//var menu = fs.readFileSync('nocomplex.txt','utf8');
        var menu = allArr[0];
        var dinners = allArr[1];

//Разбиваем строку на массив с меню на каждый день недели
        var menuArr = menu.split(daysPattern);

//Первый элемент - пустая строка, потому избавляемся от него
        menuArr.shift();

//Определяем типы блюд
        var types = menuArr[0].match(typesPattern);

//Убираем лишние пробелы в строках
        for (var a = 0; a < types.length; a++) {
            types[a] = types[a].trim();
        }

//Создаем регулярное выражение для дробления строк меню по типам блюд
        var typesReg = new RegExp(types.join('|'), 'g');

//Дробим строки меню на каждый день по типам блюд и избавляемся от первого пустого элемента
        for (var i = 0; i < menuArr.length; i++) {
            menuArr[i] = menuArr[i].split(typesReg);
            menuArr[i].shift();
        }

//Перебираем массив блюд и устанавливаем дату каждого дня на следующей неделе
        for (var i = 0; i < menuArr.length; i++) {
            var dayDate = new Date();
            dayDate.setDate(now.getDate() + (8 + i - now.getDay())); // устанавливаем день = (текущее число + (7 дней недели + 1 (потому что ищем дни следующей недели) + i (номер дня в следующей неделе) - номер сегоднешнего дня)

            //Убираем лишние пробелы в строках по типу блюд и дробим их на отдельные блюда
            for (var j = 0; j < menuArr[i].length; j++) {
                menuArr[i][j] = menuArr[i][j].trim();
                menuArr[i][j] = menuArr[i][j].match(findDishes);

                //Убираем лишние пробелы в блюдах и сохраняем блюда в базу данных
                for (var k = 0; k < menuArr[i][j].length; k++) {
                    menuArr[i][j][k] = menuArr[i][j][k].trim();
                    var newDish = Dish({
                        name: menuArr[i][j][k].match(dishNamePattern),
                        price: parseInt(menuArr[i][j][k].replace(dishInfoPattern, '')),
                        weight: parseInt(menuArr[i][j][k].match(weightPattern)),
                        date: dayDate.getDate() + '/' + (dayDate.getMonth() + 1) + '/' + dayDate.getFullYear(),
                        type: types[j]
                    });
                    newDish.save(function(err) {
                        if (err) throw err;
                    });
                }
            }
        }

//Обрабатываем меню комплексных обедов

//Делим меню на дни
        var dinnerArr = dinners.split(daysPattern);
//Выделяем каждый комплексный обед

        dinnerArr.shift();


//Перебираем массив обедов на день и сохраняем каждый обед в базу данных
        for (var i = 0; i < dinnerArr.length; i++) {
            var dayDate = new Date();
            dayDate.setDate(now.getDate() + (8 + i - now.getDay()));
            //Разбиваем строку из обедов одного на массив обедов в этот день
            dinnerArr[i] = dinnerArr[i].match(dinnerPattern);
            //Перебираем обеды
            for (var j = 0; j < dinnerArr[i].length; j++) {
                //Создаем массив блюд (название и вес) для каждого обеда
                var dishes = dinnerArr[i][j].match(dishInfoPattern);
                //Перебираем этот массив и создаем массив объектов блюд
                for (var a = 0; a < dishes.length; a++) {
                    dishes[a] = dishes[a].match();
                    dishes[a] = {
                        dish: dishes[a][0].trim(),
                        weight: dishes[a][1]
                    }
                }
                //Создаем документ для базы данных и сохраняем его
                var newDinner = Dinner({
                    price: parseInt(dinnerArr[i][j].replace(/[^0-9]*\s\d{2,3}\s/g, '')),
                    dishes: dishes,
                    date: dayDate.getDate() + '/' + (dayDate.getMonth() + 1) + '/' + dayDate.getFullYear()
                });
                newDinner.save(function(err) {
                    if (err) throw err;
                });
            }
        };
    }


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

//Читаем файл

fs.watch('./uploads', {encoding: 'utf8'}, function (eventType, filename) {
    console.log(eventType);
    if (filename) {
        console.log(filename);
        var all = fs.readFileSync(('./uploads/menu.txt'),'utf8');
        if (all.length > 0) {
            parseMenu(all);
        }
    };
})

