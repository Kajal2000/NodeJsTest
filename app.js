const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const device = require('express-device');
const env = process.env.NODE_ENV || 'development';
const constants = require(`${__dirname}/server/config/constants.json`)[env];
const json2xls = require('json2xls');
 
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(device.capture());
app.use(json2xls.middleware);

// Require our routes into the application.
require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome to the beginning',
}));


const port = parseInt(process.env.PORT, 10) || constants.port;
app.set('port', port);

fs = require('fs');

console.log("ENV", process.env.NODE_ENV);

if (process.env.NODE_ENV == 'local' || process.env.NODE_ENV == 'development'){
	var http = require('http');
	var server = http.createServer(app);
} else {
	private_key = fs.readFileSync('/home/ssl_keys/smartmussl.key', 'utf8');
	certificate = fs.readFileSync('/home/ssl_keys/STAR_smartmu_com.crt', 'utf8');
	ca_certificate = fs.readFileSync('/home/ssl_keys/STAR_smartmu_com.ca-bundle', 'utf8');
	credentials = {
		key: private_key,
		cert: certificate,
		ca: ca_certificate
	}
	var http = require('https');
	var server = http.createServer(credentials, app);
}

server.listen(port);
console.log("server listening to port: ", port);
module.exports = app;	