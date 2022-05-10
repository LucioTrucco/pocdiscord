import DiscordJS, {Intents} from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
dotenv.config()


const client = new DiscordJS.Client({
  // What the bot intents to use and what info it needs
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
})

client.on('ready', () => {
  console.log('Bot is ready')
  new WOKCommands(client,{
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    typeScript: true,
    testServers: ['302942833113825283']
  })
})



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

  */