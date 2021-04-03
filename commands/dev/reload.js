module.exports = {
    name: 'reload',
    aliases: ['reiniciar'],
    run: async(client, message, args) => {

        console.log(`> 📡 **|** Reiniciando...`)
        process.exit(1);

    }
}