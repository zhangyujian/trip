require('../db');
var mongoose = require('mongoose'),
    config = require('../config').config,
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

function arrRemoveTail(arr){
  var new_arr = [];
  for (var i = 0; i<arr.length - 1; i++){
    new_arr.push(arr[i]);
  };
  return new_arr;
}

// uploadify 
exports.upload = function (req, res) {
  var fileDesc = req.files,
    imgname = fileDesc.Filedata.name,
    path = fileDesc.Filedata.path,
    name = path.replace(config.datapath, ''),
    imgurl = 'http://localhost:3004/data/img/' + name;
  res.send(imgurl);
};

exports.index = function(req, res){
  Scenic.count()
    .exec(function(err, count){
      Scenic.find()
        .skip(8*parseInt(req.query.p?req.query.p:0))
        .limit(8)
        .sort({ date: 'desc' })
        .exec(function(err, Scenics){
          res.render('index', {
            title: '景点列表',
            Scenics: Scenics,
            req: req,
            count: count
          });
        });
    });
};

exports.add = function(req, res){
  if(req.method === 'GET'){
    res.render('add', { 
      title: '添加'
    });
  }else if(req.method === 'POST'){
    if (req.body.title) {
      var imgs = req.body.file_img.split(',');
      new Scenic({
          title   : req.body.title,
          province : req.body.province,
          city : req.body.city,
          area  : req.body.area,
          geography   : req.body.geography,
          weather     : req.body.weather,
          grade     : req.body.grade,
          price     : req.body.price,
          buildtime     : req.body.buildtime,
          category     : req.body.category,
          content     : req.body.content,
          img     : arrRemoveTail(imgs),
          publish     : req.body.publish,
          date    : Date.now()
      }).save(function (err) {
          if(err) throw err;
            res.redirect('/');
          });
    }else{
      res.redirect('/');
    }
  };
};

exports.edit = function( req, res, next ){
  Scenic.findById( req.params.id, function ( err, Scenic ){
    if( err ) return next( err );
    res.render( 'edit', {
      title   : '编辑景点',
      Scenic : Scenic
    });
  });
};

exports.update = function( req, res, next ){
  Scenic.findById( req.params.id, function ( err, Scenic){
    Scenic.title = req.body.title;
    Scenic.province = req.body.province;
    Scenic.city = req.body.city;
    Scenic.area = req.body.area;
    Scenic.geography = req.body.geography;
    Scenic.weather = req.body.weather;
    Scenic.grade = req.body.grade;
    Scenic.price = req.body.price;
    Scenic.buildtime = req.body.buildtime;
    Scenic.category = req.body.category;
    Scenic.publish = req.body.publish;
    Scenic.content = req.body.content;
    var imgs = req.body.file_img.split(',');
    if(Scenic.img != req.body.file_img + ','){
      Scenic.img = arrRemoveTail(imgs);
    }
    Scenic.save( function ( err, Scenic ){
      if( err ) return next( err );
      res.redirect('/');
    });
  });
};

exports.destroy = function ( req, res, next ){
  Scenic.findById( req.params.id, function ( err, Scenic ){
    Scenic.remove( function ( err, Scenic ){
      if( err ) return next( err );
      res.redirect( '/' );
    });
  });
};