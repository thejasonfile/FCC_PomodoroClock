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
			interval: function() {
				var currentTime = (clock.getTime().time);
				//when clock reaches zero
				if (currentTime === 0) {
					//what happens when end of phase array is reached
					if (pomodoro_obj.arrayIndex === pomodoro_obj.phaseArray.length - 1) {
						pomodoro_obj.arrayIndex = 0;
					} else {
						pomodoro_obj.arrayIndex += 1;						
					}
					//if the previous phase was a Pomodoro, increase streak count
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
	//check input fields for values
	if (pomLength.value === '0') {
		alert('wrong!');
	} else {
		//if no long break value is zero, then number of Poms until long break should also be zero
		if (longBreakLength.value === '0') {
			numPoms.value = 0;
		} 
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
}

var setPhaseArray = function(numPoms) {
	//always start with one Pomodoro phase
	pomodoro_obj.phaseArray.push('Pomodoro');
	//loop through adding additional phases to the array
	for (var i = 1; i < numPoms; i++) {
		//if Short Break is zero, just add Pomodoro phases, otherwise add both
		if (shortBreakLength.value === '0') {
			pomodoro_obj.phaseArray.push('Pomodoro');
		} else {
			pomodoro_obj.phaseArray.push('Short Break');
			pomodoro_obj.phaseArray.push('Pomodoro');
		}
	}
	// if Long Break is zero, don't add it
	if (longBreakLength.value !== '0') {
		pomodoro_obj.phaseArray.push('Long Break');
	}
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