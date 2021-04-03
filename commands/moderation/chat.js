const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'chat',
  aliases: ['lock'],
  run: async(client, message, args) => {
    
      if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`> :lock: **|** Você não tem a permissão **GERENCIAR CANAIS** para continuar a ação!`)
      if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`> :lock: **|** Eu não tenho a permissão **GERENCIAR CANAIS** para continuar a ação!`)
    
      let everyone = message.guild.roles.cache.find(e => e.name === "@everyone");
    
    /* EMBED PRINCIPAL */
    const embed = new MessageEmbed()
    .setAuthor(`Painel de Chat Completo - ${client.user.username}™`, client.user.displayAvatarURL())
    .setDescription(`Olá ${message.author},\n
    Este é um painel, para "configurar" o seu canal de texto!`)
    .addField(`__Categorias__`, `> \`1️⃣\` **|** Bloquear\n
    > \`2️⃣\` **|** Desbloquear\n
    > \`3️⃣\` **|** Limpar o chat\n
    > \`4️⃣\` **|** Configurar para +18`)
    .setColor("#24d470")
    .setTimestamp()
    .setFooter(`${client.user.username} • Todos direitos reservados`, client.user.displayAvatarURL({dynamic: true}))
    message.channel.send(embed).then(msg => {
      msg.react('1️⃣')
      msg.react('2️⃣')
      msg.react('3️⃣')
      msg.react('4️⃣')
      msg.react('🗑')
      
      const filter = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
      filter2 = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id,
      filter3 = (e, u) => e.emoji.name === "3️⃣" && u.id === message.author.id,
      filter4 = (e, u) => e.emoji.name === "4️⃣" && u.id === message.author.id,
      filter5 = (e, u) => e.emoji.name === '🗑' && u.id === message.author.id
      
      const coletor = msg.createReactionCollector(filter),
      coletor2 = msg.createReactionCollector(filter2),
      coletor3 = msg.createReactionCollector(filter3),
      coletor4 = msg.createReactionCollector(filter4),
      coletor5 = msg.createReactionCollector(filter5)
      
      coletor.on("collect", r1 => {
        r1.users.remove(message.author.id)
        message.channel.overwritePermissions([
            {
                id: everyone.id,
                deny: ["SEND_MESSAGES"]
            }
        ])
        message.channel.send(`> :lock: **|** Canal bloqueado com sucesso!`)
      })
      
      coletor2.on("collect", r2 => {
        r2.users.remove(message.author.id)
        message.channel.overwritePermissions([
            {
                id: everyone.id,
                allow: ["SEND_MESSAGES"]
            }
        ])
      message.channel.send(`> :unlock: **|** Canal desbloqueado com sucesso!`)
      })

      coletor3.on("collect", r3 => {
        r3.users.remove(message.author.id)

        const embed3 = new MessageEmbed()
        .setAuthor(`Painel de Chat Completo - ${client.user.username}™`, client.user.displayAvatarURL())
        .setDescription(`> 🗑 **|** Digite no chat, quantas mensagens deverão ser apagadas!`)
        .setColor("#24d470")
        .setTimestamp()
        .setFooter(`${client.user.username} • Todos direitos reservados`, client.user.displayAvatarURL({dynamic: true}))
        message.channel.send(embed3).then(msg3 => {
          msg3.delete(15000).catch(()=>{})

          let cp3 = message.channel.createMessageCollector(x => x.author.id === message.author.id, { max: 1 })
          .on("collect", fff => {
            const msgs = fff.content;
            if(!msgs) return message.channel.send(`> 🗑 **|** Você precisa digitar o número de mensagens para ser apagadas!`).then(aaa => aaa.delete({timeout: 5000}))
            if(isNaN(msgs)) return message.channel.send(`> 🗑 **|** O "número" que você digitou não é um número verdadeiro!`).then(aa => aa.delete({timeout: 5000}))

            message.channel.bulkDelete(msgs)
            message.channel.send(`> 🗑 **|** \`${msgs}\` limpas!`).then(maaa => maaa.delete({timeout: 5000}))
          })
        })
      })
      
      coletor4.on("collect", r4 => {
        r4.users.remove(message.author.id)
        
        const embed4 = new MessageEmbed()
        .setAuthor(`Painel de Chat Completo - ${client.user.username}™`, client.user.displayAvatarURL())
        .setColor("#24d470")
        .setDescription(`O que deseja fazer?`)
        .addField(`Categorias`, `> \`1️⃣\` **|** Ativar Canal +18\n
        > \`2️⃣\` **|** Desativar Canal +18\n
        > \`3️⃣\` **|** Cancelar a ação`)
        message.channel.send(embed4).then(b => {
          b.delete({ timeout: 30000 }).catch(() => {})
          b.react('1️⃣').catch(()=>{})
          b.react('2️⃣').catch(()=>{})
          b.react('3️⃣').catch(()=>{})
          
          const primeiroFilter = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
          segundoFilter = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id,
          terceiroFilter = (e, u) => e.emoji.name === '3️⃣' && u.id === message.author.id;
          
          const primeiroColetor = b.createReactionCollector(primeiroFilter),
          segundoColetor = b.createReactionCollector(segundoFilter),
          terceiroColetor = b.createReactionCollector(terceiroFilter)
        
            primeiroColetor.on("collect", r1 => {
            r1.users.remove(message.author.id)
            b.delete().catch(()=>{})
              
             message.channel.setNSFW(true)
             message.channel.send(`> 🔞 **|** Canal setado com +18 com sucesso!`).then(msga => msga.delete({timeout: 5000}))
              
        })
          
            segundoColetor.on("collect", r2 => {
            r2.users.remove(message.author.id)
            b.delete().catch(()=>{})
              
              message.channel.setNSFW(false)
              message.channel.send(`> 🔞 **|** Canal +18 desabilitado com sucesso!`).then(msgab => msgab.delete({timeout: 5000}))
            })
          
          terceiroColetor.on("collect", r3 => {
            r3.users.remove(message.author.id)
            
            message.channel.send(`> \`🔞\` **|** Ação cancelada com sucesso!`)
            message.channel.bulkDelete(5)
          })
      })
    })

      coletor5.on("collect", r5 => {
        msg.delete()
      })
    })
  }
}