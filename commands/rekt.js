module.exports = {
    name: 'rekt',
    description: "deletes a message and sends another one",
    execute(msg, args){
        msg.delete();
        msg.channel.send('get rekt lol');
    }
}