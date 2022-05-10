import { Client, TextChannel } from "discord.js";

const welcomeData = {} as {

  //guildId: [channel, message]
  [key: string] : [TextChannel, string]
}

export default (client: Client) => {
  client.on('guildMemberAdd', async member => {
    const {guild, id} = member

    let data = welcomeData[guild.id]

    if (!data){
      // const {channelId, text} = results
      const channel = guild.channels.cache.get('973296979331416124') as TextChannel
      data = welcomeData[guild.id] = [channel, 'Welcome @ to the server. @.']
    }

    console.log('User joined channel at ' + new Date())
    data[0].send({
      content: data[1].replace(/@/g, `<@${member}>`)
    })
  })
}

export const config = {
  displayName: 'Welcome channel'
}