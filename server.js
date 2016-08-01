
var fs = require('fs');

var menu = fs.readFileSync('nocomplex.txt','utf8');
var daysPattern = /понедельник|вторник|среда|четверг|пятница/ig;
var complexPattern = /комплексные обеды/ig;
var findDishes = /[^0-9]*\s\d{3}\s\d{1,}\s*/g;
menu = menu.replace(/\r/g, ' ');
var menuArr = menu.split(daysPattern);
menuArr.shift();
var types = menuArr[0].match(/\s+[А-я]+\s*[А-я]*\s*\s{3,}/g);
for (var a = 0; a < types.length; a++) {
    types[a] = types[a].trim();
}
var typesReg = new RegExp(types.join('|'), 'g');
console.log(typesReg);
for (var i = 0; i < menuArr.length; i++) {
    menuArr[i] = menuArr[i].split(typesReg);
    menuArr[i].shift();
}
console.log(menuArr);
var now = new Date();
var day = now.getDay();
now.setDate(now.getDate() + (8 - day));
for (var i = 0; i < menuArr.length; i++) {
    for (var j = 0; j < menuArr[i].length; j++) {
        menuArr[i][j] = menuArr[i][j].trim();
        menuArr[i][j] = menuArr[i][j].match(findDishes);
        for (var k = 0; k < menuArr[i][j].length; k++) {
            menuArr[i][j][k] = menuArr[i][j][k].trim();
        }
    }
}

console.log(now, day);
console.log(menuArr);