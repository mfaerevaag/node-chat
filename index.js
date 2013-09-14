/*
 * node-chat
 * Simple telnet chat client
 * Based off Smashing Node.js
 * @7SLEVIN
 */


/*
 * Module dependencies
 */

var net = require('net');
require('colors');


/*
 * Server
 */

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

    function broadcast (msg, exeptMyself) {
        for (var i in users) {
            if (!exceptMyself || i != nickname) {
                users[i].write(msg);
            }
        }
    }

    conn.on('data', function (data) {
        data = data.replace("\r\n", "");

        if (!nickname) {
            // new user
            if (users[data]) {
                conn.write(" > Nickname taken. Try again: ".yellow);
                return;
            } else {
                nickname = data;
                users[nickname] = conn;

                broadcast(" > ".concat(nickname, " joined chat\n").grey);
            }
        } else {
            // chat message
            broadcast(" > ".concat(nickname, ": ").blue + data + "\n", true);
        }
    });

    conn.on('close', function () {
        count--;
        delete users[nickname];
        broadcast(" > ".concat(nickname, " left chat\n".grey));
    })
});


/*
 * Listen
 */

server.listen(3000, function () {
    console.log("    Listening on port 3000".blue);
})