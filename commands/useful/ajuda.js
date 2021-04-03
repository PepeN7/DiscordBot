const { MessageEmbed, Message } = require("discord.js");
const CONFIG = require("../../config.json");

module.exports = {
    name: 'ajuda',
    aliases: ['help'],
    run: async(client, message, args, db) => {

        message.delete()

        /* PREFIXO */
        let prefix = await db.ref(`Servidores/Prefixos/${message.guild.id}/Prefix`).once('value');
        prefix = prefix.val();
        if(!prefix) prefix = CONFIG.PREFIX;

        const embed = new MessageEmbed()
        .setAuthor(`Painel de Comandos Principal - ${client.user.username}™`, client.user.displayAvatarURL())
        .setColor("BLUE")
        .addField(`__Categorias__`, `\n
        > \`1️⃣\` **Configuração**\n
        > \`2️⃣\` **Moderação**\n
        > \`3️⃣\` **Nsfw**\n
        > \`4️⃣\` **Desenvolvedor**`)
        .setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(embed).then(msg => {
           msg.react('1️⃣'), msg.react('2️⃣'), msg.react('3️⃣'), msg.react('4️⃣')

           const filter = (e, u) => e.emoji.name === "1️⃣" && u.id === message.author.id,
           filter2 = (e, u) => e.emoji.name === "2️⃣" && u.id === message.author.id,
           filter3 = (e, u) => e.emoji.name === "3️⃣" && u.id === message.author.id,
           filter4 = (e, u) => e.emoji.name === "4️⃣" && u.id === message.author.id;
           
           const coletor = msg.createReactionCollector(filter),
           coletor2 = msg.createReactionCollector(filter2),
           coletor3 = msg.createReactionCollector(filter3),
           coletor4 = msg.createReactionCollector(filter4);

           coletor.on("collect", r1 => {
               r1.users.remove(message.author.id);

               const embed2 = new MessageEmbed()
               .setAuthor(`Comandos de Configuração Principal - ${client.user.username}™`, client.user.displayAvatarURL())
               .setColor("BLUE")
               .addField(`__Comandos__`, `**${prefix}configuração**\n\`Configura, prefixo, sistema de boas-vindas.\`\n\n**${prefix}defesa**\n\`Configura todos os anti-raids.\``)
               .setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.displayAvatarURL())
               msg.edit(embed2)
           })

           coletor2.on("collect", r2 => {
               r2.users.remove(message.author.id);

               const embed3 = new MessageEmbed()
               .setAuthor(`Comandos de Configuração Principal - ${client.user.username}™`, client.user.displayAvatarURL())
               .setColor("BLUE")
               .addField(`__Comandos__`, `**${prefix}chat**\n\`Configura um canal de texto.\`\n\n**${prefix}punish**\n\`Todos os métodos de punimentos.\``)
               .setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.displayAvatarURL())
               msg.edit(embed3)
           })

           coletor3.on("collect", r3 => {
               r3.users.remove(message.author.id);

               const embed4 = new MessageEmbed()
           })
        })
    }
}