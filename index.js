const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const SerialPort = require('serialport');
const log = console.log;

let myPort = new SerialPort('COM3', 9600);

let Readline = SerialPort.parsers.Readline;
let parser = new Readline(); 
myPort.pipe(parser);

myPort.on('open', showPortOpen);

server.listen(3009, () => log('Server Started!'));

app.use(express.static('./public'));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

function showPortOpen() {
	log('Open port ');
	let intervalOn;
	let intervalOff;
	io.on('connection', socket => {
		socket.on('on', () => {
			intervalOn = setInterval(sendOn, 500);
			clearInterval(intervalOff);
		});
		socket.on('off', () => {
			intervalOff = setInterval(sendOff, 500);
			clearInterval(intervalOn);
		});

	});

	function sendOn() {
		myPort.write('o', function (err) {
			if (err) {
				return console.log('Error on write: ', err.message);
			}
			console.log('message On');
		});
	}

	function sendOff() {
		myPort.write('f', function (err) {
			if (err) {
				return console.log('Error on write: ', err.message);
			}
			console.log('message Off');
		});
	}
}