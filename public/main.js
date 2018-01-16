
var socket = io.connect('http://127.0.0.1:3009');
socket.on('connect', function () {
    console.log("Đã kết nối tới socket server")
});

let index = true;
$('#ulSwitch').click(() => {
    if (index) {
        console.log('Off');
        socket.emit("off");
        index = false;
    } else {
        console.log('On');
        index = true;
        socket.emit("on");
    }
});
