const firebase = require("firebase");
const { MessageEmbed } = require("discord.js");

module.exports = async(client, oldMessage, newMessage) => {
    
    const db = firebase.database();

    let canal = await db.ref(`Servidores/Canais/Logs/${newMessage.guild.id}/Canal`).once('value');
    canal = canal.val();
  
    if(canal === null) return;
  
    if(oldMessage.content === newMessage.content) {
        return;
    }
  
    let embed = new MessageEmbed()
    .setDescription(`<:i_MsgEdit:776934868197310485> **|** Nova mensagem editada!\n[CLIQUE AQUI](${newMessage.url})`)
    .addField(`> Antiga Mensagem:`, `${oldMessage}`)
    .addField(`> Nova Mensagem:`, `${newMessage}`)
    .addField(`> Autor:`, `${newMessage.author}`)
    client.channels.cache.get(canal).send(embed)

};