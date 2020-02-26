require('dotenv').config();
const fs = require('fs');
const { prefix } = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.passives = [];

// Dynamically load all command callbacks in the commands directory.
fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const commandModule = require(`./commands/${file}`);
		Object.values(commandModule).forEach(command => {
			client.commands.set(command.name, command);
		});
	});

// Dynamically load all passive callbacks in passives directory
fs.readdirSync('./passives')
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const passiveModule = require(`./passives/${file}`);
		Object.values(passiveModule).forEach(passive => {
			client.passives.push(passive);
		})
	})

client.on('message', msg => {
	if (msg.author.bot) return;

	// Pass all non-commands to passive callbacks
	if (!msg.content.startsWith(prefix)) {
		client.passives.forEach(passive => {
			passive(msg);
		});
		return;
	}

	const args = msg.content.slice(prefix.length).split(/ +/);
	const command = client.commands.get(args.shift().toLowerCase());
	if (command) {
		command.execute(msg, args);
	}

});

client.login(process.env.TOKEN);
