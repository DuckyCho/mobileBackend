var setting = require('../config/settings');
var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    ObjectId = mongo.ObjectID;

var server = new Server(setting.mongo.host, setting.mongo.port, {auto_reconnect: true});
var db = new Db(setting.mongo.db, server);
var formidable = require('formidable')
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'memo' database");
        db.collection(setting.mongo.db, {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'memo' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
exports.sendAllMemo = function(req, res){
    db.collection('memo', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.render('index',{memos:items});
        });
    });
}
exports.addMemo = function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname+"/../public/photo";
    form.multiples = true;
    form.parse(req,function(err,fields, files){
        var author = fields.author;
        var memo = fields.memo;
        var pattern = /photo\/[a-zA-Z0-9\/_]+/;
        var photoPath = []
        if(files.photo.size != 0 ){
            for(var photoIdx in files.photo){
                if(!files.photo[photoIdx]){
                    photoPath.push(pattern.exec(files.photo.path)[0]);
                    break;
                }
                else{
                    photoPath.push(pattern.exec(files.photo[photoIdx].path)[0])
                }
            }
        }
        db.collection('memo',function(err,collection){
                collection.insert({author:author,memo:memo,photo:photoPath}, {safe:true}, function(err, result) {
                if (err) {
                    res.writeHead(500,{Location:'/memo'})
                    res.end();
                }
                else {
                    res.redirect("/memo");
                }
            });
        });
    });
}
exports.updateMemo = function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname+"/../public/photo";
    form.multiples = true;
    form.parse(req,function(err,fields, files){
        var memoId = req.params.memo_id;
        var o_id = new ObjectId(memoId);
        var author = fields.author;
        var memo = fields.memo;
        var pattern = /photo\/[a-zA-Z0-9\/_]+/;
        var photoPath = []
        if(files.photo.size != 0 ){
            for(var photoIdx in files.photo){
                if(!files.photo[photoIdx]){
                    photoPath.push(pattern.exec(files.photo.path)[0]);
                    break;
                }
                else{
                    photoPath.push(pattern.exec(files.photo[photoIdx].path)[0])
                }
            }
        }
        db.collection('memo',function(err,collection){
            collection.update({_id:o_id},{$set:{author:author,memo:memo,photo:photoPath}},function(err,result){
                if (err) {
                    res.writeHead(500,{Location:'/memo'})
                    res.end();
                }
                else {
                    res.redirect("/memo");
                }
            });
        });
    });
}
exports.deleteMemo = function(req, res) {
    db.collection('memo',function(err, collection){
        var memoId = req.params.memo_id;
        var o_id = new ObjectId(memoId);
        collection.remove({_id:o_id},function(err, result){
            if (err) {
                res.writeHead(500,{Location:'/memo'})
                res.end();
            }
            else {
                res.writeHead(200,{Location:'/memo'})
                res.end();
            }
        });
    });
}
var populateDB = function() {
 
    var memos = [
    {
        author : "YD",
        memo : "너와 나의 연결고리"
    },
    {
        author : "예은",
        memo : "언니 저 맘에 안들죠"
    }];
 
    db.collection(setting.mongo.db, function(err, collection) {
        collection.insert(memos, {safe:true}, function(err, result) {});
    });
 
};