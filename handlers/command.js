const { readdirSync } = require('fs')
const ascii = require('ascii-table');

const table = new ascii('Commands');
table.setHeading('Command', 'Status');

module.exports = (client) => {
  
  readdirSync('./commands').forEach(dir => {
    
    const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
    
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      
      if (pull.name) {
        client.commands.set(pull.name, pull)
        table.addRow(file, 'OK');
      } else {
        table.addRow(file, 'Missing help name or another error');
        continue;
      }
      
      if (pull.aliases && Array.isArray(pull.alises)) pull.aliases.forEach(alias => {
        client.aliases.set(alias, pull.name);
      })
    }
  });
  
  console.log(table.toString());
  
}