module.exports = {

   createMenu: function(file) {

        //Регулярные выражения для парсинга меню
        var complexPattern = /комплексные обеды/ig;
        var daysPattern = /понедельник|вторник|среда|четверг|пятница/ig;
        var findDishes = /[^0-9]+\s\d{2,3}\s\d{1,}\s*/g;
        var typesPattern = /\s+[А-я]+\s*[А-я]*\s*\s{3,}/g;
        var dishNamePattern = /[^0-9]+/;
        var dishInfoPattern = /[^0-9]+\s\d{2,3}\s/g;
        var weightPattern = /\d{2,3}/;
        var dinnerPattern = /[^0-9]+\d{2,3}\s\d{2}\s([^0-9]+\d{2,3}\s{2})+/g;
        var now = new Date();
       var menu = [];
       
       function Dish(name, price, weight, type, date, modelType) {
           this.name = name;
           this.price = price;
           this.weight = weight;
           this.type = type;
           this.date = date;
           this.modelType = modelType;
           var self = this;
           this.toModel = function(model) {
               return new model({
                   name: self.name,
                   price: self.price,
                   weight: self.weight,
                   type: self.type,
                   date: self.date
               });
           }
       };
       function Dinner(price, date, modelType, dishes) {
           this.price = price;
           this.date = date;
           this.modelType = modelType;
           this.dishes = dishes;
           var self = this;
           this.toModel = function(model) {
               return new model({
                   price: self.price,
                   dishes: self.dishes,
                   date: self.date
               });
           }
       }


        file = file.replace(/\r/g, ' ');
        var allArr = file.split(complexPattern);
        //var menu = fs.readFileSync('nocomplex.txt','utf8');
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
            var dayDate = new Date();
            dayDate.setDate(now.getDate() + (8 + i - now.getDay())); // устанавливаем день = (текущее число + (7 дней недели + 1 (потому что ищем дни следующей недели) + i (номер дня в следующей неделе) - номер сегоднешнего дня)

            //Убираем лишние пробелы в строках по типу блюд и дробим их на отдельные блюда
            for (var j = 0; j < dishArr[i].length; j++) {
                dishArr[i][j] = dishArr[i][j].trim();
                dishArr[i][j] = dishArr[i][j].match(findDishes);

                //Убираем лишние пробелы в блюдах и сохраняем блюда в базу данных
                for (var k = 0; k < dishArr[i][j].length; k++) {
                    dishArr[i][j][k] = dishArr[i][j][k].trim();
                    var newDish = new Dish(dishArr[i][j][k].match(dishNamePattern), parseInt(dishArr[i][j][k].replace(dishInfoPattern, '')), parseInt(dishArr[i][j][k].match(weightPattern)), types[j], dayDate.getDate() + '/' + (dayDate.getMonth() + 1) + '/' + dayDate.getFullYear(), 'Dish');
                    menu.push(newDish);
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
                    dishes[a] = dishes[a].match(/([^0-9]+|\d{2,3})/g);
                    dishes[a] = {
                        dish: dishes[a][0].trim(),
                        weight: dishes[a][1]
                    }

                }
                //Создаем документ для базы данных и сохраняем его
                var newDinner = new Dinner(parseInt(dinnerArr[i][j].replace(/[^0-9]*\s\d{2,3}\s/g, '')), dayDate.getDate() + '/' + (dayDate.getMonth() + 1) + '/' + dayDate.getFullYear(), 'Dinner', dishes);
                menu.push(newDinner);
            }
        }
       return menu;
    },

    saveMenu: function(menu) {
        var Dish = require('../../models/dish');
        var Dinner = require('../../models/dinner');
        menu.forEach(function(item) {
            var dbModel =  item.modelType == 'Dish' ? item.toModel(Dish): item.toModel(Dinner);
            dbModel.save(function(err) {
                if (err) throw err;
            });
        });
    }

}