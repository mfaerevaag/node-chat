var net = require('net');
require('colors');


var count = 0,
    users = {};


var server = net.createServer(function (conn) {
    conn.setEncoding('utf8');

    var nickname;
    conn.write(
        "\n > Welcome to " + "node-chat".green + "!" +
        "\n > " + count + " other users connected." +
        "\n > Enter nick: "
    );
    count++;

    conn.on('data', function (data) {
        data = data.replace("\r\n", "");

        if (!nickname) {
            if (users[data]) {
                conn.write(" > Nickname taken. Try again: ".yellow);
                return;
            } else {
                nickname = data;
                users[nickname] = conn;

                for (var i in users) {
                    users[i].write(" > ".concat(nickname, " joined chat\n").grey);
                }
            }
        }
        console.log(data);
    });

    conn.on('close', function () {
        count--;
    })
});

server.listen(3000, function () {
    console.log("    Listening on port 3000".blue);
})
