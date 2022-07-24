const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");

class EstudosBot extends Client {
  constructor() {
    super({
      allowedMentions: {
        everyone: false,
        roles: false,
        users: false
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,

      ],
      partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
    });
    this.commands = new Collection();
    this.aliases = new Collection();
    this.commands = new Collection();
    this.config = require("../interfaces/Config");
    this.logger = require("../utils/Logger");
    this.database = new Collection();
    if (!this.token) this.token = this.config.token;

    this.rest.on('rateLimited', (info) => {
      this.logger.log('ratelimit', "log");
    })
  }
  connect() {
    return super.login(this.token);
  };
};

module.exports = EstudosBot;