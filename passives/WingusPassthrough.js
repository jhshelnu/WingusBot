const { passthroughUser, passthroughChannel } = require('../config.json');

const passthrough = msg => {
	if (msg.channel.type == 'dm' && msg.author.tag === passthroughUser) {
		let channel = msg.client.channels.find(channel => channel.name === passthroughChannel);
		channel.send(msg.content);
	}
}

module.exports = {
	passthrough
}