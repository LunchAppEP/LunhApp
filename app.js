var express = require('express');
var fs = require('fs');
var multer  = require('multer');
var mongoose = require('mongoose');
var config = require('./config/index.js');
var parseMenu = require('./public/js/parseMenu.js');



mongoose.connect(config.get('mongoose:uri'));

global.__base = __dirname + '/';

var nextWeek = require('./public/js/createNextWeek.js');

var app = express();


app.set('port' , config.get('port'));

app.use(express.static('public'));

app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' +  config.get('port') );
    nextWeek.createNextWeek();
});



require(__base + 'public/js/routes.js')(app);


//удаление устаревшиего меню
// var now = new Date();
// var dataOldWeekFriday = new Date();
// dataOldWeekFriday.setDate(now.getDate() - 16 ); //находим необхдимую неделю для удаления ( минус 2 недели незед)
//
// while (dataOldWeekFriday.getDay() != 5 ) {
//     dataOldWeekFriday.setDate(dataOldWeekFriday.getDate() + 1); //находим пятницу недели которую неоходимо удалить из БД
// }
// var deletaPeriod = []; //создаем на наполняем массив датами которые хотим удалить из БД
// for (var t = 0; t < 5; t++) {
//     deletaPeriod[t] = dataOldWeekFriday.getDate()- t  + '/' + (dataOldWeekFriday.getMonth() +1)  + '/' + dataOldWeekFriday.getFullYear();
// };


// app.get('/hello', function (req, res) {
//     Dish.remove({
//             'date': {
//                 $in: deletaPeriod
//             }
//         } , function (err , resulr) {
//             if (err) return handleError(err);
//             res.send(resulr);
//         }
//     );
// });





