const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'punish',
  aliases: ['punir', 'punição'],
  run: async(client, message, args, db) => {
    
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`> :lock: **|** Você não tem a permissão **BANIR MEMBROS** para continuar a ação!`)
      if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`> :lock: **|** Eu não tenho a permissão **BANIR MEMBROS** para continuar a ação!`)
  
  /* PREFIXO */
    let prefix = await db.ref(`Servidores/Prefixos/${message.guild.id}/Prefix`).once('value');
    prefix = prefix.val();

    if(!prefix) prefix = process.env.PREFIX; 
    
    /* BANIMENTOS */
    let banimentos = await db.ref(`Membros/Punimentos/Banir/${message.author.id}/Bans`).once('value');
    banimentos = banimentos.val();
    if(banimentos === null) banimentos = "0";
    
    /* EXPULSOS */
    let expulsos = await db.ref(`Membros/Punimentos/Expulsar/${message.author.id}/Expulsar`).once('value');
    expulsos = expulsos.val();
    if(expulsos === null) expulsos = "0";
    
    /* MOTIVOS */
    let motivos = await db.ref(`Membros/Punimentos/Banir/${message.author.id}/Motivo`).once('value');
    motivos = motivos.val();
    if(motivos === null) motivos = "Não informado."
    
    /* CANAL PUNIÇÕES */
      let canal = await db.ref(`Servidores/Canais/Punições/${message.guild.id}/Canal`).once('value')
      canal = canal.val();
      //if(canal === null) return message.channel.send(`> :lock: **|** Este servidor não configurou os canais, digite ${prefix}configuração`)
    
    
    
    let member = message.mentions.members.first();
    let motivo = args.slice(1).join(" ");
    if(!motivo) motivo = "Não informado."
    
    /* EMBED PRINCIPAL */
    const embed = new MessageEmbed()
    .setAuthor(`Punição Completa - ${client.user.username}™`, client.user.displayAvatarURL())
    .setDescription(`Olá ${message.author},\n
    Este é um painel de banir, expulsar e ver os usuários banidos.\n
    Para punir alguém, você precisa mencionar um usuário!\n\n
    __**SEU TOTAL DE BANS**__: \`${banimentos} banimentos\`\n
    __**SEU TOTAL DE EXPULSÃO**__: \`${expulsos} expulsões\``)
    .addField(`__Categorias__`, `> \`1️⃣\` **|** Banir\n
    > \`2️⃣\` **|** Expulsar\n
    > \`3️⃣\` **|** Ver logs de banimento.`)
    .setColor("#24d470")
    .setTimestamp()
    .setFooter(`${client.user.username} • Todos direitos reservados`, client.user.displayAvatarURL({dynamic: true}))
    message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 120000 }).catch(()=>{})
            msg.react('1️⃣')
            msg.react('2️⃣')
            msg.react('3️⃣')
            msg.react('🗑')
      
      const filter = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
      filter2 = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id,
      filter3 = (e, u) => e.emoji.name === '3️⃣' && u.id === message.author.id
      const quartoFilter = (e, u) => e.emoji.name === "🗑" && u.id === message.author.id
      const quartoColetor = msg.createReactionCollector(quartoFilter)
      
      quartoColetor.on("collect", a => {
        msg.delete()
      })
      
      const coletor = msg.createReactionCollector(filter),
      coletor2 = msg.createReactionCollector(filter2),
      coletor3 = msg.createReactionCollector(filter3)
      
      coletor.on("collect", a => {
        a.users.remove(message.author)
        
        const embed2 = new MessageEmbed()
        .setAuthor(`Painel Banir - ${client.user.username}™`, client.user.displayAvatarURL())
        .setColor("#24d470")
        .setDescription(`O que deseja fazer?`)
        .addField(`Categorias`, `> \`1️⃣\` **|** Inserir Motivo\n
        > \`2️⃣\` **|** Confirmar ação\n
        > \`3️⃣\` **|** Cancelar a ação\n`)
        message.channel.send(embed2).then(b => {
          b.react('1️⃣').catch(()=>{})
          b.react('2️⃣').catch(()=>{})
          b.react('3️⃣').catch(()=>{})
          
          const primeiroFilter = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
          segundoFilter = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id,
          terceiroFilter = (e, u) => e.emoji.name === '3️⃣' && u.id === message.author.id,
          quartoFilter = (e, u) => e.emoji.name === "🗑" && u.id === message.author.id
          
          const primeiroColetor = b.createReactionCollector(primeiroFilter),
          segundoColetor = b.createReactionCollector(segundoFilter),
          terceiroColetor = b.createReactionCollector(terceiroFilter),
          quartoColetor = b.createReactionCollector(quartoFilter)
          
          quartoColetor.on("collect", r1 => {
            b.delete()
          })
          
          primeiroColetor.on("collect", r1 => {
            r1.users.remove(message.author.id)
            b.delete().catch(()=>{})
            if(!member) return message.channel.send(`> **|** Você precisa mencionar alguém para punir!`)
            if(member.id === message.author.id) return message.channel.send(`> \`🔨\` **|** Você não pode se banir!`)
            
            message.channel.send(`> \`🔨\` **|** Digite no chat, o motivo do banimento!`).then(msg100 => {
              let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, { max: 1 })
              .on("collect", abacaxi => {
                motivo = abacaxi.content;
                
                db.ref(`Membros/Punimentos/Banir/${message.author.id}/Motivo`).set(motivo)
              })
            })
          })
          segundoColetor.on("collect", r2 => {
            r2.users.remove(message.author.id)
            if(!member) return message.channel.send(`> **|** Você precisa mencionar alguém para punir!`)
            if(member.id === message.author.id) return message.channel.send(`> \`🔨\` **|** Você não pode se banir!`)
            
            b.delete().catch(()=>{})
            message.channel.send(`> \`🔨\` **|** Banimento Confirmado!\nMotivo: ${motivo}\nMembro: ${member}\nAutor: ${message.author}`)
            db.ref(`Membros/Punimentos/Banir/${message.author.id}/Bans`).set(Number(banimentos) + Number(1))
            member.ban({ reason: motivos });
            
            member.send(`> \`🔨\` **|** Você foi banido do ${message.guild.name}\nMotivo: ${motivos}\nAutor: ${message.author}`)
            
            db.ref(`Membros/Punimentos/Banir/${message.author.id}/Motivo`).remove();
          })
          terceiroColetor.on("collect", r3 => {
            r3.users.remove(message.author.id)
            
            message.channel.send(`> \`🔨\` **|** Ação cancelada com sucesso!`)
            message.channel.bulkDelete(7)
          })
        })
      })
      coletor2.on("collect", a => {
        a.users.remove(message.author.id)
        
        const embed3 = new MessageEmbed()
        .setAuthor(`Painel Expulsar - ${client.user.username}™`, client.user.displayAvatarURL())
        .setColor("#24d470")
        .setDescription(`O que deseja fazer?`)
        .addField(`Categorias`, `> \`1️⃣\` **|** Inserir Motivo\n
        > \`2️⃣\` **|** Confirmar ação\n
        > \`3️⃣\` **|** Cancelar a ação`)
        message.channel.send(embed3).then(b => {
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
            if(!member) return message.channel.send(`> **|** Você precisa mencionar alguém para punir!`)
            if(member.id === message.author.id) return message.channel.send(`> \`🔨\` **|** Você não pode se expulsar!`)
            
            message.channel.send(`> \`🔨\` **|** Digite no chat, o motivo de expulsar!`).then(msg100 => {
              let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, { max: 1 })
              .on("collect", abacaxi => {
                motivo = abacaxi.content;
                
                db.ref(`Membros/Punimentos/Expulsar/${message.author.id}/Motivo`).set(motivo)
              })
            })
          })
            segundoColetor.on("collect", r2 => {
            r2.users.remove(message.author.id)
            if(!member) return message.channel.send(`> **|** Você precisa mencionar alguém para punir!`)
            if(member.id === message.author.id) return message.channel.send(`> \`🔨\` **|** Você não pode se expulsar!`)
            
            b.delete().catch(()=>{})
            message.channel.send(`> \`🔨\` **|** Expulsão Confirmada!\nMotivo: ${motivos}\nMembro: ${member}\nAutor: ${message.author}`)
            db.ref(`Membros/Punimentos/Expulsar/${message.author.id}/Expulsos`).set(Number(expulsos) + Number(1))
            member.kick({ reason: motivos });
            
              member.send(`> \`🔨\` **|** Você foi expulso do ${message.guild.name}\nMotivo: ${motivos}\nAutor: ${message.author}`)
              
            db.ref(`Membros/Punimentos/Expulsar/${message.author.id}/Motivo`).remove();
          })
            terceiroColetor.on("collect", r3 => {
            r3.users.remove(message.author.id)
            
            message.channel.send(`> \`🔨\` **|** Ação cancelada com sucesso!`)
            message.channel.bulkDelete(7)
          })
        })
      })
      coletor3.on("collect", a => {
        a.users.remove(message.author.id)
        
        message.guild.fetchBans().then(n => {
        let list = n.map(a => `'${a.user.tag} - ${a.user.id}'`).join('\n');
        if (list.length >= 1950) list = `${list.slice(0, 1950)}`;
        if (list.length === 0) list = 'Nenhum membro encontrado...';
        
        let embed4 = new MessageEmbed()
        .setAuthor(`Painel Banimentos - ${client.user.username}™`, client.user.displayAvatarURL())
        .setColor("#24d470")
        .setDescription(`\`${list}\``)
        message.channel.send(embed4).then(abbb => {
          abbb.react('🗑').catch(()=>{})
          
          const quartoFilter = (e, u) => e.emoji.name === "🗑" && u.id === message.author.id
          const quartoColetor = abbb.createReactionCollector(quartoFilter)
          
          quartoColetor.on("collect", af => {
            abbb.delete()
          })
        })
        })
      })
    })
  }
}