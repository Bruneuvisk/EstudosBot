const { Client, CommandInteraction, ButtonComponent, ModalBuilder, ModalSubmitInteraction, ActionRowBuilder, TextInputStyle, TextInputBuilder } = require('discord.js')
const emojis = require("../interfaces/Emojis")
const EmbedEstudos = require("../structures/EmbedEstudos")
const config = require("../interfaces/Config")

module.exports = {
    name: "interactionCreate",
    /**
    * 
    * @param {Client} client 
    * @param {CommandInteraction | ButtonComponent | ModalSubmitInteraction} interaction 
    */
    run: async (client, interaction) => {
        if(interaction.isButton() && interaction.customId == "bnt_verificar" && interaction.guildId == "971556462834905098") {

            let choices_modal_name = new TextInputBuilder()
                                .setCustomId("selection_name")
                                .setLabel("Qual o seu Nome e Sobrenome?")
                                .setMaxLength(32)
                                .setMinLength(10)
                                .setPlaceholder("Escreva aqui o seu nome e sobrenome por Ex: Bruno Herique")
                                .setRequired(true)
                                .setStyle(TextInputStyle.Short)

            let choices_modal_password = new TextInputBuilder()
                                .setCustomId("selection_password")
                                .setLabel("Qual a senha para ter acesso?")
                                .setMaxLength(8)
                                .setMinLength(1)
                                .setPlaceholder("Escreva aqui a senha que foi enviada no grupo da sala")
                                .setRequired(true)
                                .setStyle(TextInputStyle.Short)

            let row_text_input = new ActionRowBuilder().addComponents(choices_modal_name)
            let row_text_input2 = new ActionRowBuilder().addComponents(choices_modal_password)

            let modal_text = new ModalBuilder()
                .setCustomId("verification_member_modal")
                .setTitle(`Sistema de Verificação (Registro)`)
                .addComponents([row_text_input, row_text_input2])
            
            await interaction.showModal(modal_text)
        } else if(interaction.customId == "verification_member_modal" && interaction.guildId == "971556462834905098") {
            const name_aluno = interaction.fields.getTextInputValue("selection_name"),
                  password_aluno = interaction.fields.getTextInputValue("selection_password")
            
            if(password_aluno !== config.senha_acess) {
                let embed_error = new EmbedEstudos()
                    .setTitle(`${emojis.emojierror} | Sistema de Verificação (Error)`)
                    .setDescription(`> ${emojis.emojisetinha} | *A senha enviada está invalida.*`)
                    .setThumbnail(client.user.displayAvatarURL())
                return interaction.reply({ ephemeral: true, embeds: [embed_error] })
            }   

            client.database.users.ensure(interaction.member.id,
                {
                    usertag: interaction.member.user.tag,
                    name: name_aluno
                }
            )

            client.database.settings.ensure(interaction.guild.id, {
                totalverify: 1
            });

            let guilduses = client.database.settings.get(interaction.guild.id, "totalverify") 

            var num = guilduses || 0;
            num = num + 1;
    
            client.database.settings.set(interaction.guild.id, {
                totalverify: num,
            });

            interaction.member.setNickname(name_aluno);
            interaction.member.roles.add(config.role_aluno)
            interaction.member.roles.remove(config.role_no_aluno)   
            
            let embed_estudos3 = new EmbedEstudos()
                .setTitle(`${emojis.emojicerto} | Sistema de Verificação (Final)`)
                .setDescription(`> ${emojis.emojicerto} | *Parabéns ${interaction.member}, você está com acesso liberado ao ${interaction.guild.name}, aproveite e use este servidor para estudos, e siga as regras.*`)
                .setThumbnail(client.user.displayAvatarURL())
            interaction.reply({ ephemeral: true, embeds: [embed_estudos3] })

            const embedstaff = new EmbedEstudos()
                .setAuthor({ name: `${interaction.member.user.username + ' << Membro que foi aprovado'}`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true, size: 2048 }) })
                .setTitle(`${emojis.emojicerto} | Aprovado na Verificação (Logs)`)
                .addFields([
                    { name: `${emojis.emojisetinha}・Membro:`, value: `<@${interaction.member.id}> / ${interaction.member.user.tag}`},
                    { name: `${emojis.emojisetinha}・Nome do Aluno:`, value: `${name_aluno}` },
                    { name: `${emojis.emojisetinha}・Ocorrido Em:`, value: `<t:${Math.round(Date.now() / 1000)}:f> ( <t:${Math.round(Date.now() / 1000)}:R> )` },
                ])
                .setThumbnail(client.user.displayAvatarURL())
            client.channels.cache.get(config.channel_logs).send({ embeds: [embedstaff] })
        }
    }
}