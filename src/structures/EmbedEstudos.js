const { EmbedBuilder } = require("discord.js");
const config = require("../interfaces/Config.js");


module.exports = class EmbedEstudos extends EmbedBuilder {
    constructor(data = {}) {
      super(data)
      this.setTimestamp()
      this.setColor(config.color)
      this.setFooter({ text: `Bot Estudos 2D By Mised • © Todos os direitos reservados.` })
    }
}