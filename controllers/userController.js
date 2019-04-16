var mysql   = require('mysql');
var config  = require('../config');

var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
});

class UserController{

    static getAllData(req, res){
        connection.query('select * from user', function (err, results, fields) {
            if (err) return res.json({ success: false, error: err });
            return res.json(results);
        });
    }

    static getProfile(req, res){
        return res.json(req.decoded.results)
    }
}

module.exports = UserController;