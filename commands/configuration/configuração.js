const { MessageEmbed } = require("discord.js");
const CONFIG = require("../../config.json");

module.exports = {
    name: 'configuração',
    aliases: ['configuration'],
    run: async(client, message, args, db) => {
        
        message.delete()
        .catch(()=>{})

        // Verificação se o usúario tem permissão.
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`> \`⚠\` Você precisa ter a permissão **Administrador** pra me configurar.`).then(msg7 => {
                msg7.delete({ timeout: 15000 })})
       }

       // Verficação se o bot tem permissão.
       if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`> \`⚠\` Eu estou sem permissão de **Administrador**.`).then(msggg7 => {
            msggg7.delete({ timeout: 15000 })})
   }

        /* PREFIXO */
        let prefix = await db.ref(`Servidores/Prefixos/${message.guild.id}/Prefix`).once('value');
        prefix = prefix.val();
        if(!prefix) prefix = CONFIG.TOKEN;

        let boas_vindas = await db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Status`).once('value');
        boas_vindas = boas_vindas.val();
        if(boas_vindas === null) boas_vindas = "\`( ❌ )\`";
        if(boas_vindas === 'true') boas_vindas = "\`( ✅ )\`";

        let saidalobby = await db.ref(`Servidores/Canais/Saida/${message.guild.id}/Status`).once('value');
        saidalobby = saidalobby.val();
        if(saidalobby === null) saidalobby = "\`( ❌ )\`";
        if(saidalobby === 'true') saidalobby = "\`( ✅ )\`"

/* Primeira (Embed Principal) */
const embed = new MessageEmbed()
.setAuthor(`Painel de Configuração Principal - ${client.user.username}™`, client.user.displayAvatarURL())
.setColor('#538eed')
.setDescription(`Olá **${message.author.username}**\n Este e o painel de configurações para logs e afins do seu servidor.
   Aqui você pode conferir todas as configurações dentro do servidor em cada comando disponível.`)
.addField('Categorias', `> \`1️⃣\` **|** Boas-Vindas Lobby ${boas_vindas}\n
> \`2️⃣\` **|** Saida Lobby ${saidalobby}\n
> \`3️⃣\` **|** Prefixo \`( ${prefix} )\``)
.setColor('#538eed')
.setFooter(`${client.user.username} • Todos direitos reservados`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp();

 /* Reações dos numeros */
 message.channel.send(embed).then(msg => {
     msg.delete({ timeout: 120000 }).catch(()=>{})
     msg.react('1️⃣')
     msg.react('2️⃣')
     msg.react('3️⃣')
     msg.react('4️⃣')

     const filter = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id, 
     filter2 = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id;
     filter3 = (e, u) => e.emoji.name === '3️⃣' && u.id === message.author.id;
     filter4 = (e, u) => e.emoji.name === '4️⃣' && u.id === message.author.id;

     const coletor = msg.createReactionCollector(filter),
     coletor2 = msg.createReactionCollector(filter2);
     coletor3 = msg.createReactionCollector(filter3);
     coletor4 = msg.createReactionCollector(filter4);

     /* BOAS-VINDAS */
    coletor.on("collect", r1 => {
        r1.users.remove(message.author.id);

        const embed2 = new MessageEmbed()
        .setAuthor(`Configuração de Entrada`, client.user.displayAvatarURL())
        .setColor('#538eed')
        .setDescription('Oque Deseja Fazer? ')
        .addField('Categorias', `> \`1️⃣\` Configurar canal\n> \`2️⃣\` Configurar mensagem\n> \`3️⃣\` Configurar Cargo\n> \`4️⃣\` Desativar sistema`)
        message.channel.send(embed2).then(aa => {
             aa.react('1️⃣').catch(()=>{})
             aa.react('2️⃣').catch(()=>{})
             aa.react('3️⃣').catch(()=>{})
             aa.react('4️⃣').catch(()=>{})

             const onFilterr = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
             msgFilterr = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id,
             roleFilter = (e, u) => e.emoji.name === '3️⃣' && u.id === message.author.id,
             offFilterr = (e, u) => e.emoji.name === '4️⃣' && u.id === message.author.id;

             const onColetorr = aa.createReactionCollector(onFilterr),
             msgColetorr = aa.createReactionCollector(msgFilterr),
             roleColetor = aa.createReactionCollector(roleFilter),
             offColetorr = aa.createReactionCollector(offFilterr);

             
             // Ativando
             onColetorr.on('collect', (ff) => {
              ff.users.remove(message.author.id)  
              aa.delete().catch(()=>{})
                message.channel.send(`> \`🟦\` ${message.author} mencione o canal que deseja definir`).then(pp => {
                    pp.delete({ timeout: 30000 }).catch(()=>{})
                     let ckkyk = message.channel.createMessageCollector(x => x.author.id === message.author.id,{max:1})
                     .on('collect', oo => {
                          let meencao = oo.mentions.channels.first()
                          oo.delete().catch(()=>{})
                          pp.delete().catch(()=>{})
                          if (!meencao) return message.channel.send(`> \`🟥\` Não encontrei esse canal...`).then(msg222 => {
                            msg222.delete({ timeout: 15000 })})
                          db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Canal`).set(meencao.id) 
                          db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Status`).set('true')
                          message.channel.send(`> \`🟩\` Canal ativado com sucesso!`).then(msg333 => {
                            msg333.delete({ timeout: 15000 })})
                          meencao.send(`> \`🟩\` ${message.author} definiu este canal como o **Canal de Entrada**!`).then(abcc => {
                              abcc.delete({ timeout: 30000 })})
                     })
                    })
                })

                // Definindo a Mensagem
                msgColetorr.on('collect', (aa) => {
                    aa.users.remove(message.author.id)
                    message.channel.send(`> \`🟦\` **${message.author} digite a mensagem que deseje definir!** \n Mencionar membro: \`{membro}\` \n Nome do servidor: \`{servidor}\` \n Quantidade de membros: \`{membros}\``).then(oo => {
                        oo.delete({ timeout: 30000 }).catch(()=>{})
                         let cll = message.channel.createMessageCollector(x => x.author.id === message.author.id,{max:1})
                         .on('collect', ooo => {
                            mensagem = ooo.content
                            ooo.delete().catch(()=>{})
                            oo.delete().catch(()=>{})
                              db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Mensagem`).set(mensagem) 
                              message.channel.send(`> \`🟩\` Mensagem ativado com sucesso!`).then(msg777 => {
                                msg777.delete({ timeout: 15000 })})
                         })
                        })
                      })
              // Definindo a role
              roleColetor.on("collect", fg => {
                fg.users.remove(message.author.id);
                aa.delete().catch(()=>{})
                message.channel.send(`> \`🟦\` **${message.author} mencione o cargo!`).then(oo => {
                  oo.delete({ timeout: 30000 }).catch(()=>{})
                   let cll = message.channel.createMessageCollector(x => x.author.id === message.author.id,{max:1})
                   .on('collect', ooo => {
                      cargo = ooo.mentions.roles.first();
                      ooo.delete().catch(()=>{})
                      oo.delete().catch(()=>{})
                        db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Cargo`).set(cargo.id) 
                        message.channel.send(`> \`🟩\` Cargo ativado com sucesso!`).then(msg777 => {
                          msg777.delete({ timeout: 15000 })})
                        })
                    })
              })

             // Desativando
             offColetorr.on('collect', async (hh) => {
               hh.users.remove(message.author.id)
                  aa.delete().catch(()=>{})
                  let canaloff = await db.ref(`Servidores/Canais/Entrada/${message.guild.id}`).once('value')
                  canaloff = canaloff.val()
                  if (canaloff === null) return message.channel.send(`> \`🟥\` Esse sistema ainda não foi definido...`).then(msg444 => {
                    msg444.delete({ timeout: 15000 })})
                  db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Canal`).remove()
                  db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Status`).remove()
                  db.ref(`Servidores/Canais/Entrada/${message.guild.id}/Mensagem`).remove()
                  message.channel.send(`> \`🟥\` Sistema desativado com sucesso!`).then(msg555 => {
                    msg555.delete({ timeout: 15000 })})
                    })
                })
            })

            /* SAIDA */
            coletor2.on("collect", r2 => {
              r2.users.remove(message.author.id) 
                
                const embed2 = new MessageEmbed()
                .setAuthor(`Configuração de Saída`, client.user.displayAvatarURL())
                .setColor('#538eed')
                .setDescription('Oque Deseja Fazer? ')
                .addField('Categorias', `> \`1️⃣\` Configurar canal\n> \`2️⃣\` Configurar mensagem\n> \`3️⃣\` Desativar sistema`)
                message.channel.send(embed2).then(aaa => {
                     aaa.delete({ timeout: 30000 }).catch(()=>{})
                     aaa.react('1️⃣').catch(()=>{})
                     aaa.react('2️⃣').catch(()=>{})
                     aaa.react('3️⃣').catch(()=>{})
    
                     const onFilterrr = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
                     msgFilterrr = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id,
                     offFilterrr = (e, u) => e.emoji.name === '3️⃣' && u.id === message.author.id;
    
                     const onColetorrr = aaa.createReactionCollector(onFilterrr),
                     msgColetorrr = aaa.createReactionCollector(msgFilterrr),
                     offColetorrr = aaa.createReactionCollector(offFilterrr);
    

                    // Ativando
                     onColetorrr.on('collect', (f) => {
                       f.users.remove(message.author.id)
                        aaa.delete().catch(()=>{})
                        message.channel.send(`> \`🟦\` ${message.author} mencione o canal que deseja definir`).then(pppa => {
                            pppa.delete({ timeout: 30000 }).catch(()=>{})
                             let ckkkk = message.channel.createMessageCollector(x => x.author.id === message.author.id,{max:1})
                             .on('collect', oooo => {
                                  let meeencao = oooo.mentions.channels.first()
                                  oooo.delete().catch(()=>{})
                                  pppa.delete().catch(()=>{})
                                  if (!meeencao) return message.channel.send(`> \`🟥\` Não encontrei esse canal...`).then(msg2222 => {
                                    msg2222.delete({ timeout: 15000 })})
                                  db.ref(`Servidores/Canais/Saida/${message.guild.id}/Canal`).set(meeencao.id) 
                                  db.ref(`Servidores/Canais/Saida/${message.guild.id}/Status`).set('true')
                                  message.channel.send(`> \`🟩\` Canal ativado com sucesso!`).then(msg3333 => {
                                    msg3333.delete({ timeout: 15000 })})
                                  meeencao.send(`> \`🟩\` ${message.author} definiu este canal como o **Canal de Saída**!`).then(abcdc => {
                                      abcdc.delete({ timeout: 30000 })})
                             })
                            })
                        })
                    

                        // Definindo a Mensagem
                        msgColetorrr.on('collect', (f) => {
                          f.users.remove(message.author.id)
                            aaa.delete().catch(()=>{})
                            message.channel.send(`> \`🟦\` **${message.author} digite a mensagem que deseje definir!** \n Mencionar membro: \`{membro}\` \n Nome do servidor: \`{servidor}\` \n Quantidade de membros: \`{membros}\``).then(ool => {
                                ool.delete({ timeout: 30000 }).catch(()=>{})
                                 let clkk = message.channel.createMessageCollector(x => x.author.id === message.author.id,{max:1})
                                 .on('collect', oolo => {
                                    mensagem = oolo.content
                                    oolo.delete().catch(()=>{})
                                    ool.delete().catch(()=>{})
                                      db.ref(`Servidores/Canais/Saida/${message.guild.id}/Mensagem`).set(mensagem) 
                                      message.channel.send(`> \`🟩\` Mensagem ativado com sucesso!`).then(msg7777 => {
                                        msg7777.delete({ timeout: 15000 })})
                                 })
                                })
                            })
        
    
                    // Desativando
                     offColetorrr.on('collect', async (f) => {
                       f.users.remove(message.author.id)
                          aaa.delete().catch(()=>{})
                          let canal = await db.ref(`Servidores/Canais/Saida/${message.guild.id}`).once('value')
                          canal = canal.val()
                          if (canal === null) return message.channel.send(`> \`🟥\` Esse sistema ainda não foi definido...`).then(msg4444 => {
                            msg4444.delete({ timeout: 15000 })})
                          db.ref(`Servidores/Canais/Saida/${message.guild.id}/Canal`).remove()
                          db.ref(`Servidores/Canais/Saida/${message.guild.id}/Status`).remove()
                          db.ref(`Servidores/Canais/Saida/${message.guild.id}/Mensagem`).remove()
                          message.channel.send(`> \`🟥\` Sistema desativado com sucesso!`).then(msg5555 => {
                            msg5555.delete({ timeout: 15000 })})
                     })
                })
            })

            /*  PREFIXO */
            coletor3.on('collect', async r3 => {
              r3.users.remove(message.author.id)

              const embedprefix = new MessageEmbed()
              .setAuthor(`Configuração do Prefixo`, client.user.displayAvatarURL())
              .setColor('#538eed')
              .setDescription('Oque Deseja Fazer? ')
              .addField('Categorias', `> <:v_number1:771407052874448906> Configurar prefixo\n> <:v_number2:771407052722536489> Resetar prefixo`)
              message.channel.send(embedprefix)
              .then(ab => {
                     ab.delete({ timeout: 30000 }).catch(()=>{})
                     ab.react('1️⃣').catch(()=>{})
                     ab.react('2️⃣').catch(()=>{})
    
                     const onFilteer = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
                     offFilteer = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id;
    
                     const onColeetor = ab.createReactionCollector(onFilteer),
                     offColeetor = ab.createReactionCollector(offFilteer);
    

                    // Setando Prefix
                     onColeetor.on('collect', (gg) => {
                       gg.users.remove(message.author.id)
                        ab.delete().catch(()=>{})
                        message.channel.send(`> \`🟦\` ${message.author} digite o prefixo que deseje definir!`).then(olol => {
                            olol.delete({ timeout: 30000 }).catch(()=>{})
                             let cllkk = message.channel.createMessageCollector(x => x.author.id === message.author.id,{max:1})
                             .on('collect', ololo => {
                                prefix = ololo.content
                                ololo.delete().catch(()=>{})
                                olol.delete().catch(()=>{})
                                  db.ref(`Servidores/Prefixos/${message.guild.id}/Prefix`).set(prefix) 
                                  message.channel.send(`> \`🟩\` Prefixo definido com sucesso!`).then(msgmsg => {
                                    msgmsg.delete({ timeout: 15000 })})
                             })
                            })
                        })
    
                        
                    // Resetando Prefixo
                     offColeetor.on('collect', async () => {
                          ab.delete().catch(()=>{})
                          let pref = await db.ref(`Servidores/Prefixos/${message.guild.id}/Prefix`).once('value')
                          pref = pref.val()
                          if (pref === null) return message.channel.send(`> \`🟥\` Esse sistema ainda não foi alterado...`).then(msgs4 => {
                            msgs4.delete({ timeout: 15000 })})
                          db.ref(`Servidores/Prefixos/${message.guild.id}/Prefix`).remove()
                          message.channel.send(`> \`🟥\` Prefix resetado com sucesso!`).then(msgs5 => {
                            msgs5.delete({ timeout: 15000 })})
                     })
                })
            })
        })
    }
}