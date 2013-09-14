var net = require('net');
require('colors');


var count = 0;


var server = net.createServer(function (conn) {
    conn.write(
        "\n > Welcome to " + "node-chat".blue + "!" +
        "\n > " + count + " other users connected." +
        "\n > Enter nick: "
    );
    count++;
});

server.listen(3000, function () {
    console.log("    Listening on port 3000".blue);
})
