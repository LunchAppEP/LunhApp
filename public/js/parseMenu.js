module.exports = {

   createMenu: function(file) {

       var moment = require('moment');
        //Регулярные выражения для парсинга меню
        var complexPattern = /комплексные обеды/ig;
        var daysPattern = /понедельник|вторник|среда|четверг|пятница/ig;
        var findDishes = /[^0-9]+\s\d{2,3}\s\d{1,}\s*/g;
        var typesPattern = /\s+[А-я]+\s*[А-я]*\s*\s{3,}/g;
        var dishNamePattern = /[^0-9]+/;
        var dishInfoPattern = /[^0-9]+\s\d{2,3}\s/g;
        var weightPattern = /\d{2,3}/;
        var dinnerPattern = /[^0-9]+\d{2,3}\s\d{2}\s([^0-9]+\d{2,3}\s{2})+/g;
        var now = moment();
       var menu = [];
       var days = [];
       
       function Dish(name, price, weight, type, date, modelType) {
           this.name = name;
           this.price = price;
           this.weight = weight;
           this.type = type;
           this.date = date;
           this.modelType = modelType;
       }
       Dish.prototype.toModel = function(model) {
           return new model({
               name: this.name,
               price: this.price,
               weight: this.weight,
               type: this.type,
               date: this.date
           });
       };

       function Dinner(price, date, modelType, dishes) {
           this.price = price;
           this.date = date;
           this.modelType = modelType;
           this.dishes = dishes;
       }
        Dinner.prototype.toModel = function(model) {
            return new model({
                price: this.price,
                dishes: this.dishes,
                date: this.date
            });
        };

        file = file.replace(/\r/g, ' ');
        var allArr = file.split(complexPattern);
        var dishes = allArr[0];
        var dinners = allArr[1];

        //Разбиваем строку на массив с меню на каждый день недели
        var dishArr = dishes.split(daysPattern);

        //Первый элемент - пустая строка, потому избавляемся от него
        dishArr.shift();

        //Определяем типы блюд
        var types = dishArr[0].match(typesPattern);

        //Убираем лишние пробелы в строках
        for (var a = 0; a < types.length; a++) {
            types[a] = types[a].trim();
        }

        //Создаем регулярное выражение для дробления строк меню по типам блюд
        var typesReg = new RegExp(types.join('|'), 'g');

        //Дробим строки меню на каждый день по типам блюд и избавляемся от первого пустого элемента
        for (var i = 0; i < dishArr.length; i++) {
            dishArr[i] = dishArr[i].split(typesReg);
            dishArr[i].shift();
        }

        //Перебираем массив блюд и устанавливаем дату каждого дня на следующей неделе
        for (var i = 0; i < dishArr.length; i++) {
            var dayDate = moment();
            dayDate = dayDate.weekday(8 + i);
            days.push(dayDate.format('DD/MM/YYYY'));
            //Убираем лишние пробелы в строках по типу блюд и дробим их на отдельные блюда
            menu[i] = {date: dayDate.format('DD/MM/YYYY'), dishes: []}
            for (var j = 0; j < dishArr[i].length; j++) {
                dishArr[i][j] = dishArr[i][j].trim();
                dishArr[i][j] = dishArr[i][j].match(findDishes);

                //Убираем лишние пробелы в блюдах и сохраняем блюда в базу данных
                for (var k = 0; k < dishArr[i][j].length; k++) {
                    dishArr[i][j][k] = dishArr[i][j][k].trim();
                    var dishName = dishArr[i][j][k].match(dishNamePattern);
                    var newDish = new Dish(dishName[0], parseInt(dishArr[i][j][k].replace(dishInfoPattern, '')), parseInt(dishArr[i][j][k].match(weightPattern)), types[j], dayDate.format('DD/MM/YYYY'), 'Dish');
                    menu[i].dishes.push(newDish);
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
            var dayDate = moment();
            dayDate = dayDate.weekday(8 + i);
            //Разбиваем строку из обедов одного на массив обедов в этот день
            dinnerArr[i] = dinnerArr[i].match(dinnerPattern);
            menu[i].dinners = [];
            //Перебираем обеды
            for (var j = 0; j < dinnerArr[i].length; j++) {

                //Создаем массив блюд (название и вес) для каждого обеда
                var dishes = dinnerArr[i][j].match(dishInfoPattern);

                //Перебираем этот массив и создаем массив объектов блюд
                for (var a = 0; a < dishes.length; a++) {
                    dishes[a] = dishes[a].match(/([^0-9]+|\d{2,3})/g);
                    dishes[a] = {
                        dish: dishes[a][0].trim(),
                        weight: dishes[a][1]
                    }

                }
                //Создаем документ для базы данных и сохраняем его
                var newDinner = new Dinner(parseInt(dinnerArr[i][j].replace(/[^0-9]*\s\d{2,3}\s/g, '')), dayDate.format('DD/MM/YYYY'), 'Dinner', dishes);
                menu[i].dinners.push(newDinner);
            }
        }
       return {menu: menu, types: types, daysDates: days};
    },

    saveMenu: function(menu) {
        var Dish = require(__base + 'models/dish');
        var Dinner = require(__base + 'models/dinner');
        menu.forEach(function(item) {
            item.dinners.forEach(function(item) {
                var dbModel = item.toModel(Dinner);
                dbModel.save(function(err) {
                    if (err) throw err;
                });
            });
            item.dishes.forEach(function(item) {
                var dbModel = item.toModel(Dish);
                dbModel.save(function(err) {
                    if (err) throw err;
                });
            });
        });
        return true;
    },

    readFile: function() {
        var fs = require('fs');
        var all = fs.readFileSync(('./uploads/menuFile.txt'),'utf8');
        var menuObj = this.createMenu(all);
        return menuObj;
    }

}