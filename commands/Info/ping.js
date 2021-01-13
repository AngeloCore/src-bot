const discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'The ping Command',
  category: 'Info',
  aliases: ['pong'],
  run: async (client, message, args, prefix, config) => {
    
    message.channel.send(`Pinging...`).then(m => {
      
      let ping = m.createdTimestamp - message.createdTimestamp;
      
      let embed = new discord.MessageEmbed()
      .setColor(config.defaultColor)
      .addField(`Ping`, `${ping}ms`, true) //true or false
      .addField(`API ping:`, `${client.ws.ping}ms`, true); //this again is false OwO | ms = mili seconds
      
      m.edit('', embed);
    })
  }
}