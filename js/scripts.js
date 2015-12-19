var pomLength = document.getElementById('pomodoro_length_input');
var shortBreakLength = document.getElementById('short_break_length');
var longBreakLength = document.getElementById('long_break_length');
var numPoms = document.getElementById('num_of_pomodoros');

var startButton = document.getElementById('start');
var pauseButton = document.getElementById('pause');
var clearButton = document.getElementById('clear');

var currentPomTime = document.getElementById('pomodoro_time')

//create initial pomodoro object
var pomodoro_obj = {
	length: 25,
	sbreak: 5,
	lbreak: 30,
	numPoms: 4
}

var setPomValues = function() {
	console.log('start pomodoro...');
	//take values from input fields
	pomodoro_obj.length = pomLength.value;
	pomodoro_obj.sbreak = shortBreakLength.value;
	pomodoro_obj.lbreak = longBreakLength.value;
	pomodoro_obj.numPoms = numPoms.value;
	//set HTML on divs
	currentPomTime.innerHTML = pomodoro_obj.length;
	//start the pomodoro
	startPom();
}

var startPom = function() {
	console.log('start pomodoro...');
	//start countdown

	//input fields become labels
	
}

var pausePom = function() {
	//pause countdown
	console.log('pause countdown...')
}

var clearPom = function() {
	console.log('clear countdown...');
	var pomItems = document.getElementById('pomodoro_items');
	//stop countdown

	//clear countdown
	currentPomTime.innerHTML = '';
	//clear object values
	for (var key in pomodoro_obj) {
		pomodoro_obj[key] = 0;
	}
	//clear input values
	for (var i = 0; i < pomItems.children.length; i++) {
		pomItems.children[i].querySelector('input[type=text]').value = '';
	}
}

//set event handlers
startButton.addEventListener('click', setPomValues);
pauseButton.addEventListener('click', pausePom);
clearButton.addEventListener('click', clearPom);
