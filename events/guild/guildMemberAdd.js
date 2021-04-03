const firebase = require("firebase");
const { MessageEmbed } = require("discord.js");

module.exports = async(client, member) => {

    const db = firebase.database();

    const dia = await db.ref(`Servidores/Anti-Raid/Anti-Fake/${message.guild.id}/Dias`).once('value');
    dia = dia.val();

    const statusfake = await db.ref(`Servidores/Anti-Raid/Anti-Fake/${message.guild.id}/Status`).once('value');
    statusfake = statusfake.val();

    const bots = await db.ref(`Servidores/Anti-Raid/Anti-Bots/${message.guild.id}/Status`).once('value');
    bots = bots.val();

    if(statusfake === 'true'){
        const date1 = new Date(member.joinedAt).getTime();
        const date2 = new Date().getTime() - dia * 24 * 60 * 60 * 1000;
      
        if (date2 < date1) {
          member.kick({ reason: "Filtro Anti-Fakes"});
    }
}

    if(status === 'true'){
        if(member.user.bot) {
            member.kick({ reason: "Filtro Anti-Bots"})
        }
    } else {
    }

    let role = await db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Cargo`).once('value')
    role = role.val();
  
    let mensagem = await db.ref(`Servidores/Canais/Entrada/${member.guild.id}/Mensagem`).once('value')
    mensagem = mensagem.val();
  
    let canal = await db.ref(`Servidores/Canais/Entrada/${member.guild.id}/Canal`).once('value')
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
  
    member.roles.add(role);
};