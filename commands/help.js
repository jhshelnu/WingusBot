const { codeFormat, tableFormat } = require('./helpers/formatHelper.js');
const { prefix } = require('../config.json');

const help = {
	name: "help",
	desc: "Displays this list of commands",
	execute(msg, args) {
		// Send joke response
		msg.channel.send("http://www.cplusplus.com/reference/cstring/strtok/");

		// Send real response after brief timeout
		setTimeout(() => {
			let commandsList = msg.client.commands.map(command =>
				[prefix + command.name, command.desc]
			);

			commandsTable = tableFormat(commandsList, {
				columns: {
					0: {
						width: 6
					},
					1: {
						width: 50,
						wrapWord: true
					} 
				}
			})
			msg.channel.send(codeFormat(commandsTable));
		}, 2000);
	}
}

module.exports = {
	help
}