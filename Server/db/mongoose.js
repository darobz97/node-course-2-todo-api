var mongoose = require('mongoose');

//Here we specify what promise we want to use (we use the default
//compared to other 3rd party ones)
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://darobz97:ABCDE12345@ds263109.mlab.com:63109/todos-db');
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
