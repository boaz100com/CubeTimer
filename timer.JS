let timerContent = document.getElementById("timer");
let title = document.getElementById("headline");
let banana = 0;
let timer = 0;
let intervalId = 10;
let Ao5 = document.getElementById("Ao5");
let NumberS = document.getElementById("NumberS");
const plus_two  = document.getElementById("plus-two");
const DELETE = document.getElementById("delete");
let List = JSON.parse(localStorage.getItem("List")) || [];
NumberS.textContent = "Number of Solves: " + (List.length);
let arrow = document.querySelector("arrow")
let Bsolve = document.getElementById("Bsolve");
let Wsolve = document.getElementById("Wsolve");
let Ao12 = document.getElementById("Ao12");
let Ao50 = document.getElementById("Ao50");
const deleteBtn = document.getElementById("delete");
const plusTwoBtn = document.getElementById("plus-two");
let SCramble = document.getElementById("scramble");
let isReadyToStart = false;
let holdTimeoutId = null;
if(localStorage.getItem("SolveBest") == null) {
    localStorage.setItem("SolveBest", Infinity);
}
if(localStorage.getItem("SolveWorst") == null) {
    localStorage.setItem("SolveWorst", 0);
}

function generateScramble() {
    let seeded_scramble = new Scrambow()
    .setType('333')
    .setSeed(((Math.random*1000000)+1))
    .get();
    SCramble.textContent = seeded_scramble[0].scramble_string;
}

function Solve() {
    timer = 0;
    timerContent.innerHTML = "";
    SCramble.style.fontSize = "4vmax";
    banana = 1;
    Ao5.style.display = "none"; 
    Ao12.style.display = "none"; 
    NumberS.style.display = "none"; 
    Ao50.style.display = "none"; 
    Bsolve.style.display = "none"; 
    Wsolve.style.display = "none"; 
    timerContent.style.display = "none";
    intervalId = setInterval(() => {
        timer = timer+0.01;
        SCramble.textContent = (parseFloat(timer)).toFixed(2);;
        timerContent.textContent = (parseFloat(timer)).toFixed(2);;
    }, 10);
}
function CalcAo5() {
    if (List.length >= 5) {
        let Ao5List = List.slice(-5); 
        Ao5List = Ao5List.map(num => parseFloat(num));
        Ao5List.sort((a, b) => a - b);
        Ao5.textContent = "Ao5: " + ((parseFloat(Ao5List[1]) + parseFloat(Ao5List[2]) + parseFloat(Ao5List[3]))/3).toFixed(2);
    } else{
        Ao5.textContent = "Ao5: N/A";
    }
}
function CalcAo12() {
    if (List.length >= 12) {
        let Ao12List = List.slice(-12); 
        Ao12List = Ao12List.map(num => parseFloat(num));
        Ao12List.sort((a, b) => a - b);
        let sum12 =0;
        for(let i =0; i<10; i++){
            sum12 = sum12 + Ao12List[i+1]
        }
        Ao12.textContent = "Ao12: " + (parseFloat(sum12)/10).toFixed(2);
    } else{
        Ao12.textContent = "Ao12: N/A";
    }
}
function CalcAo50() {
    if(List.length >50){
        let Ao50List = List.slice(-50); 
        Ao50List = Ao50List.map(num => parseFloat(num));
        Ao50List.sort((a, b) => a - b);
        let sum50 =0;
        for(let i =0; i<48; i++){
            sum50 = sum50 + Ao50List[i+1]
        }
        Ao50.textContent = "Ao50: " + (parseFloat(sum50)/48).toFixed(2);
    }else{
        Ao50.textContent = "Ao50: N/A";
    }
}
function Bsolvefunc() {
    if(List.length >1){
        // localStorage.setItem("SolveBest2", localStorage.getItem("SolveBest"));
        let numericList = List.map(num => parseFloat(num));
        let best = Math.min(...numericList);
        localStorage.setItem("SolveBest", best);
        Bsolve.textContent = "Best Solve: " + best.toFixed(2);
    } else{
        localStorage.setItem("SolveBest", Infinity);
        Bsolve.textContent = "Best Solve: N/A";

    }
}
function Wsolvefunc() {
    if(List.length >1){
        // localStorage.setItem("SolveWorst2", localStorage.getItem("SolveWorst"));
        let numericList2 = List.map(num => parseFloat(num));
        let Worst = Math.max(...numericList2);
        localStorage.setItem("SolveWorst", Worst);
        Wsolve.textContent = "Worst Solve: " + Worst.toFixed(2);
    } else{
        localStorage.setItem("SolveWorst", 0);
        Wsolve.textContent = "Worst Solve: N/A";
    }
}

function Delete() {
    if (List.length > 0) {
        if (List.length-1 > 0) {
            if (localStorage.getItem("SolveBest") == parseFloat(List[List.length - 1])){
                Bsolve.textContent ="Best Solve: " +parseFloat(localStorage.getItem("SolveBest2")).toFixed(2);
                localStorage.setItem("BestSolve", parseFloat(localStorage.getItem("SolveBest2")).toFixed(2))
            } 
            if (localStorage.getItem("SolveWorst") == parseFloat(List[List.length - 1])){
                Wsolve.textContent ="Worst Solve: " +parseFloat(localStorage.getItem("SolveWorst2")).toFixed(2);
                localStorage.setItem("WestSolve", parseFloat(localStorage.getItem("WolveBest2")).toFixed(2))
            } 
        } else {
            Bsolve.textContent = "Best Solve: N/A";
            localStorage.setItem("SolveBest", Infinity);
            Wsolve.textContent = "Worst Solve: N/A";
            localStorage.setItem("SolveWorst", 0);
        }
        List.pop();
        localStorage.setItem("List", JSON.stringify(List));
        NumberS.textContent = "Number of Solves: " + (List.length);
        timerContent.textContent = "0.00";
        plus_two.style.display = "none"; 
        DELETE.style.display = "none"; 
        Bsolvefunc();
        Wsolvefunc();
        CalcAo5();
        CalcAo12();
        CalcAo50();
    }
}
function Plus2() {
    event.preventDefault();
    let timer2 = (parseFloat(timerContent.textContent)+2).toFixed(2)
    List[List.length - 1] = timer2;
    timerContent.textContent = timer2;
    localStorage.setItem("List", JSON.stringify(List));
    Bsolvefunc();
    Wsolvefunc();
    CalcAo5();
    CalcAo12();
    CalcAo50();
}

generateScramble();
Bsolvefunc();
Wsolvefunc();
CalcAo5();
CalcAo12();
CalcAo50();

plus_two.style.display = "none"; 
DELETE.style.display = "none"; 



addEventListener("keydown", function(event) {
    if (event.key == "p") {
        localStorage.clear();
        List = [];
        Bsolve.textContent = "Best Solve: N/A";
        localStorage.setItem("SolveBest", Infinity);
        Wsolve.textContent = "Worst Solve: N/A";
        localStorage.setItem("SolveWorst", 0);
        NumberS.textContent = "Number of Solves: " + (List.length); 
        timerContent.textContent = "0.00";
        CalcAo5();
        CalcAo12();
        CalcAo50();
        Bsolvefunc();
        Wsolvefunc();
    } else {
    if (banana == 0) {
        if (event.repeat) return;
        document.body.style.backgroundColor = "orange"; // Visual cue: Holding/Waiting
        title.textContent = "HOLD";
        holdTimeoutId = setTimeout(() => {
            isReadyToStart = true;
            document.body.style.backgroundColor = "green";
            title.textContent = "RELEASE TO START";
    }, 500);
    } else {
        clearInterval(intervalId); //stops the timer
        List.push(parseFloat(timerContent.textContent).toFixed(2));
        localStorage.setItem("List", JSON.stringify(List)); //sets the time in local storage
        document.body.style.backgroundColor = "red";
        NumberS.textContent = "Number of Solves: " + (List.length);
        plus_two.style.display = "block"; 
        DELETE.style.display = "block"; 
        SCramble.style.fontSize = "2.7vmax";
        Ao5.style.display = "block"; 
        Ao12.style.display = "block"; 
        NumberS.style.display = "block"; 
        Ao50.style.display = "block"; 
        Bsolve.style.display = "block"; 
        Wsolve.style.display = "block"; 
        timerContent.style.display = "Block";
        Bsolvefunc();
        CalcAo5();
        CalcAo12();
        CalcAo50();
        Wsolvefunc();
        title.textContent = "HOLD TO START";
        banana = 0;
        generateScramble();
    }
    }
});

addEventListener("keyup", function(event) {
    if (isReadyToStart == true) {
        this.clearTimeout(holdTimeoutId);
        title.textContent = "CLICK TO END";
        plus_two.style.display = "none"; 
        DELETE.style.display = "none"; 
        Solve();
        isReadyToStart = false;
    } else{
        this.clearTimeout(holdTimeoutId);
        document.body.style.backgroundColor = "red";
        title.textContent = "HOLD TO START";
        isReadyToStart = false;
    }
});


deleteBtn.addEventListener("touchstart", function(event) {
    event.stopPropagation();
    Delete();
});

plusTwoBtn.addEventListener("touchstart", function(event) {
    event.stopPropagation(); 
    Plus2();
});

addEventListener("touchstart", function(event) {
    if (banana == 0) {
        if (event.repeat) return;
        document.body.style.backgroundColor = "orange"; // Visual cue: Holding/Waiting
        title.textContent = "HOLD";
        holdTimeoutId = setTimeout(() => {
            isReadyToStart = true;
            document.body.style.backgroundColor = "green";
            title.textContent = "RELEASE TO START";
    }, 500);
    } else {
        clearInterval(intervalId); //stops the timer
        List.push(parseFloat(timerContent.textContent).toFixed(2));
        localStorage.setItem("List", JSON.stringify(List)); //sets the time in local storage
        document.body.style.backgroundColor = "red";
        NumberS.textContent = "Number of Solves: " + (List.length);
        plus_two.style.display = "block"; 
        DELETE.style.display = "block"; 
        SCramble.style.fontSize = "2.7vmax";
        Ao5.style.display = "block"; 
        Ao12.style.display = "block"; 
        NumberS.style.display = "block"; 
        Ao50.style.display = "block"; 
        Bsolve.style.display = "block"; 
        Wsolve.style.display = "block"; 
        timerContent.style.display = "Block";
        Bsolvefunc();
        CalcAo5();
        CalcAo12();
        CalcAo50();
        Wsolvefunc();
        title.textContent = "HOLD TO START";
        banana = 0;
        generateScramble();
    }
});

addEventListener("touchend", function(event) {
    if (isReadyToStart == true) {
        this.clearTimeout(holdTimeoutId);
        title.textContent = "CLICK TO END";
        plus_two.style.display = "none"; 
        DELETE.style.display = "none"; 
        Solve();
        isReadyToStart = false;
    } else{
        this.clearTimeout(holdTimeoutId);
        document.body.style.backgroundColor = "red";
        title.textContent = "HOLD TO START";
        isReadyToStart = false;
    }
});
