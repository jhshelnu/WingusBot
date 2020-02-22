const getRandomGrade = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const grade = {
	name: "grade",
	desc: "Receive a random grade from Wing Ning",
	execute(msg, args) {
		msg.channel.send(`I've just given you a ${getRandomGrade(0, 80)}%`);
	}
}

module.exports = {
	grade
}