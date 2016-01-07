var pomLength = document.getElementById('pomodoro_length_input');
var shortBreakLength = document.getElementById('short_break_length');
var longBreakLength = document.getElementById('long_break_length');
var numPoms = document.getElementById('num_of_pomodoros');

var startButton = document.getElementById('start');
var resetButton = document.getElementById('reset');
var nextButton = document.getElementById('next');

var currentStageName = document.getElementById('stage_name');
var currentStageTime = document.getElementById('pomodoro_time');
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
				if (!currentTime) {
					//what happens when end of stage array is reached
					if (pomodoro_obj.arrayIndex === pomodoro_obj.stageArray.length - 1) {
						pomodoro_obj.arrayIndex = 0;
					} else {
						pomodoro_obj.arrayIndex += 1;						
					}
					//if the previous stage was a Pomodoro, increase streak count
					if (currentStageName.innerHTML === "Pomodoro") {
						pomodoro_obj.currentStreak += 1;
					}
					//add button to advance to next stage
					nextButton.classList.remove('hidden');
				}
			},

			reset: function() {
				pomodoro_obj.arrayIndex = 0;
				pomodoro_obj.currentStreak = 0;
				currentStreak.innerHTML = 0;
				currentStageName.innerHTML = 'Pomodoro';
			}
	}
});

var setObjValues = function() {
	//confirm PomLength field has a valid value
	if (!parseInt(pomLength.value)) {
		alert('wrong!');
	} else {
		//if longBreakLength is invalid , then numPoms should be zero
		if (!parseInt(longBreakLength.value )) {
			numPoms.value = 0;
		} 
		//take values from input fields and add them to object
		pomodoro_obj.stageArray = [];
		pomodoro_obj.arrayIndex = 0;
		pomodoro_obj.currentStreak = 0;
		pomodoro_obj.length = pomLength.value;
		pomodoro_obj.sbreak = parseInt(shortBreakLength.value);
		pomodoro_obj.lbreak = parseInt(longBreakLength.value);
		pomodoro_obj.numPoms = parseInt(numPoms.value);
		//set stageArray
		setStageArray(pomodoro_obj.sbreak, pomodoro_obj.lbreak, pomodoro_obj.numPoms);
		//start the next stage
		startStage();
	}
}

var setStageArray = function(shortBreakLength, longBreakLength, numPoms) {
	//always add a Pomodoro stage
	pomodoro_obj.stageArray.push('Pomodoro');
	if (shortBreakLength && longBreakLength) {
		for (var i = 1; i < numPoms; i++) {
			pomodoro_obj.stageArray.push('Short Break');
			pomodoro_obj.stageArray.push('Pomodoro');
		}
		pomodoro_obj.stageArray.push('Long Break');
	} 

	else {
		if (!longBreakLength && shortBreakLength) {
			pomodoro_obj.stageArray.push('Short Break');
		}
		else if (!shortBreakLength && longBreakLength) {
			for (var i = 1; i < numPoms; i++) {
			pomodoro_obj.stageArray.push('Pomodoro');
			}
			pomodoro_obj.stageArray.push('Long Break');
		}
	}
}

var startStage = function() {
	//hide nextButton
	nextButton.classList.add('hidden');
	startButton.classList.add('hidden');
	resetButton.classList.remove('hidden');
	//set stage variables
	var minutes = 0;
	currentStageName.innerHTML = pomodoro_obj.stageArray[pomodoro_obj.arrayIndex];
	currentStreak.innerHTML = pomodoro_obj.currentStreak;
	switch (pomodoro_obj.stageArray[pomodoro_obj.arrayIndex]) {
		case 'Short Break':
			minutes = (parseInt(shortBreakLength.value));
			break;
		case 'Long Break':
			minutes = (parseInt(longBreakLength.value));
			break;
		default:
			minutes = (parseInt(pomLength.value));
	}
	startClock(minutes);
}

var startClock = function(minutes) {
	clock.setTime(minutes * 60);
	clock.start();
}

var endPom = function() {
	startButton.classList.remove('hidden');
	resetButton.classList.add('hidden');
	clock.reset();
}

//set event handlers
startButton.addEventListener('click', setObjValues);
resetButton.addEventListener('click', endPom);
nextButton.addEventListener('click', startStage);