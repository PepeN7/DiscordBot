const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    aliases: ['latência'],
    run: async(client, message, args, db) => {
        message.channel.send(`> 📡 **|** ${client.ws.ping}ms!`)
    }
}