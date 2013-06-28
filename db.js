var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./config').config;
var ObjectId = Schema.ObjectId;

mongoose.connect(config.db);

var ScenicSchema = new Schema({  
    id         :    { type : Number,default:0 },
    title      :    { type : String },
    city       :    { type : String },
    area       :    { type : String },
    geography  :    { type : String },
    weather    :    { type : String },
    grade      :    { type : String },
    price      :    { type : String },
    buildtime  :    { type : String },
    category   :    { type : String },
    content    :    { type : String },
    img        :    [String],
    publish    :    { type: Boolean, default: false },
    date       :    { type: Date, default: Date.now },
    son        :    [{ name: String, content: String, date: Date }], 
});

mongoose.model('Scenic', ScenicSchema);