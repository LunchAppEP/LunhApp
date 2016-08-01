// /**
//  * Created by ievgeniia.krolitska on 7/29/2016.
// //  */
// module.exports = function(app) {
//     app.get('/', function (req, res) {
//         var options = {
//             root: __dirname + '/public/',
//             dotfiles: 'deny',
//             headers: {
//                 'x-timestamp': Date.now(),
//                 'x-sent': true
//             }
//         };
//         res.sendFile('index.html', options, function (err) {
//             if (err) {
//                 console.log(err);
//                 res.status(err.status).end();
//             }
//
//         })
//     });
//
//     app.get('api/menu', function(req, res) {
//         var query = dishes.find({'name'}, function (err, dishes) {
//             if (err) {
//                 res.send(err)
//             }
//             console.log(dishes);
//             res.send(dishes);
//         })
//     })
// }