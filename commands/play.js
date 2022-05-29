const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: "a command to start playing a song",
    async execute(msg, args){
        const voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.channel.send('You need to be in a voice channel to execute this command!');
        }

        const permissions = voiceChannel.permissionsFor(msg.client.user);

        if (!permissions.has('CONNECT')) {
            return msg.channel.send('You dont have permission to use this command!');
        }

        if (!permissions.has('SPEAK')) {
            return msg.channel.send('You dont have permission to use this command!');
        }

        if (!args.length) {
            return msg.channel.send('You need to send the second argument!');
        }

        /*===============================================================================================*/
       
        //function to play music using URLs
        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }

        //statement to check if we entered a correct URL
        if (validURL(args[0])) {  
            const connection = await voiceChannel.join();
            const stream = ytdl(args[0], {filter: 'audioonly'});

            connection.play(stream, {seek: 0, volume: 1})
                .on('finish', () =>{
                voiceChannel.leave();
                msg.channel.send('See you next time! :smile:');
            });

            await msg.reply(`:thumbsup: Now playing ***Your Link!***`);
            return;
        }

        /*===============================================================================================*/

        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
                .on('finish', () =>{
                voiceChannel.leave();
            });

            await msg.reply(`:thumbsup: Now playing ***${video.title}***`);
        }

        else{
            msg.channel.send('No results have been found for your search :pensive:');
        }

    }
}