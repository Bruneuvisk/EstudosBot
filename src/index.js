const EstudosBot = require("./structures/Client");
const client = new EstudosBot();
const { EventEmitter } = require("events")

require("../src/handlers/commands")(client)
require("../src/handlers/events")(client)
require("../src/structures/LoadDb")(client)

client.connect()

process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p);
});

process.on('uncaughtException', (err, origin) => {
    console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(err, origin);
});

client.setMaxListeners(0);
EventEmitter.defaultMaxListeners = 0;

module.exports = client;