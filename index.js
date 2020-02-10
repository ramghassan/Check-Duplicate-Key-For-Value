require('babel-register')({
    presets: [ 'es2015' ]
 });
 
var checkDuplicateEntry = require('./checkDuplicateEntry');
module.exports = checkDuplicateEntry
