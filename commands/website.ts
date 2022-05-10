import { ButtonInteraction, Interaction, MessageActionRow, MessageButton, MessageComponentInteraction } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Testing',

  slash: true,
  
  callback: async({interaction: msgInt, channel}) => {
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('ban_yes')
      .setEmoji('🤞')
      .setLabel('Confirm')
      .setStyle('SUCCESS')
    )
    .addComponents(
      new MessageButton()
      .setCustomId('ban_no')
      .setLabel('Cancel')
      .setStyle('DANGER')
    )

    const linkRow = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setURL('https://modak.live')
      .setLabel('Visit modak')
      .setStyle('LINK')
    )

    await msgInt.reply({
      content: 'Visit our website!',
      components: [/*row, */ linkRow],
      // ephemeral: true, // To only show it to me
    })

    const filter = (btnInt: Interaction) => {
      return msgInt.user.id === btnInt.user.id
    }

    const collector = channel.createMessageComponentCollector({
      filter,
      max: 1,
      // time: 1000 * 15
    })

    collector.on('collect', (i: MessageComponentInteraction) => {
      i.reply({
        ephemeral: true,
        content: 'You clicked a button'
      })
    })

    collector.on('end', async (collectedItems) => {
      collectedItems.forEach((click) => {
        console.log(click.user.id, click.customId)
      })

      if (collectedItems.first()?.customId === 'ban_yes'){
        // Ban the target user logic
      }

      //collectedItems.first(5)

      await msgInt.editReply({
        content: 'An action has already been taken.',
        components: []
      })
    })

  }

} as ICommand