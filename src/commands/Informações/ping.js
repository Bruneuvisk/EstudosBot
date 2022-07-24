const EmbedEstudos = require("../../structures/EmbedEstudos");
const { PermissionsBitField } = require("discord.js")


module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "Informações",
    description: "Exibe o ping atual.",
    usage: "",
    memberperm: [PermissionsBitField.Flags.SendMessages],
    clientperm: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    requiredroles: [],
    alloweduserids: [],
    execute: async (client, message, args, prefix, emojis) => {
        let oldate = new Date().getMilliseconds()

        let embedping = new EmbedEstudos()
        .setTitle(`${emojis.emojicerto} | Informações sobre Ping`)
        .setDescription(`${emojis.emojisetinha} | **__Abaixo cito 3 tipos dos meus pings separados por categoria e API:__** \n\n ${emojis.emojisetinha} | **Latência do Bot:** \`${Math.floor(Date.now() - message.createdTimestamp - 2 * Math.floor(client.ws.ping))}ms\` \n ${emojis.emojisetinha} | **Latência API do Discord:** \`${Math.floor(client.ws.ping)}ms\` \n ${emojis.emojisetinha} | **Latência em WS:** \`${Math.floor(new Date().getMilliseconds() - oldate)}ms\``)
        return message.reply({ embeds: [embedping] })
    }
}