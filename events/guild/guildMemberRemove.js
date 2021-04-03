const firebase = require("firebase");
const { MessageEmbed } = require("discord.js");

module.exports = async(client, member) => {
    
    const db = firebase.database();

    let mensagem = await db.ref(`Servidores/Canais/Saida/${member.guild.id}/Mensagem`).once('value')
    mensagem = mensagem.val();
  
    let canal = await db.ref(`Servidores/Canais/Saida/${member.guild.id}/Canal`).once('value')
    canal = canal.val();
  
    if(canal === null) return;
    if(mensagem === null) return;
  
    let membro = mensagem.replace('{membro}', member)
    let membros = membro.replace('{membros}', member.guild.memberCount)
    let servidor = membros.replace('{servidor}', member.guild.name)

    let embed = new MessageEmbed()
    .setAuthor(client.user.displayAvatarURL())
    .setDescription(servidor)
    client.channels.cache.get(canal).send(embed)

};