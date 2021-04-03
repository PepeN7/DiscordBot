const firebase = require("firebase");
const CONFIG = require("../../config.json");

module.exports = async(client, message) => {



let db = firebase.database();

let prefix = await db.ref(`Servidores/Prefixos/${message.guild.id}/Prefix`).once('value');
    prefix = prefix.val();

  if(!prefix) prefix = CONFIG.PREFIX; 
  
  if(!message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  if(!message.guild) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g)

  let cmd = args.shift().toLowerCase();
  if(cmd.length === 0) return;

  let command = client.commands.get(cmd)

  if(!command) command = client.commands.get(client.aliases.get(cmd));

  if(command) command.run(client, message, args, db)

  if(!command) return message.channel.send(`> ❌ **|** \`${cmd}\` não foi encontrado em meus arquivos!`)
}