var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var settings = require('./config/settings');
var memo = require('./lib/memo');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('views', './views')
app.set('view engine', 'jade')

app.get('/memo',function(req,res){
    console.log("[REQUEST] GET");
    memo.sendAllMemo(req, res);
});
app.post('/memo', function(req,res){
    console.log("[REQUEST] POST");
    memo.addMemo(req,res);
});
app.post('/memo/:memo_id', function(req,res){
    console.log("[REQUEST] POST-UPDATE");
    memo.updateMemo(req,res);
});
app.put('/memo/:memo_id', function(req,res){
    console.log("[REQUEST] PUT");
    memo.updateMemo(req,res);
});
app.delete('/memo/:memo_id', function(req,res){
    console.log("[REQUEST] DELETE");
    memo.deleteMemo(req,res);
});
app.listen(settings.port, function(){
    var port = settings.port;
    console.log("Server is now running on port %s",port);
});