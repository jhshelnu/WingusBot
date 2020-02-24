require('dotenv').config();
const fs = require('fs');
const Sentiment = require('sentiment');
const { prefix, wingusTerms, wingusEmoji } = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
let sentiment = new Sentiment();

// Dynamically load all command callbacks in the commands directory.
fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const commandModule = require(`./commands/${file}`);
		Object.values(commandModule).forEach(command => {
			client.commands.set(command.name, command);
		});
	});

client.on('message', msg => {
	// Ignore bot messages
	if (msg.author.bot) return;

	// Handle special messages that aren't commands
	if (!msg.content.startsWith(prefix)) {

		// If the message contains any of the Wingus terms
		let msgText = msg.content.toLowerCase();
		
		if (wingusTerms.some(wingusTerm => msgText.includes(wingusTerm))) {
			if (sentiment.analyze(msgText).score < 0) {
				msg.channel.send(wingusEmoji);
			}
		}

		return;
	}

	// Extract command name and arguments
	const args = msg.content.slice(prefix.length).split(/ +/);
	const command = client.commands.get(args.shift().toLowerCase());

	if (command) {
		command.execute(msg, args);
	}

});

client.login(process.env.TOKEN);
