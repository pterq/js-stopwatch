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

let milisArray = [];


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

    let sign = "";
    let innerDiv = document.createElement("div");
    let leftDiv = document.createElement("div");
    let midDiv = document.createElement("div");
    let rightDiv = document.createElement("div");

    leftDiv.className = "splitDisplay align-left";
    midDiv.className = "splitDisplay";
    rightDiv.className = "splitDisplay align-right";
    

    /*
    //add color to difference in split text depending on comparison
    
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
    */

    //content of new divs
    leftDiv.textContent = `${currentNumOfSplits + 1} |`;
    midDiv.textContent = `${hrs}:${mins}:${secs}:${milis}`;
    rightDiv.textContent = ``;


    //add new divs to the html
    let innerDivTarget = document.querySelector("#splitContainer");
    innerDivTarget.insertBefore(innerDiv, innerDivTarget.firstChild);
    
    let targetLocation = document.querySelector("#splitContainer").firstChild;
    targetLocation.append(leftDiv);
    targetLocation.append(midDiv);
    targetLocation.append(rightDiv);
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