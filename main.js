const Discord = require('discord.js');

const client = new Discord.Client({ 
    intents: ["GUILDS", "GUILD_MESSAGES"] 
});

const prefix = '!'; //command syntax

const fs = require('fs');

client.command = new Discord.Collection();

//search for .js files only
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); 

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.command.set(command.name, command);
}



client.once('ready', () => {
    console.log('Hello, World! Reddie is ready for you!');
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    const args = msg.content.slice(prefix.length).split(/ +/); //used to use space in the commands
    const command = args.shift().toLowerCase(); //converts uppercase text to lowercase

    if(command === 'ping'){
        client.command.get('ping').execute(msg, args);
    }

    else if(command === 'hug'){
        client.command.get('hug').execute(msg, args);
    }

    else if (command === 'smile') {
        client.command.get('smile').execute(msg, args);
    }

    else if (command === 'rekt') {
        client.command.get('rekt').execute(msg, args);
    }

    else if(command === 'play'){
        client.command.get('play').execute(msg, args);
    }

    else if(command === 'leave'){
        client.command.get('leave').execute(msg, args);
    }

});

client.login('OTgwNDAxMTIzMDc4ODU2ODA0.GD5d2u.lYH3iBMaIFAzZQDP5lAbbcsziWOL9-Q49VMlLI');