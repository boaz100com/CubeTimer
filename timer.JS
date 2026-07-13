let pressedKey = 0;
let timerContent = document.getElementById("timer");
let title = document.getElementById("headline");
let banana = 0;
let timer = 0;
let intervalId = 10;

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


addEventListener("keydown", function(event) {
    if (banana == 0) {
        document.body.style.backgroundColor = "green";
        pressedKey = 1;
    } else {
        clearInterval(intervalId);
        document.body.style.backgroundColor = "red";
        title.textContent = "PRESS TO START";
        banana = 0;
        generateScramble();
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
        clearInterval(intervalId);
        document.body.style.backgroundColor = "red";
        banana = 0;
        generateScramble();
    }
});

addEventListener("touchend", function(event) {
    if (pressedKey == 1) {
        Solve();
        pressedKey = 0;
    }
});
