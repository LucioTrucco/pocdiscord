import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: 'Testing',
  description: 'Sends an embed',
  permissions: ['ADMINISTRATOR'],

  callback: async ({ message, text }) => {


    // // JSON PARSE FROM USER TEXT
    // const json = JSON.parse(text)

    // const embed = new MessageEmbed(json)
    // return embed


    // Embed message
    const embed = new MessageEmbed()
    .setDescription("Hello world")
    .setTitle('Title')
    .setColor('RED')
    .addFields([{
      name: 'Name',
      value: 'Value',
      inline: true
    },{
      name: 'Name2',
      value: 'Value2',
      inline: true
      
    }])
    .addField('name three', 'value three')

    // return embed

    const newMessage = await message.reply({
      embeds: [embed]
    })

    await new Promise (resolve => setTimeout(resolve, 3000))

    const newEmbed = newMessage.embeds[0]
    newEmbed.setTitle('Edited title')

    newMessage.edit({
      embeds: [newEmbed]
    })
  }
} as ICommand