require('../db');
var mongoose = require('mongoose'),
    fs = require('fs'), //引用处理文件功能
    crypto = require('crypto'), //引用md5加密
    Util = require('../libs/util'),
    Scenic = mongoose.model('Scenic'),
    markdown = require('markdown').markdown;

//创建md5方法
function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

exports.index = function(req, res){
  res.render('index', { 
    title: '首页'
  });
};

exports.add = function(req, res){
  if(req.method === 'GET'){
    res.render('add', { 
      title: '添加'
    });
  }else if(req.method === 'POST'){
  };
};