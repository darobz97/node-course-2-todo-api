const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

/*
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});*/

var hashedPassword = '$2a$10$/9G/dAQre6SvOAE7I33I4OF5XTA9/Mf.02Lv/mUWWtxeiGaoktaOu';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})

var data = {
  id: 10
}

//takes the data with the user id and signs it, creating the hash and returning the token value
//'123abc' is the secret. the token var is what we send to the user when they log in or sign up
var token = jwt.sign(data, '123abc')
//console.log(token);
//Takes the token and the secret and makes sure the data wasn't manipulated
var decoded = jwt.verify(token, '123abc');
//console.log(decoded);
