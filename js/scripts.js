var pomLength = document.getElementById('pomodoro_length_input');
var shortBreakLength = document.getElementById('short_break_length');
var longBreakLength = document.getElementById('long_break_length');
var numPoms = document.getElementById('num_of_pomodoros');

var startButton = document.getElementById('start');
var pauseButton = document.getElementById('pause');
var stopButton = document.getElementById('stop');
var skipButton = document.getElementById('skip');

var currentPhaseName = document.getElementById('phase_name');
var currentPhaseTime = document.getElementById('pomodoro_time');

//create initial pomodoro object
var pomodoro_obj = {}

var setObjValues = function() {
	console.log('set pomodoro object values...');
	//take values from input fields and add them to object
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
	for (var i = 0; i < numPoms; i++) {
		pomodoro_obj.phaseArray.push('Short Break');
		pomodoro_obj.phaseArray.push('Pomodoro');
	}
	pomodoro_obj.phaseArray.push('Long Break');
}

var startPhase = function() {
	//set phase variables
	currentPhaseName.innerHTML = pomodoro_obj.phaseArray[pomodoro_obj.currentPhase];
	switch (pomodoro_obj.phaseArray[pomodoro_obj.currentPhase]) {
		case 'Short Break':
			currentPhaseTime.innerHTML = parseInt(pomodoro_obj.sbreak);
			break;
		case 'Long Break':
			currentPhaseTime.innerHTML = parseInt(pomodoro_obj.lbreak);
			break;
		default:
			currentPhaseTime.innerHTML = parseInt(pomodoro_obj.length);
	}

	minutes = pomodoro_obj.length;
	seconds = 0;
	var countdown = setInterval(function() {
		timeString = minutes + ':' + seconds;
		if (minutes > 0 || seconds > 0) {
			if (seconds == 0) {
				seconds = 60;
				minutes -= 1;
				timeString = minutes + ':' + seconds;
				currentPhaseTime.innerHTML = timeString;
			} 
			seconds -= 1;
			timeString = minutes + ':' + seconds;
			currentPhaseTime.innerHTML = timeString;
		} else {
			clearInterval(countdown);
			alert('pomodoro is over!');
		}
	}, 1000)
}

var nextPhase = function() {
	//increment phase number
	pomodoro_obj.currentPhase += 1;
	if (pomodoro_obj.currentPhase < (pomodoro_obj.phaseArray).length) {
		//start phase
		startPhase();
	} else {
		alert('pomodoro over...');
	}
	
}

//set event handlers
startButton.addEventListener('click', setObjValues);
//pauseButton.addEventListener('click', pausePom);
//stopButton.addEventListener('click', stopPom);
skipButton.addEventListener('click', nextPhase);