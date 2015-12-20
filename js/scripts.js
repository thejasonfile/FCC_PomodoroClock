var pomLength = document.getElementById('pomodoro_length_input');
var shortBreakLength = document.getElementById('short_break_length');
var longBreakLength = document.getElementById('long_break_length');
var numPoms = document.getElementById('num_of_pomodoros');

var startButton = document.getElementById('start');
var pauseButton = document.getElementById('pause');
var clearButton = document.getElementById('clear');
var skipButton = document.getElementById('skip');

var currentPomTime = document.getElementById('pomodoro_time')

//create initial pomodoro object
var pomodoro_obj = {}

var setPomValues = function() {
	console.log('start pomodoro...');
	//take values from input fields and add them to object
	pomodoro_obj.length = pomLength.value;
	pomodoro_obj.sbreak = shortBreakLength.value;
	pomodoro_obj.lbreak = longBreakLength.value;
	pomodoro_obj.currentPhase = 0;
	pomodoro_obj.numPoms = numPoms.value;
	//set phaseArray
	setPhaseArray(pomodoro_obj.numPoms);
	//set HTML on divs
	currentPomTime.innerHTML = pomodoro_obj.length;

	//input fields become labels

	//start the pomodoro
	getCurrentPhase();
}

var setPhaseArray = function(numPoms) {
	console.log('setting phase array...')
	pomodoro_obj.phaseArray = [];
	pomodoro_obj.phaseArray.push('pomodoro');
	for (var i = 0; i < numPoms; i++) {
		pomodoro_obj.phaseArray.push('sbreak' + i);
		pomodoro_obj.phaseArray.push('pomodoro');
	}
	pomodoro_obj.phaseArray.push('lbreak');
}

var getCurrentPhase = function(phaseName) {
	console.log('get current phase...');
	//get current phase and time
	var phaseName = pomodoro_obj.phaseArray[pomodoro_obj.currentPhase];
	var phaseMin = '';
	var phaseSec = 0;
	switch(phaseName) {
		case 'sbreak':
			phaseMin = pomodoro_obj.sbreak;
			break;
		case 'lbreak':
			phaseMin = pomodoro_obj.lbreak;
			break;
		default:
			phaseMin = pomodoro_obj.length;
	}
	currentPomTime.innerHTML = phaseMin + ':' + ("0" + phaseSec);
	startPhase(pomLength.value);
}

var startPhase = function() {
	console.log('start phase...');
	//start countdown
		//while time > 0
			//decrease number by 1 every 1 second
		//until time = 0
			//move on to next phase

	//when current phase finishes
		//increase phase number by 1
		//start phase
}

var skipPhase = function() {
	//skip current phase
	console.log('skip current phase...')
	//increase phase number by 1
	//get current phase information
	}

var pausePom = function() {
	//pause countdown
	console.log('pause countdown...')
}

var clearPom = function() {
	console.log('clear countdown...');
	var pomItems = document.getElementById('pomodoro_items');
	//stop countdown

	//clear timers
	currentPomTime.innerHTML = '';
	//reset object values
	for (var key in pomodoro_obj) {
		pomodoro_obj[key] = 0;
	}
	pomodoro_obj.phaseArray = [];
	//clear input values
	for (var i = 0; i < pomItems.children.length; i++) {
		pomItems.children[i].querySelector('input[type=text]').value = '';
	}
}

//set event handlers
startButton.addEventListener('click', setPomValues);
pauseButton.addEventListener('click', pausePom);
clearButton.addEventListener('click', clearPom);
skipButton.addEventListener('click', skipPhase);