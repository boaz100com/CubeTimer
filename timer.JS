let cube = 333;
let cubeC = 333;
let timerContent = document.getElementById("timer");
let title = document.getElementById("headline");
let banana = 0;
let timer = 0;
let DisplayList =[];
let intervalId = 10;
let Ao5 = document.getElementById("Ao5");
let NumberS = document.getElementById("NumberS");
const plus_two  = document.getElementById("plus-two");
const DELETE = document.getElementById("delete");
let List = JSON.parse(localStorage.getItem(`List_${cube}`)) || [];
NumberS.textContent = "Number of Solves: " + (List.length);
let arrow = document.querySelector("arrow")
let Bsolve = document.getElementById("Bsolve");
let Wsolve = document.getElementById("Wsolve");
let Ao12 = document.getElementById("Ao12");
let Ao50 = document.getElementById("Ao50");
let display = document.getElementById("display");
let deletesolveB = document.getElementById("deletesolve");
const deleteBtn = document.getElementById("delete");
const plusTwoBtn = document.getElementById("plus-two");
let SCramble = document.getElementById("scramble");
let isReadyToStart = false;
let holdTimeoutId = null;
let scramble = JSON.parse(localStorage.getItem(`scramble_${cube}`)) || [];
let history = document.getElementById("History1");
let ChooseCube = document.getElementById("chooseCube");
let displayoff = 0;
let currentScramble = "";
title.textContent = cube;

if(localStorage.getItem(`SolveBest_${cube}`) == null) {
    localStorage.setItem(`SolveBest_${cube}`, Infinity);
}
if(localStorage.getItem(`SolveWorst_${cube}`) == null) {
    localStorage.setItem(`SolveWorst_${cube}`, 0);
}

function generateScramble() {
    let seeded_scramble = new Scrambow()
    .setType(cubeC.toString())
    .setSeed((Math.random*1000000))
    .get();
    currentScramble = seeded_scramble[0].scramble_string;
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
    plus_two.style.display = "none"; 
    DELETE.style.display = "none"; 
    timerContent.style.display = "none";
    history.style.display = "none";
    ChooseCube.style.display = "none";
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
        // localStorage.setItem("`SolveBest_${cube}`2", localStorage.getItem("`SolveBest_${cube}`"));
        let numericList = List.map(num => parseFloat(num));
        let best = Math.min(...numericList);
        localStorage.setItem(`SolveBest_${cube}`, best);
        Bsolve.textContent = "PB: " + best.toFixed(2);
    } else{
        localStorage.setItem(`SolveBest_${cube}`, Infinity);
        Bsolve.textContent = "PB: N/A";

    }
}
function Wsolvefunc() {
    if(List.length >1){
        // localStorage.setItem("`SolveWorst_${cube}`2", localStorage.getItem("`SolveWorst_${cube}`"));
        let numericList2 = List.map(num => parseFloat(num));
        let Worst = Math.max(...numericList2);
        localStorage.setItem(`SolveWorst_${cube}`, Worst);
        Wsolve.textContent = "PW: " + Worst.toFixed(2);
    } else{
        localStorage.setItem(`SolveWorst_${cube}`, 0);
        Wsolve.textContent = "PW: N/A";
    }
}

function Delete(num) {
    if (List.length > 0) {
        if (List.length-1 > 0) {
            if (localStorage.getItem(`SolveBest_${cube}`) == parseFloat(List[num])){
                Bsolve.textContent ="PB: " +parseFloat(localStorage.getItem(`SolveBest2_${cube}`)).toFixed(2);
                localStorage.setItem("BestSolve", parseFloat(localStorage.getItem(`SolveBest2_${cube}`)).toFixed(2))
            } 
            if (localStorage.getItem("`SolveWorst_${cube}`") == parseFloat(List[num])){
                Wsolve.textContent ="PW: " +parseFloat(localStorage.getItem(`SolveBest2_${cube}`)).toFixed(2);
                localStorage.setItem("WestSolve", parseFloat(localStorage.getItem(`SolveBest2_${cube}`)).toFixed(2))
            } 
        } else {
            Bsolve.textContent = "PB: N/A";
            localStorage.setItem(`SolveBest_${cube}`, Infinity);
            Wsolve.textContent = "PW: N/A";
            localStorage.setItem(`SolveWorst_${cube}`, 0);
        }
        List.splice(num, 1);
        localStorage.setItem("List", JSON.stringify(`List_${cube}`));
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
function DeleteLast(){
    Delete((List.length -1));
}
function Plus2() {
    event.preventDefault();
    let timer2 = (parseFloat(timerContent.textContent)+2).toFixed(2)
    List[List.length - 1] = timer2;
    timerContent.textContent = timer2;
    localStorage.setItem(`List_${cube}`, JSON.stringify(List));
    Bsolvefunc();
    Wsolvefunc();
    CalcAo5();
    CalcAo12();
    CalcAo50();
}
function History1(){
    if (document.activeElement && document.activeElement.tagName === "BUTTON") {
        document.activeElement.blur();
    }
        if(displayoff==0){
        banana =2;
        displayoff =1;
        Ao5.style.display = "none"; 
        Ao12.style.display = "none"; 
        NumberS.style.display = "none"; 
        Ao50.style.display = "none"; 
        Bsolve.style.display = "none"; 
        Wsolve.style.display = "none"; 
        title.style.display = "none"; 
        SCramble.style.display = "none"; 
        timerContent.style.display = "none"
        plus_two.style.display = "none"; 
        DELETE.style.display = "none"; 
        ChooseCube.style.display = "none";
        history.textContent = "Back";
        display.style.display = "block";
        deletesolveB.style.display = "block";
        display.innerHTML = "";
        for(let i =0; i<List.length; i++){
            display.insertAdjacentHTML("beforeend", `<p>${i + 1}. ${scramble[i]}: ${List[i]}</p>`);
        }
    } else{
        banana =0;
        displayoff =0;
        Ao5.style.display = "block"; 
        Ao12.style.display = "block"; 
        NumberS.style.display = "block"; 
        Ao50.style.display = "block"; 
        Bsolve.style.display = "block"; 
        Wsolve.style.display = "block"; 
        title.style.display = "block"; 
        SCramble.style.display = "block"; 
        timerContent.style.display = "block"
        plus_two.style.display = "block"; 
        DELETE.style.display = "block"; 
        ChooseCube.style.display = "block";
        history.textContent = "History";
        display.style.display = "none";
        deletesolveB.style.display = "none";
    }
}
function deletesolve(){
    let solvenum = prompt("Choose a Solve to Delete or All");
    if(solvenum == "all" || solvenum == "ALL" || solvenum == "All"){
        localStorage.clear();
        scramble = [];
        List = [];
        Bsolve.textContent = "PB: N/A";
        localStorage.setItem(`SolveBest_${cube}`, Infinity);
        Wsolve.textContent = "PW: N/A";
        localStorage.setItem(`SolveWorst_${cube}`, 0);
        NumberS.textContent = "Number of Solves: " + (List.length); 
        timerContent.textContent = "0.00";
        displayoff =0;
        History1();
        CalcAo5();
        CalcAo12();
        CalcAo50();
        Bsolvefunc();
        Wsolvefunc();
    }else if (solvenum !== null){
        Delete(parseInt(parseInt(solvenum) -1));
        displayoff =0;
        History1();
    }


}
function chooseCube(){
    if (document.activeElement && document.activeElement.tagName === "BUTTON") {
        document.activeElement.blur();
    }
    let validcubes = ["222", "333", "444", "555", "666", "777", "clock", "fto", "minx", "pyram", "skewb", "sq1", "clockoptimal"];
    cubeA = prompt("Choose Cube type: 222, 333, 444, 555, 666, 777, OH, clock, fto, minx, pyram, skewb, sq1, clockoptimal : " );
    if(cubeA == "OH" || cubeA == "oh"){
        cubeA = "OH"
        cubeC = 333;
        cube = cubeA;
    } else if (validcubes.includes(cubeA)){
        cube = cubeA;
        cubeC = cubeA;
    } else{
        alert("Invalid Input")
        cube = cube;
        return;
    }
    title.textContent = cube;
    scramble = JSON.parse(localStorage.getItem(`scramble_${cube}`)) || [];
    List = JSON.parse(localStorage.getItem(`List_${cube}`)) || [];
    NumberS.textContent = "Number of Solves: " + List.length;
    generateScramble();
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
display.style.display = "none";
deletesolveB.style.display = "none";

addEventListener("keydown", function(event) {
    if (event.key == "p") {
        localStorage.clear();
        scramble = [];
        List = [];
        Bsolve.textContent = "PB: N/A";
        localStorage.setItem(`SolveBest_${cube}`, Infinity);
        Wsolve.textContent = "PW: N/A";
        localStorage.setItem(`SolveWorst_${cube}`, 0);
        NumberS.textContent = "Number of Solves: " + (List.length); 
        timerContent.textContent = "0.00";
        CalcAo5();
        CalcAo12();
        CalcAo50();
        Bsolvefunc();
        Wsolvefunc();
    }if (event.key === " " && document.activeElement.tagName === "BUTTON") {
        event.preventDefault();
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
    } if(banana ==1) {
        clearInterval(intervalId); //stops the timer
        List.push(parseFloat(timerContent.textContent).toFixed(2));
        scramble.push(currentScramble);
        localStorage.setItem(`scramble_${cube}`, JSON.stringify(scramble));
        localStorage.setItem(`List_${cube}`, JSON.stringify(List));
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
        history.style.display = "block";
        ChooseCube.style.display = "block";
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
    } if(banana ==1) {
        clearInterval(intervalId); //stops the timer
        List.push(parseFloat(timerContent.textContent).toFixed(2));
        scramble.push(currentScramble);
        localStorage.setItem(`scramble_${cube}`, JSON.stringify(scramble));
        localStorage.setItem(`List_${cube}`, JSON.stringify(List));
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
        history.style.display = "block";
        ChooseCube.style.display = "block";
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
