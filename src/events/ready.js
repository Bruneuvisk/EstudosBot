const { format } = require("currency-formatter");
const { owners } = require("../interfaces/Config.js");
const { ActivityType } = require("discord.js")


module.exports = {
    name: "ready",
    run: async (client) => {
        const bruno = await client.users.fetch(owners[0])

        let status = [
            { name: `es!help para ter acesso aos meus comandos`, type: ActivityType.Watching },
            { name: `Estou ativo com um total de ${format(client.users.cache.size, { code: "de-DE", symbol: "", precision: 0})} usuários estudando.`, type: ActivityType.Watching },
            { name: `Meu dono e criador ${bruno.tag}`, type: ActivityType.Watching },
            { name: `Vim aqui para lhe auxiliar o máximo possível em seu servidor`, type: ActivityType.Watching },
        ]
    
        function setStatus() {
            let randomStatus = status[Math.floor(Math.random()*status.length)]
            client.user.setPresence({ activities: [randomStatus] })
        };

        setStatus();
        setInterval(() => setStatus(), 25000);
        client.logger.log(`${client.user.username} online!`, "ready");
        client.logger.log(`O Bot ${client.user.tag} foi inicializado em ${client.guilds.cache.size} servidores e com um total de ${client.users.cache.size} usuários`, "ready");
    }
}