var pomLength = document.getElementById('pomodoro_length_input');
var shortBreakLength = document.getElementById('short_break_length');
var longBreakLength = document.getElementById('long_break_length');
var numPoms = document.getElementById('num_of_pomodoros');

var startButton = document.getElementById('start');
var resetButton = document.getElementById('reset');
var nextButton = document.getElementById('next');

var currentPhaseName = document.getElementById('phase_name');
var currentPhaseTime = document.getElementById('pomodoro_time');
var currentStreak = document.getElementById('streak');

//create initial pomodoro object
var pomodoro_obj = {}

//create clock object
var clock = $('#pomodoro_time').FlipClock({
	autoStart: false,
	countdown: true,
	clockFace: 'MinuteCounter',
	callbacks: {
			stop: function() {
			},

			start: function() {
			},

			interval: function() {
				var currentTime = (clock.getTime().time);
				if (currentTime === 0) {
					pomodoro_obj.arrayIndex += 1;
					if (currentPhaseName.innerHTML === "Pomodoro") {
						pomodoro_obj.currentStreak += 1;
					}
					//add button to advance to next phase
					nextButton.classList.remove('hidden');
				}
			},

			reset: function() {
				pomodoro_obj.arrayIndex = 0;
				pomodoro_obj.currentStreak = 0;
				currentStreak.innerHTML = 0;
				currentPhaseName.innerHTML = '';
			}
	}
});

var setObjValues = function() {
	//take values from input fields and add them to object
	pomodoro_obj.running = true;
	pomodoro_obj.phaseArray = [];
	pomodoro_obj.arrayIndex = 0;
	pomodoro_obj.currentStreak = 0;
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
	pomodoro_obj.phaseArray.push('Pomodoro');
	for (var i = 1; i < numPoms; i++) {
		pomodoro_obj.phaseArray.push('Short Break');
		pomodoro_obj.phaseArray.push('Pomodoro');
	}
	pomodoro_obj.phaseArray.push('Long Break');
}

var startPhase = function() {
	//hide nextButton
	nextButton.classList.add('hidden');
	//set phase variables
	pomodoro_obj.running = true;
	var minutes = 0;
	currentPhaseName.innerHTML = pomodoro_obj.phaseArray[pomodoro_obj.arrayIndex];
	currentStreak.innerHTML = pomodoro_obj.currentStreak;
	switch (pomodoro_obj.phaseArray[pomodoro_obj.arrayIndex]) {
		case 'Short Break':
			//currentPhaseTime.innerHTML = parseInt(pomodoro_obj.sbreak);
			minutes = (parseInt(shortBreakLength.value));
			break;
		case 'Long Break':
			minutes = (parseInt(longBreakLength.value));
			break;
		default:
			//currentPhaseTime.innerHTML = parseInt(pomodoro_obj.length);
			minutes = (parseInt(pomLength.value));
	}
	startClock(minutes);
}

var startClock = function(minutes) {
	clock.setTime(minutes * 60);
	clock.start();
}

var endPom = function() {
	clock.reset();
}

//set event handlers
startButton.addEventListener('click', setObjValues);
resetButton.addEventListener('click', endPom);
nextButton.addEventListener('click', startPhase);