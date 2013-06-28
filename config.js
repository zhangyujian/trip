exports.config = {
	debug: true,
	name: 'Trip',
	description: '',
	keywords: '',
	favicon: '/public/favicon.ico',//favicon.ico 路径
	//Service
	port: 3003,
	db: 'mongodb://localhost/trip',
	session_secret: 'Trip'
};