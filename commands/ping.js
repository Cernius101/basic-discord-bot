module.exports = {
    name: 'ping',
    description: "this is a ping command, pretty useless imo",
    execute(msg, args){
        msg.channel.send('pong!');
    }
}