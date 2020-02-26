const { wingusTerms, wingusEmoji } = require('../config.json');
const Sentiment = require('sentiment');
let sentiment = new Sentiment();

const emojiResponder = msg => {
	let msgText = msg.content.toLowerCase();
		
	if (wingusTerms.some(wingusTerm => msgText.includes(wingusTerm))) {
		if (sentiment.analyze(msgText).score < 0) {
			msg.channel.send(wingusEmoji);
		}
	}
}

module.exports = {
	emojiResponder,
}