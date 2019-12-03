/**
 * server.js
 * create by jyjin 
 * create at 2018.07.25
 */
const { port } = require('./config')
const http = require('http')
const app = require('./app')
const socket = require('./socket')

app.set('port', port)

const server = http.createServer(app)
socket.init(server)


server.listen(port)
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        console.error(`error on listen ${port}`)
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`\n* listen on port ${bind}...`)
}

