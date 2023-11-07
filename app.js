const channel = "strylander";
const countElement = document.getElementById("count");
const gauge = document.querySelector(".gaugeBar");
const emoteImg = document.getElementById("emote");
const emoteMap = new Map([
	["Angry", "Angry.png"],
	["angy", "angy.png"],
	["FRICK", "FRICK.png"],
	["MadgeBackhand", "MadgeBackhand.png"],
	["Madgeclap", "Madgeclap.png"],
	["Madgeknife", "Madgeknife.png"],
	["Madge", "Madge.png"],
	["peepoPISSED", "peepoPISSED.png"],
	["peepoSlam", "peepoSlam.png"],
	["peepoYelling", "peepoYelling.png"],
	["PepeSpit", "PepeSpit.png"],
	["PepeStabby", "PepeStabby.png"],
	["RAGEY", "RAGEY.png"],
	["sippmajj", "sippmajj.png"],
	["majj", "majj.png"],
	["UltraMad", "UltraMad.png"],
	["ReallyMad", "ReallyMad.png"],
]);
var step = 0,
	count = 0,
	res;

var timer = setInterval(loop, 100);

function loop() {
	if (countElement.textContent >= 0) {
		count = countElement.textContent - 0.1;
		countElement.textContent = count;
		if (count < 0) {
			count = 0;
		} else if (count < 25) {
			gauge.style.backgroundColor = "#FA233E";
		} else if (count <= 50) {
			gauge.style.backgroundColor = "#FFA15C";
		} else if (count < 75) {
			gauge.style.backgroundColor = "#F5EB67";
		} else {
			gauge.style.backgroundColor = "#44D492";
		}
		gauge.style.transform = `rotate(${count / 2 / 100}turn)`;
		gauge.style.transition = `transform 0.2s ease-in-out`;
	}
}

function stopLoop() {
	clearInterval(timer);
}

function counter() {
	step--;
}

const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true,
	},
	channels: [channel],
});
window.onload = () => {
	client.connect().then(() => {
		console.log(`Listening for messages in ${channel}...`);
	});

	client.on("message", (channel, tags, message, self) => {
		for (const [keyword, emoteFileName] of emoteMap) {
			if (message.includes(keyword)) {
				const emotePath = emoteFileName
					? `./img/${emoteFileName}`
					: null;

				if (emotePath && !emoteImg.src.includes(emotePath)) {
					emoteImg.src = emotePath;
					emoteImg.classList.remove("swing-in-top-fwd");
					emoteImg.offsetWidth;
					emoteImg.classList.add("swing-in-top-fwd");
					count = parseInt(countElement.textContent) + 20;
					if (count > 100) {
						emoteImg.classList.remove("vibrate-1");
						emoteImg.classList.remove("swing-in-top-fwd");
						emoteImg.offsetWidth;
						emoteImg.classList.add("vibrate-1");
						count = 0;
					}
				}

				break; // Stop checking once a matching keyword is found
			}
		}

		countElement.innerHTML = count;
		gauge.style.transform = `rotate(${count / 2 / 100}turn)`;
		gauge.style.transition = `transform 0.2s ease-in-out`;
	}); //count number of emotes then
};

loop();
