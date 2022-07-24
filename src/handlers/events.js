const { readdirSync } = require('fs');

module.exports = (client) => {
    let count = 0;
    readdirSync("./src/events/").forEach(file => {
        const event = require(`../events/${file}`);
        client.on(event.name, (...args) => event.run(client, ...args));
        count++;
    });
    client.logger.log(`Os ${count} eventos foram carregados com sucesso`, "event");
}