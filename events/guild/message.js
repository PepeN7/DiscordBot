module.exports = async(client, message) => {

    let firebase = require("firebase");

    let db = firebase.database();

    let spamstatus = await db.ref(`Servidores/Anti-Raid/Anti-Spam/${message.guild.id}/Status`).once('value')
    spamstatus = spamstatus.val();
    
    let spamrole = await db.ref(`Servidores/Anti-Raid/Anti-Spam/${message.guild.id}/Cargo`).once('value')
    spamrole = spamrole.val();
    
    if(spamstatus === 'true'){
    
      let usersMap = new Map()
      let LIMIT = 5;
      let TIME = 10000;
      let DIFF = 2000;
    
      if(usersMap.has(message.author.id)) {
        let userData = usersMap.get(message.author.id);
        let { lastMessage, timer } = userData;
        let diferença = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
    
        if(diferença > DIFF) {
          clearTimeout(timer);
          console.log('Tempo finalizado!')
          userData.msgCount = 1;
          userData.lastMessage = message;
          userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id)
            console.log("Removido do RESET!")
          }, TIME);
          usersMap.set(message.author.id, userData);
        }
        else {
          ++msgCount;
          if(parseInt(msgCount) === LIMIT) {
            let role = message.guild.roles.cache.get(spamrole);
            message.member.roles.add(role);
            message.reply("você foi mutado temporariamente!")
            setTimeout(() => {
              message.member.roles.remove(role);
              message.reply("você foi desmutado!");
            }, TIME)
          } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
          }
        }
      }
      else {
        let fn = setTimeout(() => {
          usersMap.delete(message.author.id)
          console.log("Removido do Mapeamento!")
        }, TIME);
        usersMap.set(message.author.id, {
          msgCount: 1,
          lastMessage: message,
          timer: fn
        });
        
      }
    }

}