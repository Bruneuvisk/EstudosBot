const { Client, PermissionsBitField, Collection, WebhookClient, Message } = require('discord.js')
const EmbedEstudos = require('../structures/EmbedEstudos');
const config = require('../interfaces/Config')
const emojis = require('../interfaces/Emojis')
const coldoown = new Set();
const Webhook = new WebhookClient({
  id: config.webhook_commands.id,
  token: config.webhook_commands.token,
})


module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {
        if(message.author.bot == true) return

        const prefix = config.prefix
        const color = config.color

        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            let embedzinhasay = new EmbedEstudos()
                .setTitle(`${emojis.emojicerto} | ${client.user.username}`)
                .setDescription(`${emojis.emojisetinha}・Olá ${message.author}, então eu sou um bot desenvolvido para ajudar gerenciar o servidor **__${message.guild.name}__**. \n\n ${emojis.emojisetinha} | **__Prefixo:__** **__${prefix}help__** \n ${emojis.emojisetinha} | **__[Servidor do Mised](${config.server_support})__**`)
                .setThumbnail(client.user.displayAvatarURL())
            return message.reply({ embeds: [embedzinhasay] }).then(xxx =>{
              setTimeout(() => xxx.delete(), 30000) 
            })
        }

        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

        if (!prefixRegex.test(message.content)) return

        const [matchedPrefix] = message.content.match(prefixRegex);

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) return
    
        if (coldoown.has(message.author.id)) {
            const timeLeft = (expirationTime - now) / 1000
            let embedtime = new EmbedEstudos()
              .setTitle(`${emojis.emojierror} | Error de Tempo`)
              .setDescription(`${emojis.emojitempo} | ${message.author}, Para realizar o comando \`${command.name}\` você precisa aguardar cerca de \`${timeLeft.toFixed(1)} segundos\``)
            return message.reply({ embeds: [embedtime] }).then(xxx =>{
              setTimeout(() => xxx.delete(), 15000) 
            })
        }

        if(command.memberperm && !message.member.permissions.has(command.memberperm)) {
            let permissions = []
      
            if (command.memberperm.includes(PermissionsBitField.Flags.Administrator))
              permissions.push(`\`Administrador\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ViewAuditLog))
              permissions.push(`\`Ver o registro de auditoria\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ManageGuild))
              permissions.push(`\`Gerenciar Servidor\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ManageRoles))
              permissions.push(`\`Gerenciar Cargos\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ManageChannels))
              permissions.push(`\`Gerenciar Canais\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.KickMembers))
              permissions.push(`\`Expulsar Membros\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.BanMembers))
              permissions.push(`\`Banir Membros\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.CreateInstantInvite))
              permissions.push(`\`Criar Convite instantâneo\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ChangeNickname))
              permissions.push(`\`Alterar Apelido\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ManageNicknames))
              permissions.push(`\`Gerenciar Apelidos\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ManageEmojisAndStickers))
              permissions.push(`\`Gerenciar Emojis e Stickers\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ManageWebhooks))
              permissions.push(`\`Gerenciar Webhooks\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ViewChannel))
              permissions.push(`\`Ver Canais\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.SendMessages))
              permissions.push(`\`Enviar Mensagens\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.SendTTSMessages))
              permissions.push(`\`Enviar Mensagens TTS\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ManageMessages))
              permissions.push(`\`Gerenciar Mensagens\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.EmbedLinks))
              permissions.push(`\`Enviar Embeds\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.AttachFiles))
              permissions.push(`\`Enviar Arquivos\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ReadMessageHistory))
              permissions.push(`\`Ver o histórico de mensagens\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.MentionEveryone))
              permissions.push(`\`Marcar @everyone\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.UseExternalEmojis))
              permissions.push(`\`Usar Emojis Externos\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.AddReactions))
              permissions.push(`\`Adicionar Reações\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.Connect)) permissions.push(`\`Conectar\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.Speak)) permissions.push(`\`Falar\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.Stream)) permissions.push(`\`Transmitir Tela\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.MuteMembers))
              permissions.push(`\`Mutar Membros\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.DeafenMembers))
              permissions.push(`\`Ensurdecer Membros\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.MoveMembers))
              permissions.push(`\`Mover Membros\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.UseVAD)) permissions.push(`\`Usar Detecção de Voz\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.PrioritySpeaker))
              permissions.push(`\`Voz Prioritária\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ViewGuildInsights))
              permissions.push(`\`Ver as Informações do servidor\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.UseApplicationCommands))
              permissions.push(`\`Usar Comandos de /\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.RequestToSpeak))
              permissions.push(`\`Pedir pra falar\``)
            if (command.memberperm.includes(PermissionsBitField.Flags.ManageThreads))
              permissions.push(`\`Gerenciar Conversas\``)
            if(command.memberperm.includes(PermissionsBitField.Flags.ModerateMembers))
              permissions.push(`\`Colocar Membros de Castigo\``)
            if(command.memberperm.includes(PermissionsBitField.Flags.UseEmbeddedActivities))
              permissions.push(`\`Iniciar Atividades Incorporadas\``)
            if(command.memberperm.includes(PermissionsBitField.Flags.SendMessagesInThreads))
              permissions.push(`\`Enviar Mensagens em Tópicos\``)
            if(command.memberperm.includes(PermissionsBitField.Flags.UseExternalStickers))
              permissions.push(`\`Usar Stickers Externos\``)
            if(command.memberperm.includes(PermissionsBitField.Flags.CreatePublicThreads))
              permissions.push(`\`Criar Tópicos Públicos\``)
            if(command.memberperm.includes(PermissionsBitField.Flags.CreatePrivateThreads))
              permissions.push(`\`Criar Tópicos Privados\``)
      
            let embedperms = new EmbedEstudos()
              .setTitle(`${emojis.emojierror} | Error Permissões Membro`)
              .setDescription(`${emojis.emojierror} | ${message.author}, você não tem as permissões necessárias para realizar o comando \`${command.name}\`. \n ${emojis.emojisetinha} | Permissões Necessárias: ${permissions.join(', ')}`)
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
            return message.reply({  embeds: [embedperms] })
        }

        if (
            command.clientperm &&
            !message.guild.members.cache.get(client.user.id).permissions.has(command.clientperm)
        ) {
            let permissions = []
      
            if (command.clientperm.includes(PermissionsBitField.Flags.Administrator))
              permissions.push(`\`Administrador\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ViewAuditLog))
              permissions.push(`\`Ver o registro de auditoria\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ManageGuild))
              permissions.push(`\`Gerenciar Servidor\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ManageRoles))
              permissions.push(`\`Gerenciar Cargos\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ManageChannels))
              permissions.push(`\`Gerenciar Canais\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.KickMembers))
              permissions.push(`\`Expulsar Membros\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.BanMembers))
              permissions.push(`\`Banir Membros\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.CreateInstantInvite))
              permissions.push(`\`Criar Convite instantâneo\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ChangeNickname))
              permissions.push(`\`Alterar Apelido\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ManageNicknames))
              permissions.push(`\`Gerenciar Apelidos\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ManageEmojisAndStickers))
              permissions.push(`\`Gerenciar Emojis e Stickers\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ManageWebhooks))
              permissions.push(`\`Gerenciar Webhooks\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ViewChannel))
              permissions.push(`\`Ver Canais\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.SendMessages))
              permissions.push(`\`Enviar Mensagens\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.SendTTSMessages))
              permissions.push(`\`Enviar Mensagens TTS\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ManageMessages))
              permissions.push(`\`Gerenciar Mensagens\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.EmbedLinks))
              permissions.push(`\`Enviar Embeds\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.AttachFiles))
              permissions.push(`\`Enviar Arquivos\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ReadMessageHistory))
              permissions.push(`\`Ver o histórico de mensagens\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.MentionEveryone))
              permissions.push(`\`Marcar @everyone\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.UseExternalEmojis))
              permissions.push(`\`Usar Emojis Externos\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.AddReactions))
              permissions.push(`\`Adicionar Reações\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.Connect)) permissions.push(`\`Conectar\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.Speak)) permissions.push(`\`Falar\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.Stream)) permissions.push(`\`Transmitir Tela\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.MuteMembers))
              permissions.push(`\`Mutar Membros\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.DeafenMembers))
              permissions.push(`\`Ensurdecer Membros\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.MoveMembers))
              permissions.push(`\`Mover Membros\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.UseVAD)) permissions.push(`\`Usar Detecção de Voz\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.PrioritySpeaker))
              permissions.push(`\`Voz Prioritária\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ViewGuildInsights))
              permissions.push(`\`Ver as Informações do servidor\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.UseApplicationCommands))
              permissions.push(`\`Usar Comandos de /\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.RequestToSpeak))
              permissions.push(`\`Pedir pra falar\``)
            if (command.clientperm.includes(PermissionsBitField.Flags.ManageThreads))
              permissions.push(`\`Gerenciar Conversas\``)
            if(command.clientperm.includes(PermissionsBitField.Flags.ModerateMembers))
              permissions.push(`\`Colocar Membros de Castigo\``)
            if(command.clientperm.includes(PermissionsBitField.Flags.UseEmbeddedActivities))
              permissions.push(`\`Iniciar Atividades Incorporadas\``)
            if(command.clientperm.includes(PermissionsBitField.Flags.SendMessagesInThreads))
              permissions.push(`\`Enviar Mensagens em Tópicos\``)
            if(command.clientperm.includes(PermissionsBitField.Flags.UseExternalStickers))
              permissions.push(`\`Usar Stickers Externos\``)
            if(command.clientperm.includes(PermissionsBitField.Flags.CreatePublicThreads))
              permissions.push(`\`Criar Tópicos Públicos\``)
            if(command.clientperm.includes(PermissionsBitField.Flags.CreatePrivateThreads))
              permissions.push(`\`Criar Tópicos Privados\``)
      
            let embedperms = new EmbedEstudos()
              .setTitle(`${emojis.emojierror} | Error Permissões Bot`)
              .setDescription(`${emojis.emojierror} | ${message.author}, o bot não tem as permissões necessárias para realizar o comando \`${command.name}\`. \n ${emojis.emojisetinha} | Permissões Necessárias Pro Bot: ${permissions.join(', ')}`)
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
            message.reply({  embeds: [embedperms] })
            permissions = []
            return
        }

        if (
            command.requiredroles &&
            command.requiredroles.length > 0 &&
            message.member.roles.cache.size > 0 &&
            !message.member.roles.cache.some((r) => command.requiredroles.includes(r.id))
        ) {
            let embedroles = new EmbedEstudos()
              .setTitle(`${emojis.emojierror} | Error de Requerimentos de Cargos`)
              .setDescription(`${emojis.emojierror} | ${message.author}, para realizar este comando você precisa ter os cargos requisitados do comando \`${command.name}\` \n ${emojis.emojisetinha} | Cargos Necessários: ${command && command.requiredroles ? command.requiredroles.map((v) => `<@&${v}>`).join(',') : `**__Nenhum Cargo__**`}`)
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
            return message.reply({  embeds: [embedroles] })
        }
      
        if (
            command.alloweduserids &&
            command.alloweduserids.length > 0 &&
            !command.alloweduserids.includes(message.author.id)
        ) {
            let embedmembers = new EmbedEstudos()
              .setTitle(`${emojis.emojierror} | Error Usuários Permitidos`)
              .setDescription(`${emojis.emojierror} | ${message.author}, o comando \`${command.name}\` só pode ser usado em minha lista de usuários permitidos. \n ${emojis.emojisetinha} | Usuários Permitidos: ${command && command.alloweduserids ? command.alloweduserids.map((v) => `**${client.users.cache.get(v).tag}**`).join(', ') : `**__Nenhum Membro__**`}`)
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
            return message.reply({  embeds: [embedmembers] })
        }

        command.execute(client, message, args, prefix, emojis);

        client.database.commands.ensure(command.name, {
            usages: 1,
            manuntenção: 0, 
            reason: 'null'
        });

        let commanduses = client.database.commands.get(command.name, "usages")

        var num = commanduses || 0;
        num = num + 1;

        client.database.commands.set(command.name, {
            usages: num,
        });

        if (!["469661232153231385"].includes(message.author.id)) {
            coldoown.add(message.author.id);
            setTimeout(() => {
              coldoown.delete(message.author.id);
            }, 7000);
        }

        const EMBED_COMMANDS = new EmbedEstudos()
            .setAuthor({ name: `Logs de Comandos do Bot`, iconURL: client.user.displayAvatarURL() })
            .addFields([
                {
                    name: `Author do Comando`,
                    value: `**${message.author.tag}** \`( ${message.author.id} )\``,
                },
                {
                    name: `Data da Execução`,
                    value: `<t:${Math.round(Date.now() / 1000)}:f> ( <t:${Math.round(Date.now() / 1000)}:R> )`,
                },
                {
                    name: `Comando Executado`,
                    value: `**\`${command.name} ${args.join(" ")}\`**`,
                }
            ])
            .setFooter({ text: message.author.id, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(client.user.displayAvatarURL({ format: "jpg", size: 2048 }));
        Webhook.send({ username: "comandos", embeds: [EMBED_COMMANDS] });
    }
}