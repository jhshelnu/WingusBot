const { table, getBorderCharacters } = require('table');

const codeFormat = str => {
	return "```\n" + str + "\n```";
}

const tableFormat = (arr, options) => {
	return table(arr, {
		border: getBorderCharacters('norc'),
		...options,
	});
}

module.exports = {
	codeFormat,
	tableFormat,
}