import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
import { FirehoseClient, PutRecordCommand  } from "@aws-sdk/client-firehose";

dotenv.config()

const firehoseClient = new FirehoseClient({ region: "us-east-2" });



// a client can be shared by different commands.
// const clientKinesis = new FirehoseClient({ credentials: {accessKeyId: 'AKIAZ2LQ42KQIUGC5K6P', secretAccessKey: "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"}, region: "us-east-2" });

// const params = {

//     DeliveryStreamName: 'discord-events-fh',
//     Record: 'test'
// };
// const command = new PutRecordCommand(params);

// const options = {
//   streamName: process.env.NODE_AWS_STREAM,
//   kinesisClient: null,
//   maxDrains: 3,
//   maxRecords: 1,
//   maxTime: 0,
//   chunkSize: 400,
//   kinesisOptions: {
//       region: 'us-east-2',
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   },
// };

// const kinesisClient = new FirehoseClient({ region: "us-east-2" });


// async function kinesis_pushdata() {

//   const params = {
//       StreamName: process.env.NODE_AWS_STREAM,
//       PartitionKey: '1',
//       Records: [
//       {
//         Data: Buffer.from( JSON.stringify({'testdata': 'test-data'}) ),
//         PartitionKey: '1'
//       }
//       ]
//   };

//   try {
//       const data = await kinesis_client.send(new PutRecordsCommand(params));
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
    
// }

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
  // console.log('New message')
  // console.log(msg.channelId)
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
  // kinesis_pushdata();

  // console.log(messageData)
  // try {
  //   const data = await clientKinesis.send(command);
  //   console.log('data', data)
  // } catch (error) {
  //   console.log('error', error)
  // } finally {
  //   // finally.
  // }

  
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
  // console.log(reaction)
  sendEvent(reactionData)

});

client.login(process.env.TOKEN)


/*

  const guildId = '302942833113825283'
  const guild = client.guilds.cache.get(guildId)
  let commands 

  if (guild){
    commands = guild.commands
  }else{
    commands = client.application?. commands
  }

  commands?.create({
    name: 'ping',
    description: 'Replis with pong'
  })

  commands?.create({
    name: 'add',
    description: 'Adds 2 numbers.',
    options: [
      {
        name: 'num2',
        description: 'The first number',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
      },
      {
        name: 'num3',
        description: 'The second number',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
      }
    ]
  })
})


client.on('interactionCreate', async(interaction) => {
  if (!interaction.isCommand()){
    return
  }

  const {commandName, options} = interaction

  if (commandName === 'ping'){
    interaction.reply({
      content: 'pong',
      ephemeral: true,
    })
  } else if (commandName === 'add'){
    const num1 = options.getNumber('num2')!
    const num2 = options.getNumber('num3')!

    await interaction.deferReply({
      ephemeral:true
    })

    await new Promise(resolve => setTimeout(resolve, 2000))

    interaction.editReply({
      content: `The sum is ${num1 + num2}`,
    })

  }

  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  Message create
Message {
  channelId: '973193082386391040',
  guildId: '302942833113825283',
  id: '974691176663904326',
  createdTimestamp: 1652454885403,
  type: 'DEFAULT',
  system: false,
  content: 'test',
  author: User {
    id: '264573318722617344',
    bot: false,
    system: false,
    flags: UserFlags { bitfield: 0 },
    username: 'PeinateCarlos',
    discriminator: '5614',
    avatar: '232559e4b097f79d86c07edf85ffdb07',
    banner: undefined,
    accentColor: undefined
  },
  pinned: false,
  tts: false,
  nonce: '974691175208321024',
  embeds: [],
  components: [],
  attachments: Collection(0) [Map] {},
  stickers: Collection(0) [Map] {},
  editedTimestamp: null,
  reactions: ReactionManager { message: [Circular *1] },
  mentions: MessageMentions {
    everyone: false,
    users: Collection(0) [Map] {},
    roles: Collection(0) [Map] {},
    _members: null,
    _channels: null,
    crosspostedChannels: Collection(0) [Map] {},
    repliedUser: null
  },
  webhookId: null,
  groupActivityApplication: null,
  applicationId: null,
  activity: null,
  flags: MessageFlags { bitfield: 0 },
  reference: null,
  interaction: null
}  
  
  
  
  
  */


  

