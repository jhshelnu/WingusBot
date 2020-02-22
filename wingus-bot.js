require('dotenv').config();
const fs = require('fs');
const { prefix } = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Dynamically load all command callbacks in the commands directory.
fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const commandModule = require(`./commands/${file}`);
		for (const command in commandModule) {
			client.commands.set(commandModule[command].name, commandModule[command]);
		}
	});

client.on('message', msg => {
	// Ignore non-commands and bot messages
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	// Extract command name and arguments
	const args = msg.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// Check if command is supported
	if (!client.commands.has(command)) return;

	// If so, execute the command
	client.commands.get(command).execute(msg, args);
});

client.login(process.env.TOKEN);