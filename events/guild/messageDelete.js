const firebase = require("firebase");
const { MessageEmbed } = require("discord.js");

module.exports = async(client, message) => {
    
    const db = firebase.database();

    let canal = await db.ref(`Servidores/Canais/Logs/${message.guild.id}/Canal`).once('value');
    canal = canal.val();
  
    if(canal === null) return;
  
    let embed = new MessageEmbed()
    .setDescription(`<:i_MsgDelete:776936469939093554> **|** Nova mensagem apagada!\n[CLIQUE AQUI](${message.url})`)
    .addField(`> Mensagem apagada:`, `"${message.content}"`)
    .addField(`> Autor:`, `${message.author}`)
    client.channels.cache.get(canal).send(embed)

};