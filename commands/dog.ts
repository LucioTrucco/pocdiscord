import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import axios from 'axios'
//https://dog.ceo/api/breeds/image/random Fetch!

export default {
  category: 'Dog api',
  description: 'Get a random dog',
  // permissions: ['ADMINISTRATOR'],

  callback: async ({ message, text }) => {
    let uri = 'https://dog.ceo/api/breeds/image/random'

    const {data} = await axios.get(uri)
    console.log(data)

    const embed = new MessageEmbed()
    .setTitle("Your Modak's puppy ")
    .setImage(data.message)

     await message.reply({
      embeds: [embed]
    })


  }
} as ICommand