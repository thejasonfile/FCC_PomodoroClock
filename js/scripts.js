var pomLength = document.getElementById('pomodoro_length_input');
var shortBreakLength = document.getElementById('short_break_length');
var longBreakLength = document.getElementById('long_break_length');
var numPoms = document.getElementById('num_of_pomodoros');

var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');

var currentPhaseName = document.getElementById('phase_name');
var currentPhaseTime = document.getElementById('pomodoro_time');

//create initial pomodoro object
var pomodoro_obj = {}

//create clock object
var clock = $('#pomodoro_time').FlipClock({
	autoStart: false,
	countdown: true,
	clockFace: 'MinuteCounter',
	callbacks: {
			stop: function() {
				console.log('clock has stopped!');
			},

			start: function() {
				console.log('clock has started!');
			},

			interval: function() {
				console.log('tick...');
			}
	}
});

var setObjValues = function() {
	console.log('set pomodoro object values...');
	//take values from input fields and add them to object
	pomodoro_obj.running = true;
	pomodoro_obj.currentPhase = 0;
	pomodoro_obj.length = pomLength.value;
	pomodoro_obj.sbreak = shortBreakLength.value;
	pomodoro_obj.lbreak = longBreakLength.value;
	pomodoro_obj.numPoms = numPoms.value;
	//set phaseArray
	setPhaseArray(pomodoro_obj.numPoms);
	//start the next phase
	startPhase();
}

var setPhaseArray = function(numPoms) {
	console.log('setting phase array...')
	pomodoro_obj.phaseArray = [];
	pomodoro_obj.phaseArray.push('Pomodoro');
	for (var i = 1; i < numPoms; i++) {
		pomodoro_obj.phaseArray.push('Short Break');
		pomodoro_obj.phaseArray.push('Pomodoro');
	}
	pomodoro_obj.phaseArray.push('Long Break');
}

var startPhase = function() {
	//set phase variables
	pomodoro_obj.running = true;
	var minutes = 0;
	var seconds = 0;
	var timeString = '';
	currentPhaseName.innerHTML = pomodoro_obj.phaseArray[pomodoro_obj.currentPhase];
	switch (pomodoro_obj.phaseArray[pomodoro_obj.currentPhase]) {
		case 'Short Break':
			//currentPhaseTime.innerHTML = parseInt(pomodoro_obj.sbreak);
			minutes = (parseInt(shortBreakLength.value));
			seconds = 60;
			break;
		case 'Long Break':
			minutes = (parseInt(longBreakLength.value));
			seconds = 60;
			break;
		default:
			//currentPhaseTime.innerHTML = parseInt(pomodoro_obj.length);
			minutes = (parseInt(pomLength.value));
			seconds = 60;
	}
	startClock(minutes);
}

var startClock = function(minutes) {
	clock.setTime(minutes * 60);
	clock.start();
	//checkTime();
}

var stopClock = function() {
	clock.stop();
}

// var checkTime = function() {
// 	var tick = setInterval(function() {
// 		var currentTime = clock.getTime().time;
// 		console.log('current time = ' + currentTime)
// 		if (currentTime == 0) {
// 		//alert('time is up!')
// 		console.log('interval cleared...');
// 		clearInterval(tick);
// 		} else {
// 			//console.log('ticking...')
// 		}
// 	}, 1000)
// }

// var countdown = function(minutes) {
// 	seconds = 60;
// 		setInterval(function() {
// 			var time = minutes + ":" + seconds;
// 			if (minutes > 0 || seconds > 0) {
// 				if (seconds > 0) {
// 					seconds -= 1;
// 					if (seconds < 10) {
// 						seconds = '0' + seconds;
// 					}
// 					time = minutes + ":" + seconds;
// 					currentPhaseTime.innerHTML = time;
// 				}
// 				else {
// 					minutes -= 1;
// 					if (minutes < 10) {
// 						minutes = '0' + minutes;
// 					}
// 					currentPhaseTime.innerHTML = time;
// 					seconds = 60;
// 				}
// 			} else {
// 				clearInterval(countdown);
// 				console.log('time is up...');
// 			}
// 		}, 1000);
// }

// var stopPom = function() {
// 	pomodoro_obj.running = false;
// 	clearInterval(countdown);
// 	currentPhaseName.innerHTML = '';
// 	currentPhaseTime.innerHTML = '';
// }

//set event handlers
startButton.addEventListener('click', setObjValues);
stopButton.addEventListener('click', stopClock);