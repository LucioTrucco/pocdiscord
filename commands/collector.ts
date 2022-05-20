import { ICommand } from 'wokcommands';
import { Message, MessageReaction, User } from 'discord.js';

export default {
  category: 'Testing',
  description: 'Testing',

  callback: ( {message, channel} ) => {
    
    console.log(message)
    // Collect message responses from same author
    // message.reply('Enter your username: ')
    // const filter = (m: Message) => {
    //   return m.author.id === message.author.id
    // }
    // const collector = channel.createMessageCollector({
    //   filter,
    //   max: 1,
    //   time: 1000 * 20
    // })

    message.reply('Please confirm this action')
    message.react('👍')

    const filter = (reaction: MessageReaction, user: User) => {
      console.log('user', user)
      console.log('reaction', reaction)
      return user.id === message.author.id
    }

    const collector = message.createReactionCollector({
      filter,
      
      // time: 1000 * 5
    })

    collector.on('collect', reaction => {
      console.log('reacted with: ' + reaction.emoji.name + ' at: ' + new Date())
      
    })

    collector.on('end', collected => {
      if (collected.size === 0){
        message.reply('You did not react in time.')
        return
      }

      let text = 'Collected\n\n'

      collected.forEach((message) => {
        text += `${message.emoji.name}\n`
      })
      message.reply(text)
    })

  }
} as ICommand