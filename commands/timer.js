const { getEmbed } = require('./helpers/formatHelper')
const TimerModel = require('../models/TimerModel');

let startTime;
let duration;

const time = {
	name: "time",
	desc: "Displays the current timer duration",
	execute(msg, args) {
		if (!startTime) {
			msg.channel.send('There is no timer running');
			return;
		}

		let currentDuration = Math.round((Date.now() - startTime)/1000);
		msg.channel.send(`The current timer is at ${currentDuration}s`);
	}
}

const start = {
	name: "start",
	desc: "Starts a timer to track Wing Ning's performance",
	execute(msg, args) {
		startTime = Date.now();
		msg.channel.send('Timer started.');
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
		if (!duration) {
			msg.channel.send('There is no duration to save.');
			return;
		}

		if (args.length === 0) {
			msg.channel.send('You must specify a title');
			return;
		}

		let title = args.join(' ');
		TimerModel.create({ title, duration })
			.then(timer => {
				duration = undefined;
				msg.channel.send('Timer saved');
			})
			.catch(err => {
				console.log(err);
				msg.channel.send('Unable to save timer. Try again.');
			})
	}
}

const list = {
	name: "list",
	desc: "Lists all saved Wingus timers",
	execute(msg, args) {
		TimerModel.findAll()
			.then(timers => {
				let listEmbed = getEmbed().setTitle('Wing Ning\'s Stats');

				if (timers.length === 0) {
					listEmbed.setDescription('No timer stats yet.');
				} else {
					timers.forEach(timer => {
						listEmbed.addField('#' + timer.id, `${timer.title}\n**${timer.duration}s**`);
					});
				}

				msg.channel.send(listEmbed);
			})
			.catch(err => {
				msg.channel.send('Error fetching saved timers. Try Again.');
			});
	}
}

const del = {
	name: "delete",
	desc: "Deletes a saved Wingus timer with the specified ID",
	execute(msg, args) {
		if (args.length === 0) {
			msg.channel.send('You must specify a timer\'s ID');
			return;
		}

		let id = args[0];
		TimerModel.destroy({
			where: {
				id,
			}
		}).then(num => {
			if (num === 0){
				msg.channel.send('No timers what that ID found');
			} else {
				msg.channel.send(`Deleted timer #${id}`);
			}
		})
	}
}

module.exports = {
	time,
	start,
	stop,
	save,
	list,
	del,
}
