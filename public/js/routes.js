var dishes = require(__base + 'controllers/dish'),
    dinners = require(__base + 'controllers/dinner'),
    menu = require(__base + 'controllers/menu'),
    orders = require(__base + 'controllers/order'),
    users = require(__base + 'controllers/user'),
    multer  = require('multer'),
    parseMenu = require(__base + 'public/js/parseMenu.js'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '.txt')
        }
    }),
    upload = multer({ storage: storage });

module.exports = function (app) {
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

    app.post('/uploads', upload.single('menuFile'), function(req, res) {
        res.send(parseMenu.readFile());
    });


    //REST
    app.get('/api/menu', menu.get);
    app.get('/api/dinners', dinners.get);
    app.get('/api/dishes', dishes.get);
    app.get('/api/orders', orders.get);
    app.get('/api/users', users.get);
    app.post('/api/users', users.post);
}