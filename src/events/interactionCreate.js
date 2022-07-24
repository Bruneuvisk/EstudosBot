const { Client, ChannelType, PermissionFlagsBits, CommandInteraction, ButtonComponent } = require('discord.js')
const emojis = require("../interfaces/Emojis")
const EmbedEstudos = require("../structures/EmbedEstudos")
const config = require("../interfaces/Config")

module.exports = {
    name: "interactionCreate",
    /**
    * 
    * @param {Client} client 
    * @param {CommandInteraction | ButtonComponent} interaction 
    */
    run: async (client, interaction) => {
        if(interaction.isButton() && interaction.customId == "bnt_verificar" && interaction.guildId == "971556462834905098") {
            let embedsers = new EmbedEstudos()
                .setAuthor({name: `${interaction.member.user.username}#${interaction.member.user.discriminator}`, iconURL: `${interaction.member.user.displayAvatarURL({ dynamic: true })}` })
                .setTitle(`${emojis.emojierror} | Error`)
                .setDescription(`${emojis.emojierror} | **__${interaction.member}, você já está passando pelo sistema de verificação, termine o mesmo.__**`)
                .setThumbnail(client.user.displayAvatarURL())
    
            if(interaction.guild.channels.cache.find(channel => channel.topic === `${interaction.member.id}`)) {
                return interaction.reply({ ephemeral: true, embeds: [embedsers] })
            }

            await interaction.guild.channels.create({
                name: `${interaction.member.user.username}-verify`,
                parent: "972304529695596594",
                type: ChannelType.GuildText,
                topic: `${interaction.member.id}`,
                permissionOverwrites: [
                    {
                        id: interaction.member.id,
                        allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionFlagsBits.ViewChannel]
                    }
                ],
            }).then(async (channel) => {
                let embedsinico = new EmbedEstudos()
                    .setTitle(`${emojis.emojicerto} | Sistema de Veiricação Processando`)
                    .setDescription(`${emojis.emojisetinha} | **__${interaction.member}, pronto membro eu abri o canal ${channel}, para você realizar a sua verificação, favor se redirecionar para lá.__**`)
                    .setThumbnail(client.user.displayAvatarURL())
                interaction.reply({ ephemeral: true, embeds: [embedsinico] })

                let msg1
                let msg2
                let error = false
                let embed_estudos1 = new EmbedEstudos()
                    .setTitle(`${emojis.emojicerto} | Sistema de Verificação (Etapa 1)`)
                    .setDescription(`> ${emojis.emojisetinha} | *Envie abaixo, neste chat o seu Nome e Sobrenome:*`)
                    .setThumbnail(client.user.displayAvatarURL())
                let msgPrincipal = await channel.send({ content: `${interaction.member}`, embeds: [embed_estudos1] })
    
                await channel
                .awaitMessages({
                    filter: (m) => m.author.id === interaction.member.id,
                    max: 1,
                    time: 60000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg1 = collected.first().content;
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embed1 = new EmbedEstudos()
                        .setTitle(`${emojis.emojitempo} | O tempo limite foi exedido`)
                        .setDescription(`${emojis.emojicerto} | Você demorou demais para enviar.`)
                        .setThumbnail(client.user.displayAvatarURL())
                    msgPrincipal.edit({
                        embeds: [embed1],
                    }) 
                    setTimeout(() => {
                        channel.delete()
                    }, 8000)
                })
    
                if(msg1.length > 50) {
                    let embed_error = new EmbedEstudos()
                        .setTitle(`${emojis.emojierror} | Sistema de Verificação (Error)`)
                        .setDescription(`> ${emojis.emojisetinha} | *Você enviou um nome muito grande Acima de 50 caracteres.*`)
                        .setThumbnail(client.user.displayAvatarURL())
                    msgPrincipal.edit({
                        embeds: [embed_error],
                    })
                    return
                }
    
                let embed_estudos2 = new EmbedEstudos()
                    .setTitle(`${emojis.emojicerto} | Sistema de Verificação (Etapa 2)`)
                    .setDescription(`> ${emojis.emojisetinha} | *Envie abaixo, neste chat a senha que foi enviada pelo Bruno.#1000 no grupo da sala:*`)
                    .setThumbnail(client.user.displayAvatarURL())
                msgPrincipal.edit({
                    embeds: [embed_estudos2],
                })
    
                await channel
                .awaitMessages({
                    filter: (m) => m.author.id === interaction.member.id,
                    max: 1,
                    time: 60000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg2 = collected.first().content.trim().split(/ +/g);
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embed1 = new EmbedEstudos()
                        .setTitle(`${emojis.emojitempo} | O tempo limite foi exedido`)
                        .setDescription(`${emojis.emojicerto} | Você demorou demais para enviar.`)
                        .setThumbnail(client.user.displayAvatarURL())
                    msgPrincipal.edit({
                        embeds: [embed1],
                    }) 
                    setTimeout(() => {
                        channel.delete()
                    }, 8000)
                })
    
                if(msg2[0] !== config.senha_acess) {
                    let embed_error = new EmbedEstudos()
                        .setTitle(`${emojis.emojierror} | Sistema de Verificação (Error)`)
                        .setDescription(`> ${emojis.emojisetinha} | *A senha enviada está invalida.*`)
                        .setThumbnail(client.user.displayAvatarURL())
                    msgPrincipal.edit({
                        embeds: [embed_error],
                    })
                    return
                }
    
                client.database.users.ensure(interaction.member.id,
                    {
                        usertag: interaction.member.user.tag,
                        name: msg1
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
    
                interaction.member.setNickname(msg1);
                interaction.member.roles.add(config.role_aluno)
                interaction.member.roles.remove(config.role_no_aluno)   
                
                let embed_estudos3 = new EmbedEstudos()
                    .setTitle(`${emojis.emojicerto} | Sistema de Verificação (Final)`)
                    .setDescription(`> ${emojis.emojicerto} | *Parabéns ${interaction.member}, você está com acesso liberado ao ${interaction.guild.name}, aproveite e use este servidor para estudos, e siga as regras.*`)
                    .setThumbnail(client.user.displayAvatarURL())
                msgPrincipal.edit({
                    embeds: [embed_estudos3],
                })
    
                const embedstaff = new EmbedEstudos()
                    .setAuthor({ name: `${interaction.member.user.username + ' << Membro que foi aprovado'}`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true, size: 2048 }) })
                    .setTitle(`${emojis.emojicerto} | Aprovado na Verificação (Logs)`)
                    .addFields([
                        { name: `${emojis.emojisetinha}・Membro:`, value: `<@${interaction.member.id}> / ${interaction.member.user.tag}`},
                        { name: `${emojis.emojisetinha}・Nome do Aluno:`, value: `${msg1}` },
                        { name: `${emojis.emojisetinha}・Ocorrido Em:`, value: `<t:${Math.round(Date.now() / 1000)}:f> ( <t:${Math.round(Date.now() / 1000)}:R> )` },
                    ])
                    .setThumbnail(client.user.displayAvatarURL())
                client.channels.cache.get(config.channel_logs).send({ embeds: [embedstaff] })
    
                setTimeout(() => {
                    channel.delete()
                }, 10000)
            })
        } 
    }
}