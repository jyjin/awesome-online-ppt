var io = null

function onSocketConnect(socket) {
    console.log('* ==> A user connected [ ' + socket.handshake.address.replace('::ffff:', '') + ' ]')

    socket.on('cmd', function (msg) {
        console.log('* msg[cmd] == ', msg)
        io.emit(`cmd_server`, msg)
    });

    socket.on('disconnect', (reason) => {
        console.log('* ==> A user disconnected [ ' + socket.handshake.address.replace('::ffff:', '') + ' ]')
    });

    socket.on('error', (error) => {
        console.log('* socket error, error: ', error)
    });
    
}

function init(server) {
    io = require('socket.io')(server)
    io.on('connection', onSocketConnect);
}

exports.init = init