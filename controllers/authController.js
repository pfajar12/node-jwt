var mysql   = require('mysql');
var config  = require('../config');
var bcrypt  = require('bcrypt');

var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
});

class AuthController{

    static register(req, res){
        var {username, password} = req.body;
        var saltRounds = 10;
        bcrypt.hash(password.toString(), saltRounds, function (err, hash) {
            connection.query('insert into user set ?', {username: username, password: hash, role: 2, is_voting: 0}, function(err, results, fields){
            })
        });
        return  res.json({
            'success' : true,
            'message' : 'register success'
        });
    }

    static login(req, res){
        var {username, password} = req.body;
        connection.query('select id, password from user where username="'+username+'"', function(err, results, fields){
            if(results!=''){
                console.log(results[0].password)
                return  res.json(results[0]);
            }
            else{
                return  res.json({
                    'success' : false,
                    'message' : 'account not valid'
                });
            }
        })
        // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {})
    }
}

module.exports = AuthController;