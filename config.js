var path = require('path');

exports.config = {
	debug: true,
	name: 'Trip',
	description: '',
	keywords: '',
	favicon: '/public/favicon.ico',//favicon.ico 路径
	//Service
	port: 3004,
	db: 'mongodb://yujian:zhang@127.0.0.1/trip',
	session_secret: 'Trip',
	datapath: path.join(__dirname, '/public/data/img'),
};