module.exports = {
    name: 'smile',
    description: "reacts to your message with an emoji",
    execute(msg, args){
        msg.react('😄');
    }
}