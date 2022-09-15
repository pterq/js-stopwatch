const timeDisplay = document.querySelector("#timeDisplay");
const startAndStopBtn = document.querySelector("#startAndStopBtn");
const splitBtn = document.querySelector("#splitBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let milis = 0;
let currentNumOfSplits = 0;
let lastHrs = 0;
let lastMins = 0;
let lastSecs = 0;
let lastMilis = 0;


startAndStopBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 35);
    }
    else if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

splitBtn.addEventListener("click", () => {
    if(paused) return;

    let newDiv = document.createElement("div");
    newDiv.className = "splitDisplay";
    newDiv.id = "splitDisplayNumber" + currentNumOfSplits;

    //add color to difference in split text depending on comparison
    let sign = "";
    let condition = lastHrs > hrs || lastMins > mins || lastSecs > secs || lastMilis > milis;
    if(condition){
        newDiv.style.color = "red";
        sign = "+";

    }
    else if(!condition){
        newDiv.style.color = "green";
        sign = "-"
    }
    else{
        newDiv.style.color = "white";
        sign = "";
    }
    newDiv.innerHTML = `${currentNumOfSplits + 1}| ${hrs}:${mins}:${secs}:${milis} | ${sign}${Math.abs(milis - lastMilis)}`;
    
    lastHrs = hrs;
    lastMins = mins;
    lastSecs = secs;
    lastMilis = milis;

    //add new div to the html
    let targetLocation = document.querySelector("#splitContainer");
    targetLocation.insertBefore(newDiv, targetLocation.firstChild);
    currentNumOfSplits++;


})

resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    milis = 0;
    
    timeDisplay.textContent = "00:00:00:00";

    //removes every entry in #splitContainer
    currentNumOfSplits = 0;
    const splitContainer = document.querySelector("#splitContainer");
    while(splitContainer.hasChildNodes){
        splitContainer.removeChild(splitContainer.firstChild);
    }

});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    milis = Math.floor((elapsedTime) % 60);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60) % 60));
    hrs  = Math.floor((elapsedTime / (1000 * 60 * 60) % 60));

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);
    milis = pad(milis);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${milis}`;

    function pad(unit){
        return ("0" + unit).length > 2 ? unit : "0" + unit;
    }
}