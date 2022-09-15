const timeDisplay = document.querySelector("#timeDisplay");
const startAndStopBtn = document.querySelector("#startAndStopBtn");
const splitBtn = document.querySelector("#splitBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = "00";
let mins = "00";
let secs = "00";
let milis = "00";
let currentNumOfSplits = 0;

let milisArray = [];
let runOnce = false;


startAndStopBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        if(!runOnce){
            runOnce = true;
            //milisArray.push(0);
            addSplit();
        }
        
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

    addSplit();
})

function addSplit(){
    //let sign = "";
    let innerDiv = document.createElement("div");
    let leftDiv = document.createElement("div");
    let midDiv = document.createElement("div");
    let rightDiv = document.createElement("div");

    leftDiv.className = "splitDisplay align-right";
    midDiv.className = "splitDisplay";
    rightDiv.className = "splitDisplay align-left";
    
    //Generating time for splitDisplay and for calculating the difference between splits
    milisArray.push(elapsedTime);
    updateTime(elapsedTime);
    //console.log(milisArray);

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
    leftDiv.textContent = `${currentNumOfSplits + 1}`;
    midDiv.textContent = `| ${hrs}:${mins}:${secs}:${milis} |`;
    if(currentNumOfSplits == 0) rightDiv.textContent = `0`;
    else  rightDiv.textContent  = `${milisArray[currentNumOfSplits] - milisArray[currentNumOfSplits - 1]}`;
    
    //add new divs to the html
    let innerDivTarget = document.querySelector("#splitContainer");
    innerDivTarget.insertBefore(innerDiv, innerDivTarget.firstChild);
    
    let targetLocation = document.querySelector("#splitContainer").firstChild;
    targetLocation.append(leftDiv);
    targetLocation.append(midDiv);
    targetLocation.append(rightDiv);
    currentNumOfSplits++;
}

resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    hrs = "00";
    mins = "00";
    secs = "00";
    milis = "00";

    while(milisArray.length > 0) {
        milisArray.pop();
    }
    console.log(milisArray);
    runOnce = false;
    currentNumOfSplits = 0;

    timeDisplay.textContent = "00:00:00:00";

    //removes every entry in #splitContainer
    
    const splitContainer = document.querySelector("#splitContainer");
    while(splitContainer.hasChildNodes){
        splitContainer.removeChild(splitContainer.firstChild);
    }

});

function updateTime(){
    elapsedTime = Date.now() - startTime;
    produceTime(elapsedTime);
    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${milis}`;
}

function produceTime(time){
    milis = Math.floor((time % 1000));
    secs =  Math.floor((time - milis) / 1000);
    mins = Math.floor(((time - milis) / (1000 * 60)) % 60);
    hrs = Math.floor(((time - milis) / (1000 * 60 * 60)) % 60);

    /*
    milis = Math.floor((time) % 60);
    secs = Math.floor((time / 1000) % 60);
    mins = Math.floor((time / (1000 * 60) % 60));
    hrs  = Math.floor((time / (1000 * 60 * 60) % 60));
    */

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);
    milis = pad(milis);
}

function pad(unit){
    return ("0" + unit).length > 2 ? unit : "0" + unit;
}