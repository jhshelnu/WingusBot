const { getEmbed } = require('./helpers/formatHelper');
const { prefix } = require('../config.json');

const help = {
	name: "help",
	desc: "Displays this list of commands",
	execute(msg, args) {
		msg.channel.send("http://www.cplusplus.com/reference/cstring/strtok/");
		setTimeout(() => {
			const helpEmbed = getEmbed();

			msg.client.commands.forEach(command => {
				helpEmbed.addField(prefix + command.name, command.desc);
			});

			msg.channel.send(helpEmbed);
		}, 2000);
	}
}

module.exports = {
	help
}