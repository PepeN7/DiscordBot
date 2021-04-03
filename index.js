const fs = require("fs");
const firebase = require("firebase");
const { MessageEmbed, Collection, Client } = require("discord.js")

const client = new Client();
const CONFIG = require("./config.json");

const ShopAPI = require('./shopAPI.js')
const API = new ShopAPI()
client.API = API;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["aliases", "commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./main/${x}`)(client));


var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "projectbotshop",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  // Conexão Firebase

firebase.initializeApp(firebaseConfig);


client.login(CONFIG.TOKEN)