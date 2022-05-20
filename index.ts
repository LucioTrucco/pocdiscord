import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
import { FirehoseClient, PutRecordCommand  } from "@aws-sdk/client-firehose";

dotenv.config()

const firehoseClient = new FirehoseClient({ region: "us-east-2" });

const sendEvent = (messageData) => {
  const params = {

    DeliveryStreamName: 'discord-events-fh',
    Record: { Data: encodeRecord(messageData)}
  }
  
  const command = new PutRecordCommand(params);
  firehoseClient.send(command).then(
    (data) => {
      console.log(data)
    },
    (error) => {
      console.log(error)
    })
}


const encodeRecord = (json) =>{
  return new TextEncoder().encode(JSON.stringify(json))
}


const client = new DiscordJS.Client({
  // What the bot intents to use and what info it needs
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES
  ],
  partials:['MESSAGE', 'CHANNEL', 'REACTION']
})

client.on('ready', () => {
  console.log('Bot is ready')
  new WOKCommands(client,{
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    typeScript: true,
    testServers: ['961074073868308480']
  })
})

client.on('messageCreate', async (msg) => {
  let msgAuthor = {
    id: msg.author.id,
    bot: msg.author.bot,
    username: msg.author.username,
    discriminator: msg.author.discriminator,
    dateJoin: new Date()
  }
  let messageData = {
    channelId: msg.channelId,
    id: msg.id, 
    content: msg.content,
    author: msgAuthor,
    date: new Date(),
    type: "MESSAGE_DATA"
  }

  sendEvent(messageData)  
})

client.on('messageReactionAdd', (reaction) => {
  let msgAuthor = {
    id: reaction?.message?.author?.id,
    bot: reaction?.message?.author?.bot,
    username: reaction?.message?.author?.username,
    discriminator: reaction?.message?.author?.discriminator,
    dateJoin: new Date()
  }
  let emojiReaction = {
    name: reaction.emoji.name,
    count: reaction.count
  }
  let reactionData = {
    channelId: reaction.message.channelId,
    messageId: reaction.message.id, 
    messageContent: reaction.message.content,
    messageAuthor: msgAuthor,
    emoji: emojiReaction,
    date: new Date(),
    type: "REACTION_DATA"
  }
  sendEvent(reactionData)

});

client.login(process.env.TOKEN)
  
export default sendEvent
