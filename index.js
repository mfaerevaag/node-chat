var net = require('net');
require('colors');

var server = net.createServer(function (conn) {
    // handle connection
    console.log("    New connection!".grey);
})

server.listen(3000, function () {
    console.log("    Listening on port 3000".blue);
})
