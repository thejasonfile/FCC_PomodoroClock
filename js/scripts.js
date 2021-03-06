var pomLengthInput = document.getElementById('pomodoro_length');
var shortBreakLengthInput = document.getElementById('short_break_length');
var longBreakLengthInput = document.getElementById('long_break_length');
var longBreakIntervalInput = document.getElementById('long_break_interval');
var inputs = document.getElementsByTagName('input');

var startButton = document.getElementById('start');
var resetButton = document.getElementById('reset');
var nextButton = document.getElementById('next');

var currentStageNameDiv = document.getElementById('stage_name');
var currentStageTimeDiv = document.getElementById('current_time');
var currentStreakDiv = document.getElementById('streak');
var alertDiv = document.getElementById('alert');

//create initial pomodoro object
var pomodoroObj = {}

//create clock object
var clock = $('#current_time').FlipClock({
	autoStart: false,
	countdown: true,
	clockFace: 'MinuteCounter',
	callbacks: {
			interval: function() {
				var currentTime = (clock.getTime().time);
				//when clock reaches zero and pomodoro has not been reset
				if (!currentTime && pomodoroObj.running === true) {
					//what happens when end of stage array is reached
					if (pomodoroObj.arrayIndex === pomodoroObj.stageArray.length - 1) {
						pomodoroObj.arrayIndex = 0;
					} else {
						pomodoroObj.arrayIndex += 1;						
					}
					//if the previous stage was a Pomodoro, increase streak count
					if (currentStageNameDiv.innerHTML === "Pomodoro") {
						pomodoroObj.currentStreak += 1;
					}
					//add button to advance to next stage
					playAudio();
					nextButton.classList.remove('hidden');
				}
			},

			reset: function() {
				//reset pomodoro object
				pomodoroObj = {};
				//hide next button
				nextButton.classList.add('hidden');
				//enable input fields
				$.each(inputs, function() {
					$(this).prop('disabled', false);
				})
				//reset input field, stage name, and streak values
				pomLengthInput.value = 25;
				shortBreakLengthInput.value = 5;
				longBreakLengthInput.value = 30;
				longBreakIntervalInput.value = 4;
				currentStageNameDiv.innerHTML = 'Pomodoro';
				currentStreakDiv.innerHTML = 0;
			}
	}
});

var setObjValues = function() {
		//take values from input fields and add them to object
		pomodoroObj.stageArray = [];
		pomodoroObj.running = true;
		pomodoroObj.arrayIndex = 0;
		pomodoroObj.currentStreak = 0;
		pomodoroObj.length = parseInt(pomLengthInput.value);
		pomodoroObj.sbreak = parseInt(shortBreakLengthInput.value);
		pomodoroObj.lbreak = parseInt(longBreakLengthInput.value);
		pomodoroObj.lbreakInterval = parseInt(longBreakIntervalInput.value);
		//set stageArray
		setStageArray(pomodoroObj.sbreak, pomodoroObj.lbreak, pomodoroObj.lbreakInterval);
		//start the next stage
		validateTimeValues();
}

var setStageArray = function(shortBreakLength, longBreakLength, longBreakInterval) {
	//always add a Pomodoro stage
	pomodoroObj.stageArray.push('Pomodoro');
	if (pomodoroObj.sbreak && pomodoroObj.lbreak) {
		for (var i = 1; i < longBreakInterval; i++) {
			pomodoroObj.stageArray.push('Short Break');
			pomodoroObj.stageArray.push('Pomodoro');
		}
		pomodoroObj.stageArray.push('Long Break');
	} 

	else {
		if (!pomodoroObj.lbreak && pomodoroObj.sbreak) {
			pomodoroObj.stageArray.push('Short Break');
		}
		else if (!pomodoroObj.sbreak && pomodoroObj.lbreak) {
			for (var i = 1; i < longBreakInterval; i++) {
			pomodoroObj.stageArray.push('Pomodoro');
			}
			pomodoroObj.stageArray.push('Long Break');
		}
	}
}

var validateTimeValues = function() {
	$('#alert').addClass('hidden').html('');
	//confirm pomodoro length is valid
	if (pomodoroObj.length <= 0 || pomodoroObj.sbreak < 0 || pomodoroObj.lbreak < 0 || pomodoroObj.lbreakInterval < 0) {
		showAlert("Pomodoro length must be a positive number.<p>All other values must be equal to or greater than 0</p>");
	}  else if (!pomodoroObj.length || isNaN(pomodoroObj.sbreak) || isNaN(pomodoroObj.lbreak) || isNaN(pomodoroObj.lbreakInterval)) {
		showAlert("All values must be entered")
	} else {
		startStage();
	}
}

var showAlert = function(message) {
	$('#alert').removeClass('hidden').append(message)
}

var startStage = function() {
	//hide buttons
	nextButton.classList.add('hidden');
	startButton.classList.add('hidden');
	resetButton.classList.remove('hidden');
	//disable input fields
	$.each(inputs, function() {
					$(this).prop('disabled', true);
				})
	//set stage variables
	var minutes = 0;
	currentStageNameDiv.innerHTML = pomodoroObj.stageArray[pomodoroObj.arrayIndex];
	currentStreakDiv.innerHTML = pomodoroObj.currentStreak;
	switch (pomodoroObj.stageArray[pomodoroObj.arrayIndex]) {
		case 'Short Break':
			minutes = (parseInt(pomodoroObj.sbreak));
			break;
		case 'Long Break':
			minutes = (parseInt(pomodoroObj.lbreak));
			break;
		default:
			minutes = (parseInt(pomodoroObj.length));
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
	pomodoroObj.running = false;
	clock.reset();
}

var playAudio = function() {
	var horn = 'audio/airhorn.mp3';
    var audio = new Audio(horn);
	audio.play();
}

//set event handlers
startButton.addEventListener('click', setObjValues);
resetButton.addEventListener('click', endPom);
nextButton.addEventListener('click', startStage);