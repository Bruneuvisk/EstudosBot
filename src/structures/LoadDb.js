const Enmap = require("enmap");

module.exports = client => {
    client.database.settings = new Enmap({
        name: "guilds",
        dataDir: "./src/databases/guilds"
    });

    client.database.users = new Enmap({
        name: "users",
        dataDir: "./src/databases/users"
    });

    client.database.commands = new Enmap({
        name: "commands",
        dataDir: "./src/databases/commands"
    });

    client.logger.log(`Todas as databases foram criadas com sucesso.`, "event");
}