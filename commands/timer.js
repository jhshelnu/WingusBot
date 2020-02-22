const { codeFormat, tableFormat } = require('./helpers/formatHelper.js');

let startTime;
let duration;
let savedTimes = [];

const start = {
	name: "start",
	desc: "Starts a timer to track Wing Ning's performance",
	execute(msg, args) {
		startTime = Date.now();
		msg.channel.send('Timer started.')
	}
}

const stop = {
	name: "stop",
	desc: "Stops the current timer tracking Wing Ning's performance",
	execute(msg, args) {
		if (!startTime) {
			msg.channel.send('The timer was not started.');
			return;
		}

		duration = Math.round((Date.now() - startTime)/1000);
		msg.channel.send(`Wingus took ${duration} seconds.`);
		startTime = undefined; // reset the startTime variable afterwards
	}
}

const save = {
	name: "save",
	desc: "Saves the last timer duration",
	execute(msg, args) {
		// Check if there is an existing duration to save
		if (!duration) {
			msg.channel.send('There is no duration to save.');
			return;
		}

		// Check if a title has been provided
		if (args.length === 0) {
			msg.channel.send('You must specify a title');
			return;
		}

		// Add saved timer object to array
		let title = args.join(' ');
		savedTimes.push({
			title,
			duration,
		});

		// Reset the duration variable
		duration = undefined;

		// Notify user
		msg.channel.send('Timer saved.');
	}
}

const list = {
	name: "list",
	desc: "Lists all saved Wingus timers",
	execute(msg, args) {
		if (savedTimes.length === 0) {
			msg.channel.send('There are no saved Wingus timers.');
			return;
		}

		savedTimesResponse = tableFormat(
			savedTimes.map(timer => [timer.title, timer.duration + 's']), {
				columns: {
					0: {
						width: 50,
						wrapWord: true
					},
					1: {
						width: 6
					} 
				}
			}
		);

		msg.channel.send(codeFormat(savedTimesResponse));
	}
}

module.exports = {
	start,
	stop,
	save,
	list,
}
