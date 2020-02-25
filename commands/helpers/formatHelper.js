const Discord = require('discord.js');
const { wingusColor } = require('../../config.json');

const getEmbed = () => {
	return new Discord.RichEmbed().setColor(wingusColor);
}

module.exports = {
	getEmbed,
}