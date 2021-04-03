const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'defesa',
    aliases: ['antiraid', 'anti-raid'],
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

        /* ANTI_SPAM */
        let anti_spam = await db.ref(`Servidores/Anti-Raid/Anti-Spam/${message.guild.id}/Status`).once('value')
        anti_spam = anti_spam.val();
        if(anti_spam === null) anti_spam = "\`❌ DESATIVADO\`";
        if(anti_spam === "true") anti_spam = "\`✅ ATIVADO\`";

        /* ANTI_FAKE */
        let anti_fake = await db.ref(`Servidores/Anti-Raid/Anti-Fake/${message.guild.id}/Status`).once('value')
        anti_fake = anti_fake.val();
        if(anti_fake === null) anti_fake = "\`❌ DESATIVADO\`";
        if(anti_fake === "true") anti_fake = "\`✅ ATIVADO\`";

        /* ANTI_BOTS */
        let anti_bots = await db.ref(`Servidores/Anti-Raid/Anti-Bots/${message.guild.id}/Status`).once('value')
        anti_bots = anti_bots.val();
        if(anti_bots === null) anti_bots = "\`❌ DESATIVADO\`"; 
        if(anti_bots === "true") anti_bots = "\`✅ ATIVADO\`";

        /* EMBED PRINCIPAL */
        const embed = new MessageEmbed()
        .setAuthor(`Painel de Defesa Completo - ${client.user.username}™`, client.user.displayAvatarURL())
        .setColor("#24d470")
        .setDescription(`Olá ${message.author}, \n
        Aqui você encontar o painel de defesa Anti-Raids completo!`)
        .addField(`__Categorias__`, `> \`1️⃣\` **|** Anti-Spam ${anti_spam}\n
        > \`2️⃣\` **|** Anti-Fake ${anti_fake}\n
        > \`3️⃣\` **|** Anti-Bots ${anti_bots}`)
        .setTimestamp()
        .setFooter(`${client.user.username} • Todos direitos reservados`, client.user.displayAvatarURL({dynamic: true}))
        message.channel.send(embed).then(msg => {
            msg.react('1️⃣'), msg.react('2️⃣'), msg.react('3️⃣'), msg.react('🗑')

            const filter1 = (e, u) => e.emoji.name === "1️⃣" && u.id === message.author.id,
            filter2 = (e, u) => e.emoji.name === "2️⃣" && u.id === message.author.id,
            filter3 = (e, u) => e.emoji.name === "3️⃣" && u.id === message.author.id,
            filter4 = (e, u) => e.emoji.name === "🗑" && u.id === message.author.id;

            const coletor1 = msg.createReactionCollector(filter1),
            coletor2 = msg.createReactionCollector(filter2),
            coletor3 = msg.createReactionCollector(filter3),
            coletor4 = msg.createReactionCollector(filter4)

            coletor1.on("collect", async r1 => {
                r1.users.remove(message.author.id)

                const embed2 = new MessageEmbed()
                .setAuthor(`Anti-Spam`, client.user.displayAvatarURL())
                .setColor('#538eed')
                .setDescription('O que Deseja Fazer? ')
                .addField('Categorias', `> \`1️⃣\` Ativar sistema\n
                > \`2️⃣\` Desativar sistema`)
                message.channel.send(embed2).then(b => {
                b.delete({ timeout: 30000 }).catch(()=>{})
                b.react('1️⃣').catch(()=>{})
                b.react('2️⃣').catch(()=>{})

                
                const onFilter = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
                offFilter = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id;

                const onColetor = b.createReactionCollector(onFilter),
                offColetor = b.createReactionCollector(offFilter);

                /* Ativando */
                onColetor.on("collect", async ab => {
                    ab.users.remove(message.author.id)
                    b.delete().catch(()=>{})

                    message.channel.send(`> 💼 **|** Mencione o cargo Mutado!`).then(aaaaa => {
                        aaaaa.delete({timeout: 20000})
                        let cpa = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
                        .on("collect", aaaaaaaaaaaaa => {
                            let role = aaaaaaaaaaaaa.mentions.roles.first();
                            if(!role) return message.channel.send(`> 💼 **|** Você precisa mencionar o cargo!`)

                            db.ref(`Servidores/Anti-Raid/Anti-Spam/${message.guild.id}/Cargo`).set(role.id);
                        })

                    })

                    message.channel.send(`> ✅ **|** Sistema ativado com sucesso!`).then(masfasfasfasf => masfasfasfasf.delete({timeout: 7000}))
                    db.ref(`Servidores/Anti-Raid/Anti-Spam/${message.guild.id}/Status`).set('true');
                })
                /* Desativando */
                offColetor.on("collect", async abc => {
                    abc.users.remove(message.author.id)
                    b.delete().catch(()=>{})

                    message.channel.send(`> ✅ **|** Sistema desativado com sucesso!`).then(absf => absf.delete({timeout: 7000}))
                    db.ref(`Servidores/Anti-Raid/Anti-Spam/${message.guild.id}/Status`).remove()
                })
             })
            })
            coletor2.on("collect", async r2 => {
                r2.users.remove(message.author.id)

                const embed3 = new MessageEmbed()
                .setAuthor(`Anti-Fake`, client.user.displayAvatarURL())
                .setColor('#538eed')
                .setDescription('O que Deseja Fazer? ')
                .addField('Categorias', `> \`1️⃣\` Configurar sistema\n
                > \`2️⃣\` Desativar sistema`)
                message.channel.send(embed3).then(b => {
                    b.delete({ timeout: 30000 }).catch(()=>{})
                    b.react('1️⃣').catch(()=>{})
                    b.react('2️⃣').catch(()=>{})
    
                    
                    const onFilter = (e, u) => e.emoji.name === '1️⃣' && u.id === message.author.id,
                    offFilter = (e, u) => e.emoji.name === '2️⃣' && u.id === message.author.id;
    
                    const onColetor = b.createReactionCollector(onFilter),
                    offColetor = b.createReactionCollector(offFilter);

                    /* Ativando */
                    onColetor.on("collect", async ab => {
                        ab.users.remove(message.author.id)
                        b.delete().catch(()=>{})

                        message.channel.send(`> \`🟦\` ${message.author} insira quantos dias você quer para ser barrado ao entrar.`).then(p => {
                            p.delete({ timeout: 30000 }).catch(()=>{})
                             let ck = message.channel.createMessageCollector(x => x.author.id === message.author.id,{max:1})
                             .on('collect', o => {
                              let dias = o.content;
                              o.delete().catch(()=>{})
                              p.delete().catch(()=>{})
                              if (isNaN(dias)) return message.channel.send(`> \`🟥\` Você não inseriu um número...`).then(msg2 => { msg2.delete({ timeout: 150000})})
                                  db.ref(`Servidores/Anti-Raid/Anti-Fake/${message.guild.id}/Dias`).set(dias)
                                  db.ref(`Servidores/Anti-Raid/Anti-Fake/${message.guild.id}/Status`).set('true')
                                  message.channel.send(`> \`🟩\` Sistema ativado com sucesso!`).then(msg3 => {
                                    msg3.delete({ timeout: 15000 })})
                                    message.channel.send(`> \`🟩\` ${message.author} definiu ${dias} dias!`).then(abcd => {
                                      abcd.delete({ timeout: 15000 })})
                            })
                        })
                    })
                    /* Desativando */
                    offColetor.on("collect", async abc => {
                        abc.users.remove(message.author.id)
                        b.delete().catch(()=>{})

                        let canalb = await db.ref(`Servidores/Anti-Raid/Anti-Fake/${message.guild.id}`).once('value')
                        canalb = canalb.val()
                        if (canalb === null) return message.channel.send(`> \`🟥\` Esse sistema ainda não foi definido...`).then(msg4 => {
                          msg4.delete({ timeout: 15000 })})
                        db.ref(`Servidores/Anti-Raid/Anti-Fake/${message.guild.id}/Dias`).remove()
                        db.ref(`Servidores/Anti-Raid/Anti-Fake/${message.guild.id}/Status`).remove()
                        message.channel.send(`> \`🟥\` Sistema desativado com sucesso!`).then(msg5 => {
                          msg5.delete({ timeout: 15000 })})
                    })
                })
            })

            coletor3.on("collect", async r3 => {
                r3.users.remove(message.author)

                const embed4 = new MessageEmbed()
                .setAuthor(`Anti-Bot`, client.user.displayAvatarURL())
                .setColor('#538eed')
                .setDescription('Oque Deseja Fazer?')
                .addField('Categorias', `> <:v_number1:771407052874448906> Ativar sistema\n
                > <:v_number2:771407052722536489> Desativar sistema`)
                message.channel.send(embed3).then(c => {
                    c.delete({ timeout: 30000 }).catch(()=>{})
                    c.react('771407052874448906').catch(()=>{})
                    c.react('771407052722536489').catch(()=>{})

                    const onFilter = (e, u) => e.emoji.id === '771407052874448906' && u.id === message.author.id,
                    offFilter = (e, u) => e.emoji.id === '771407052722536489' && u.id === message.author.id;
   
                    const onColetor = c.createReactionCollector(onFilter),
                    offColetor = c.createReactionCollector(offFilter);

                    //ATIVANDO
                    onColetor.on("collect", async j => {
                        c.delete().catch(()=>{})
                                  db.ref(`Servidores/Anti-Raid/Anti-Bot/${message.guild.id}/Status`).set('true')
                                  message.channel.send(`> \`🟩\` Sistema ativado com sucesso!`).then(msg3 => {
                                    msg3.delete({ timeout: 15000 })})
                                    })
                    offColetor.on("collect", async p => {
                        c.delete().catch(()=>{})
                        let canalb = await db.ref(`Servidores/Anti-Raid/Anti-Bot/${message.guild.id}`).once('value')
                        canalb = canalb.val()
                        if (canalb === null) return message.channel.send(`> \`🟥\` Esse sistema ainda não foi definido...`).then(msg4 => {
                          msg4.delete({ timeout: 15000 })})
                        db.ref(`Servidores/Anti-Raid/Anti-Bot/${message.guild.id}/Status`).remove()
                        message.channel.send(`> \`🟥\` Sistema desativado com sucesso!`).then(msg5 => {
                          msg5.delete({ timeout: 15000 })})
                    })
                })
            })

            coletor4.on("collect", r4 => {
                msg.delete().catch(()=>{})

                message.channel.send(`> 🗑 **|** Finalizado com sucesso!\nSerá apagado dentro de 7 segundos!`).then(msgaa => msgaa.delete({timeout: 7000}))
            })
        })
    }
}