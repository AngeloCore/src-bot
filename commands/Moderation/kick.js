const discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick an user from server',
    aliases: [],
    run: async (client, message, args, prefix, config) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) { //if the user dont have kick members permission

            return message.reply('Sorry, you dont have **kick members** permission...');

        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(u => u.user.tag === args[0]);

        if (!user) { //if no user

            return message.reply('Please mention a user');

        }

        if (!user.kickable) { //if the bot cant kick the user

            return message.reply("I can't kick this user, sorry");

        }

        if (user.id === message.author.id) {

            return message.reply("I can't kick you lmao"); //if the user is the message author

        }

        let reason = args.slice(1).join(' ');

        if (!reason) {
            reason = 'No reason' //if no reason
        }

        let embed = new discord.MessageEmbed()
        .setColor(config.defaultColor)
        .setAuthor('Member sucessfully kicked!', user.user.displayAvatarURL())
        .addField('Reason', reason, true)
        .addField('Moderator', message.author.tag, true)
        .setTimestamp();

        let userEmbed = new discord.MessageEmbed()
        .setColor('RED')
        .setAuthor('Kick')
        .addField('Server', message.guild.name, true)
        .addField('Moderator', message.author.tag, true)
        .addField('Reason', reason, true);

        let errEmbed = new discord.MessageEmbed()
        .setColor('RED')
        .setAuthor('Something Wrong');

        user.send(userEmbed).catch(e => console.log(e)); //if user's dm is locked

        let msg = await message.channel.send(embed);

        user.kick(`By: ${message.author.tag} | Reason: ${reason}`).catch(e => { msg.edit('', errEmbed.setDescription(`Error: ${e}`)) });

    }
}