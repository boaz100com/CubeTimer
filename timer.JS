let pressedKey = 0;
let timerContent = document.getElementById("timer");
let title = document.getElementById("headline");
let banana = 0;
let timer = 0;
let intervalId = 10;
let Ao5 = document.getElementById("Ao5");
let NumberS = document.getElementById("NumberS");
NumberS.textContent = "Number of Solves: " + (localStorage.length); 
let Bsolve = document.getElementById("Bsolve");
let BsolveRN = Infinity;
let Wsolve = document.getElementById("Wsolve");
let WsolveRN = 0;
let Ao12 = document.getElementById("Ao12");
let Ao50 = document.getElementById("Ao50");
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
generateScramble();


function Solve() {
    timer = 0;
    banana = 1;
    intervalId = setInterval(() => {
        timer = timer+0.01;
        timerContent.innerHTML = (parseFloat(timer)).toFixed(2);;
    }, 10);
}

function CalcAo5() {
    if (localStorage.length >= 5) {
        let Ao5List = [];
        for (let i = 0; i < 5; i++) {
            Ao5List[i] = parseFloat(localStorage.getItem("Solve"+(localStorage.length-5+i)));
        }
        Ao5List.sort((a, b) => a - b);
        Ao5.textContent = "Ao5: " + ((Ao5List[1] + Ao5List[2] + Ao5List[3])/3).toFixed(2);
    } else{
        Ao5.textContent = "Ao5: N/A";
    }
}

function CalcAo12() {
    if (localStorage.length >= 12) {
        let Ao12List = [];
        for (let i = 0; i < 12; i++) {
            Ao12List[i] = parseFloat(localStorage.getItem("Solve"+(localStorage.length-12+i)));
        }
        Ao12List.sort((a, b) => a - b);
        Ao12.textContent = "Ao12: " + ((Ao12List[1] + Ao12List[2] + Ao12List[3] + Ao12List[4] + Ao12List[5] + Ao12List[6] + Ao12List[7] + Ao12List[8] + Ao12List[9] + Ao12List[10] + Ao12List[11])/11).toFixed(2);
    } else{
        Ao12.textContent = "Ao12: N/A";
    }
}

function CalcAo50() {
    if (localStorage.length >= 50) {
        let Ao50List = [];
        for (let i = 0; i < 50; i++) {
            Ao50List[i] = parseFloat(localStorage.getItem("Solve"+(localStorage.length-50+i)));
        }
        Ao50List.sort((a, b) => a - b);
        Ao50.textContent = "Ao50: " + ((Ao50List[1] + Ao50List[2] + Ao50List[3] + Ao50List[4] + Ao50List[5] + Ao50List[6] + Ao50List[7] + Ao50List[8] + Ao50List[9] + Ao50List[10])/99).toFixed(2);
    } else{
        Ao50.textContent = "Ao50: N/A";
    }
}


function Bsolvefunc() {
    if (timerContent.textContent < BsolveRN) {
        Bsolve.textContent = "Best Solve: " + timerContent.textContent;
        BsolveRN = timerContent.textContent;
    }
}
function Wsolvefunc() {
    if (timerContent.textContent > WsolveRN) {
        Wsolve.textContent = "Worst Solve: " + timerContent.textContent;
        WsolveRN = timerContent.textContent;
    }
}
addEventListener("keydown", function(event) {
    if (event.key == "p") {
        localStorage.clear();
        Bsolve.textContent = "Best Solve: N/A";
        BsolveRN = Infinity;
        Wsolve.textContent = "Worst Solve: N/A";
        WsolveRN = 0;
        NumberS.textContent = "Number of Solves: " + (localStorage.length); 
        CalcAo5();
        CalcAo12();
        CalcAo50();
    } else {
    if (banana == 0) {
        document.body.style.backgroundColor = "green";
        pressedKey = 1;
    } else {
        clearInterval(intervalId); //stops the timer
        localStorage.setItem("Solve"+localStorage.length, timerContent.textContent); //sets the time in local storage
        document.body.style.backgroundColor = "red";
        NumberS.textContent = "Number of Solves: " + (localStorage.length);
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
        Solve();
        pressedKey = 0;
    }
});


addEventListener("touchstart", function(event) {
    if (banana == 0) {
        document.body.style.backgroundColor = "green";
        pressedKey = 1;
    } else {
        clearInterval(intervalId); //stops the timer
        localStorage.setItem("Solve"+localStorage.length, timerContent.textContent); //sets the time in local storage
        document.body.style.backgroundColor = "red";
        NumberS.textContent = "Number of Solves: " + (localStorage.length);
        Bsolvefunc();
        CalcAo5();
        title.textContent = "PRESS TO START";
        banana = 0;
        generateScramble();
    }
});

addEventListener("touchend", function(event) {
    if (pressedKey == 1) {
        title.textContent = "PRESS TO END";
        Solve();
        pressedKey = 0;
    }
});
