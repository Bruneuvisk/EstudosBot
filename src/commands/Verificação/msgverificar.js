const EmbedEstudos = require("../../structures/EmbedEstudos");
const { PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")


module.exports = {
    name: "msgverificar",
    aliases: [],
    category: "Verificação",
    description: "Coloca a mensagem de verificação.",
    usage: "",
    memberperm: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Administrator],
    clientperm: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    requiredroles: [],
    alloweduserids: [],
    execute: async (client, message, args, prefix, emojis) => {
        message.delete()

        let bnt1 = new ButtonBuilder()
            .setLabel("Iniciar Verificação")
            .setEmoji("🔒")
            .setCustomId("bnt_verificar")
            .setStyle(ButtonStyle.Success)

        let row = new ActionRowBuilder().addComponents(bnt1)

        let embedverify = new EmbedEstudos()
            .setTitle(`${emojis.emojicerto} | Sistema de Verificação ${message.guild.name}`)
            .setDescription(`> ${emojis.emojicerto} | **__Este é o sistema de verificação para saber se você realmente é da turma do 2°D do sartre coc, caso não seja ou não sabe o que está fazendo aqui favor se retire.__** \n\n \`\`\`Para Realizar A Verificação Clique No Botão Abaixo:\`\`\` \n\n ${emojis.emojicerto} | **Após clicar no botão, o bot irá criar um canal e você irá responder algumas perguntas do bot.**`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        return message.channel.send({ embeds: [embedverify], components: [row]})
    }   
}