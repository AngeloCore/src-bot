module.exports = {
  name: 'say',
  description: 'The say Command',
  category: 'Utility',
  aliases: [], //no aliases
  run: async (client, message, args, prefix, config) => {
    
    if (!args.join(' ')) {
      return message.channel.send(`Please give a text to say`);
    }
    
    message.channel.send(args.join(' '));
    
  }
}