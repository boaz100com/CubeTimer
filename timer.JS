let pressedKey = 0;
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

if(localStorage.getItem("SolveBest") == null) {
    localStorage.setItem("SolveBest", Infinity);
}
if(localStorage.getItem("SolveWorst") == null) {
    localStorage.setItem("SolveWorst", 0);
}
function generateScramble() {
  var array = new Array(" U", " D", " R", " L", " F", " B")
  var switches = ["", "\'", "2"]; 
  var array2 = new Array(); // The Scramble.
  var last = ''; // Last used letter
  var random = 0;
  for (var i = 0; i < 20; i++) {
      // the following loop runs until the last one 
      // letter is another of the new one
      do {
         random = Math.floor(Math.random() * array.length);
      } while (last == array[random]) 
  last = array[random];
  var scrambleItem = array[random] + switches[parseInt(Math.random()*switches.length)];
  array2.push(scrambleItem); // Get letters in random order in the array.
  }
  var scramble = "Scramble: ";
  for(i=0; i<20; i++) {
     scramble += array2[i];
  }
  document.getElementById("scramble").innerHTML = scramble; // Display the scramble
}

function Solve() {
    timer = 0;
    banana = 1;
    intervalId = setInterval(() => {
        timer = timer+0.01;
        timerContent.innerHTML = (parseFloat(timer)).toFixed(2);;
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
    if (List.length > 0 && (parseFloat(List[List.length - 1]) < parseFloat(localStorage.getItem("SolveBest")))) {
        localStorage.setItem("SolveBest2", localStorage.getItem("SolveBest"));
        localStorage.setItem("SolveBest", parseFloat(List[List.length - 1]));
        Bsolve.textContent = "Best Solve: " + (parseFloat(List[List.length - 1])).toFixed(2);
    } if (List.length >0){
        Bsolve.textContent = "Best Solve: " + (parseFloat(localStorage.getItem("SolveBest")).toFixed(2))
    } else {
        Bsolve.textContent = "Best Solve: N/A"
    }
}
function Wsolvefunc() {
    if (List.length > 0 && parseFloat(List[List.length - 1]) > parseFloat(localStorage.getItem("SolveWorst"))) {
        localStorage.setItem("SolveWorst2", localStorage.getItem("SolveWorst"));
        localStorage.setItem("SolveWorst", parseFloat(List[List.length - 1]));
        Wsolve.textContent = "Worst Solve: " + (parseFloat(List[List.length - 1])).toFixed(2);
    } if (List.length >0){
        Wsolve.textContent = "Worst Solve: " + (parseFloat(localStorage.getItem("SolveWorst")).toFixed(2))
    } else {
        Wsolve.textContent = "Worst Solve: N/A"
    }
}
function Delete() {
    if (List.length > 0) {
        if (List.length-1 > 0) {
            if (localStorage.getItem("SolveBest") == parseFloat(List[List.length - 1])){
                Bsolve.textContent ="Best Solve: " +parseFloat(localStorage.getItem("SolveBest2")).toFixed(2);
            } 
            if (localStorage.getItem("SolveWorst") == parseFloat(List[List.length - 1])){
                Wsolve.textContent ="Worst Solve: " +parseFloat(localStorage.getItem("SolveWorst2")).toFixed(2);
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
        CalcAo5();
        CalcAo12();
        CalcAo50();
    }
}
function Plus2() {
        if (localStorage.getItem("SolveBest") == parseFloat(List[List.length - 1])){
            Bsolve.textContent ="Best Solve: " +parseFloat(localStorage.getItem("SolveBest2")).toFixed(2);
            localStorage.setItem("SolveBest", localStorage.getItem("SolveBest2"));
        } 
    let timePlus2 = (parseFloat(timerContent.textContent)+2).toFixed(2);
    List[List.length - 1] = timePlus2;
    timerContent.textContent = timePlus2;
    localStorage.setItem("List", JSON.stringify(List));
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
        document.body.style.backgroundColor = "green";
        pressedKey = 1;
    } else {
        clearInterval(intervalId); //stops the timer
        List.push(parseFloat(timerContent.textContent).toFixed(2));
        localStorage.setItem("List", JSON.stringify(List)); //sets the time in local storage
        document.body.style.backgroundColor = "red";
        NumberS.textContent = "Number of Solves: " + (List.length);
        plus_two.style.display = "block"; 
        DELETE.style.display = "block"; 
        Bsolvefunc();
        CalcAo5();
        CalcAo12();
        CalcAo50();
        Wsolvefunc();
        title.textContent = "PRESS TO START";
        banana = 0;
        generateScramble();
    }
    }
});

addEventListener("keyup", function(event) {
    if (pressedKey == 1) {
        title.textContent = "PRESS TO END";
        plus_two.style.display = "none"; 
        DELETE.style.display = "none"; 
        Solve();
        pressedKey = 0;
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
        document.body.style.backgroundColor = "green";
        pressedKey = 1;
    } else {
        clearInterval(intervalId); //stops the timer
        List.push(parseFloat(timerContent.textContent).toFixed(2));
        localStorage.setItem("List", JSON.stringify(List)); //sets the time in local storage
        document.body.style.backgroundColor = "red";
        NumberS.textContent = "Number of Solves: " + (List.length);
        plus_two.style.display = "block"; 
        DELETE.style.display = "block"; 
        Bsolvefunc();
        CalcAo5();
        CalcAo12();
        CalcAo50();
        Wsolvefunc();
        title.textContent = "PRESS TO START";
        banana = 0;
        generateScramble();
    }
});

addEventListener("touchend", function(event) {
    if (pressedKey == 1) {
        title.textContent = "PRESS TO END";
        plus_two.style.display = "none"; 
        DELETE.style.display = "none"; 
        Solve();
        pressedKey = 0;
    }
});
