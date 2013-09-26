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

// variables
var count = 0,
    users = {};

var server = net.createServer(function (conn) {
    conn.setEncoding('utf8');

    // welcome
    var nickname;
    conn.write(
        "\n > Welcome to " + "node-chat".green + "!" +
        "\n > " + count + " other users connected." +
        "\n > Enter nick: "
    );
    count++;

    function broadcast (msg) {
        for (var i in users) {
            users[i].write(msg);
        }
    }

    // data callback
    conn.on('data', function (data) {
        data = data.replace("\r\n", ""); // remove the return carracter

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
            broadcast(" > ".concat(nickname, ": ").blue + data + "\n");
        }
    });

    // close callback
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
    console.log("Listening on port 3000".blue);
})
