module.exports = {
    name: 'leave',
    description: "a command for the bot to leave",
    async execute(msg, args){
        const voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.channel.send('You need to be in a voice channel to stop the music!');
        }

        await voiceChannel.leave();
        await msg.channel.send('See you next time! :smile:');
    }
}