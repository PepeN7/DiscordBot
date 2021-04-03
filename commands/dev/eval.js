const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'eval',
  category: 'dev',
  aliases: [],
  run: async(client, message, args) => {

if (!['407264819972931607'].includes(message.author.id)) {
        return;
  }
        let code = args.slice(0).join(' ');
        if (!code) return;
        
        try {
            let ev = require("util").inspect(eval(code));
            if (ev.length > 1950) ev = ev.substr(0, 1950);
            message.channel.send(`\`\`\`js\n${ev}\`\`\``);

        } catch (err) {
            message.channel.send(`\`\`\`js\n${err}\`\`\``);
      }
    }
  }