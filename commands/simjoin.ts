import { ICommand } from 'wokcommands';
export default{
  category: 'Testing',
  description: 'Simulates a join',

  slash: 'both',

  callback: ({member,client}) => {
    client.emit('guildMemberAdd',member)
    return 'Join stimulated'
  }

} as ICommand