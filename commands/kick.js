const Discord = require('discord.js');
const db = require('quick.db')
const send = require('quick.hook')
module.exports.run = async (client, message, args) => {

      if (!message.member.hasPermission("KICK_MEMBERS")) return send(message.channel, "Sorry, but you do not have valid permissions! If you beleive this is a error, contact an owner.", {
        name: 'Kick Error', 
        icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/denied-512.png'
      })
const modlog = message.guild.channels.find(channel => channel.name === 'mod-log');
const mod = message.author;
let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if (!user) return send(message.channel, "Couldn't find user.", {
    name: 'Kick Error',
    icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/denied-512.png'
})
      if (user.hasPermission("KICK_MEMBERS")) return send(message.channel, "The user you are trying to mute is either the same, or higher role than you.", {
        name: 'Kick Error',
        icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/denied-512.png'
      })
        let reason = message.content.split(" ").slice(2).join(" ");
        if (!reason) return send(message.channel, 'Please specify a reason for the kick!', {
          name: 'Kick Error',
          icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/denied-512.png'
        })
        const casenumbers = new db.table('CASENUMBERs')
        const guildcasenumber = await casenumbers.fetch(`case_${message.guild.id}`)
        const a = guildcasenumber
        const b = a+1
        casenumbers.set(`case_${message.guild.id}`, b)
      //  console.log(guildcasenumber)
    


  
      if (!modlog) return;

  
  if (user) {
  
  user.kick({ reason: `${reason}`})
    
    const embed = new Discord.MessageEmbed()
        .setAuthor('Kick')
    .addField('Moderator', `${mod}`)
    .addField('User', `<@${user.id}>`)

    .addField('Reason', `${reason}`)
    .addField('Case Number', `${guildcasenumber}`)
    .setColor('BLUE')
    .setTimestamp()
    .setThumbnail(user.user.avatarURL())
    .setFooter(`ID ${user.id}`)
    send(modlog, embed, {
      name: 'Kick',
      icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/denied-512.png'
    })
    send(message.channel, 'I have kicked the person and logged it!', {
      name: 'Kick',
      icon: 'Kick'
    })
  
  
  }
}
exports.conf = {
  aliases: ['example', 'chexample']
  };
 
  exports.help = {
  name: 'example', description: 'hello this is description', usage: 'example'
  };