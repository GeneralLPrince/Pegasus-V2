const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const nbx = require('noblox.js');

const prefix = "!"

const dotconfig = require('dotenv').config();
const replace = require('replace-in-file');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: "In progress" }, status: 'online' });
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.on("guildCreate", guild => {
    var found = false;
    guild.channels.cache.forEach(function(Channel, id) {
        if(found == true || Channel.type != "text") {
          return;
        }
        if(guild.me.permissionsIn(Channel).has("SEND_MESSAGES") && guild.me.permissionsIn(Channel).has("VIEW_CHANNEL")) {
          found = true;        
          return Channel.send({        
            embed: {
              "type": "rich",
              "color": 3092790,
              "title": "Thanks for choosing Pegasus!",
              "description": "-Run **!setup** to set-up Pegasus with your server\n\n -Run **!link** to link your group with Pegasus\n\n -If you need support with setting up Pegasus, you can contact our support team by joining our support server: https://discord.gg/3XrYVHzV",
            }     
        })
        }
    })
})

var Setup = String(process.env.SETUP) //DO NOT TOUCH THIS
console.log(Setup)
var config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    storageBucket: "bucket.appspot.com"
} 
  

  
var firebase = require('firebase');

try {
  firebase.initializeApp(config)
  var database = firebase.database()
} catch (err) {
  console.log("New guy...");
}

client.on("message", message => {  
  
  if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    var playerMessage = message.content
    const PlayerDM = message.author

    if (command == 'setup') {  
        client.commands.get("setup").execute(message, firebase, client)
    }


    if (command == 'verify') { 
      if (Setup == "FALSE") {  //DO NOT TOUCH THIS
        return message.channel.send("tell the stupid owner to set-up the bot....") //DO NOT TOUCH THIS
      }   //DO NOT TOUCH THIS

      client.commands.get("verify").execute(message,firebase,client,nbx,Discord,PlayerDM,playerMessage,database)
    }



    if (command == 'change-user') {   
      if (Setup == "FALSE") {//DO NOT TOUCH THIS
        return message.channel.send("tell the stupid owner to set-up the bot....")//DO NOT TOUCH THIS
      }  //DO NOT TOUCH THIS

        client.commands.get("changeuser").execute(message,firebase,client)
    }
}) 


client.login(process.env.TOKEN);