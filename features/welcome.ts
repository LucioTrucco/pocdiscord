import { Client, TextChannel } from "discord.js";

const welcomeData = {} as {

  //guildId: [channel, message]
  [key: string] : [TextChannel, string]
}

export default (client: Client) => {
  client.on('guildMemberAdd', async member => {
    const {guild, id} = member

    let data = welcomeData[guild.id]
    let memberUser = member.user
    // Guild members ammount
    let guildMembers = await guild.members.fetch().then(res=> {

      console.log('Guild members: ' + res.size)
      if (!data){
        // const {channelId, text} = results
        let joinData = {
          id: memberUser.id,
          bot: memberUser.bot,
          username: memberUser.username,
          discriminator: memberUser.discriminator,
          dateJoin: new Date(),
          guildMembersAmmount: res.size
        }
        console.log(joinData)      
        const channel = guild.channels.cache.get('973296979331416124') as TextChannel
        data = welcomeData[guild.id] = [channel, 'Welcome @ to the server. @.']
      }
  
      console.log('User joined channel at ' + new Date())
      // data[0].send({
      //   content: data[1].replace(/@/g, `<@${member}>`)
      // })
    })

  })
}

export const config = {
  displayName: 'Welcome channel'
}