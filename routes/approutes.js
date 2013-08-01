require('../db');
var mongoose = require('mongoose'),
    config = require('../config').config,
    fs = require('fs'), //引用处理文件功能
    crypto = require('crypto'), //引用md5加密
    Util = require('../libs/util'),
    Scenic = mongoose.model('Scenic'),
    markdown = require('markdown').markdown;


exports.list = function(req, res){
  Scenic.count()
    .exec(function(err, count){
      Scenic.find()
        .skip(8*parseInt(req.query.p?req.query.p:0))
        .limit(8)
        .sort({ date: 'desc' })
        .exec(function(err, Scenics){
          res.jsonp(Scenics);
        });
    });
};

exports.detail = function (req, res) {
    Scenic.findOne({ _id: req.params.id })
        .exec(function (err, Scenic) {
            res.jsonp(Scenic);
        });
};