const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true }); //now i am a cool programmer ;d
const config = require("./config.json"); //the config file
const fs = require('fs');

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client)
})

client.on("ready", () => {
  console.log(`${client.user.tag} is online`); //tag: user#0000 username: user discriminator: #0000
  client.user.setActivity(`SRC programmer`); //this set the bot presence staus, if you don't want presence delete this line
});

client.on("message", async message => {
  if (message.author.bot) return; //if the author is bot

  if (!message.guild) return; //if the message is not writted in server OwO

  let prefix = config.defaultPrefix;

  if (!message.content.startsWith(prefix)) return; //if is not command
  
  if (!message.member) message.member = await message.guild.fetchMember(message); //bug bruuuh

  let args = message.content.slice(prefix.length).trim().split(/ +/g); //the args IF YOU HAVE A ERROR GO TO github.com/AngeloCore/src-bot AND COPY THE FILES

  let cmd = args.shift().toLowerCase(); //the cmd

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    command.run(client, message, args, prefix, config);
  }
  
});

client.login(config.token); //here paste the bot token from discord.com/developers
