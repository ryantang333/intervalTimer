var intervalID, currentTimer, milliseconds, seconds, minutes, hours, timerPortfolio = [], timerSet = [];

$(document).ready(fillTimeOptions);
$(document).ready(addClickEvents);

function Timer(ms, s, m, h) {
    this.ms = ms;
	this.s = s;
	this.m = m;
	this.h = h;
}

function addTimerToSet(t) {
	var tempTimer = timerSet.slice(0); //creates a shallow copy to prevent altering the original array
	tempTimer.push(t);
	timerSet = tempTimer;
}

function addSetToPortfolio(set) {
	// The == and != operator consider null equal to only null or undefined
	if(set[0] != null){
		timerPortfolio.push(set);
	}
}

function removeTimerFromSet(idx) {
	var tempTimer = timerSet.slice(0);
	tempTimer.splice(idx, 1);
	timerSet = tempTimer;
}

function removeSetFromPortfolio(idx){
	timerPortfolio.splice(idx, 1);
}

function startCountdown(timer) {
	displayCount(timer); //first function call displays number immediately instead of with delay
	intervalID = setInterval(function (){displayCount(timer);}, 10); //10 milliseconds is the safest minimum value for the delay
}

function startSetCountdown(set) {
	for (var i = 0; i < set.length; i++) {
		console.log("set " + i + "started");
		startCountdown(set[i]);
	};
}

function captureTime() {
	hours = $("#hours").val();
	minutes = $("#minutes").val();
	seconds = $("#seconds").val();
	milliseconds = 100; //to reach the right amount of milliseconds with the 10ms delay given in setInterval in startCountdown
	var timer = new Timer(milliseconds, seconds, minutes, hours);
	return timer;
}

function displayCount(t){
	if(t.h == 0 && t.m == 0 && t.s == 0){
		$("#timeDisplay").html(pad(t.h) + ":" + pad(t.m) + ":" + pad(t.s));
		clearCount();
	}
	else {
		$("#timeDisplay").html(pad(t.h) + ":" + pad(t.m) + ":" + pad(t.s));
		t.ms--;
		if(t.ms < 0) {
			t.s--;
			t.ms += 100;
		}
		if(t.s < 0) {
			t.m--;
			t.s += 60;
		}
		if(t.m < 0) {
			t.h--;
			t.m += 60;
		}
	}
	currentTimer = t; //keeps current timer for pause/continue due to loss of timer with clearInterval()
}

function removeTimer(idx) {
	removeTimerFromSet(idx);
    fillSet();
}

function removeSet(idx) {
	removeSetFromPortfolio(idx);
    fillPortfolio();
}

function removeTimerDisplay() {
	$("#timeDisplay").html("");
}

function clearCount(){
	clearInterval(intervalID);
}

function fillTimeOptions(){
	for (var i = 0; i < 60; i++) {
		document.getElementById("seconds").innerHTML += "<option value='" + i + "'>" + i + "</option>";
		document.getElementById("minutes").innerHTML += "<option value='" + i + "'>" + i + "</option>";
	};
	for (var i = 0; i < 24; i++) {
		document.getElementById("hours").innerHTML += "<option value='" + i + "'>" + i + "</option>";
	};
}

function fillSet(){
	$("#myTimers").html("");
	for (var i = 0; i < timerSet.length; i++) {
		var div = document.createElement("div");
		div.innerHTML = "Timer " + (i+1) + ": " + pad(timerSet[i].h) + ":" + pad(timerSet[i].m) + ":" + pad(timerSet[i].s) +
			"<input type='button' value='Remove' onclick='removeTimer(" + i + ")'><br>";
		$("#myTimers").append(div);
	};
}

function fillPortfolio(){
	$("#mySets").html("");
	for (var i = 0; i < timerPortfolio.length; i++) {
		var div = document.createElement("div");
		div.innerHTML = "Set " + (i+1) + ": " + timerPortfolio[i] +
			"<input type='button' value='Remove' onclick='removeSet("+
			i +")'><input type='button' value='View Set' onclick='viewSet("+
			i +")'><br>";
		$("#mySets").append(div);
	};
}

function clearSet() {
	$("#myTimers").html("");
	timerSet = [];
}

function clearPortfolio() {
	$("#mySets").html("");
	timerPortfolio = [];
}

function viewSet(idx) {
	timerSet = timerPortfolio[idx];
	fillSet();
}

/*Pads variables with a leading zero, to display time in this format: 00:00:00*/
function pad(num) {
    var s = "0" + num;
    return s.substr(s.length - 2);
}

function addClickEvents() {
	$("#start").on("click", function(){
		startCountdown(captureTime());
		$("#start").prop("disabled", true);
		$("#clear").prop("disabled", false);
		$("#pause").prop("disabled", false);
	});
	$("#clear").on("click", function(){
		clearCount();
		removeTimerDisplay();
		$("#start").prop("disabled", false);
		$("#pause").prop("disabled", true);
		$("#continue").prop("disabled", true);
	});
	$("#pause").on("click", function(){
		clearCount();
		$("#pause").prop("disabled", true);
		$("#continue").prop("disabled", false);
	});
	$("#continue").on("click", function(){
		startCountdown(currentTimer);
		$("#pause").prop("disabled", false);
		$("#continue").prop("disabled", true);
	});
	$("#addTimer").on("click", function(){
		addTimerToSet(captureTime());
		fillSet();
	});
	$("#addSet").on("click", function(){
		addSetToPortfolio(timerSet);
		fillPortfolio();
		clearSet();
	});
	$("#clearSetDisplay").on("click", function(){
		clearSet();
	});
	$("#clearPortfolioDisplay").on("click", function(){
		clearPortfolio();
	});
	$("#startSet").on("click", function(){
		startSetCountdown(timerSet);
	});
}