//sound
let sound: HTMLAudioElement[] = [];
sound[0] = new Audio("kick.mp3");
sound[1] = new Audio("snare.mp3");
sound[2] = new Audio("hihat.mp3");
sound[3] = new Audio("F.mp3");
sound[4] = new Audio("G.mp3");
sound[5] = new Audio("A.mp3");
sound[6] = new Audio("C.mp3");
sound[7] = new Audio("laugh-1.mp3");
sound[8] = new Audio("laugh-2.mp3");

//HTML_Element
const playButton: HTMLElement = document.getElementById("play");
const stopButton: HTMLElement = document.getElementById("stop");
const deleteButton: HTMLElement = document.getElementById("delete");
const recordButton: HTMLElement = document.getElementById("record");
const recordButtonRed: HTMLElement = document.getElementById("recordred");
const randomButton: HTMLElement = document.getElementById("random");

let i: number = 0;

//Array_(Default_Beat)
let beatArray: number[] = [];
beatArray[0] = 5;
beatArray[1] = 4;
beatArray[2] = 8;

//Beat Start/Stop
var beatInterval: number;

//Delete_Button
var resetColor: number;
deleteButton.addEventListener("click", function (): void {
  beatArray.length = 0;
  deleteButton.setAttribute("style", "color: " + "#ff6666");
  resetColor = setTimeout(function (): void {
    deleteButton.setAttribute("style", "color: " + "black");
  }, 800);
});

//boolean_switches
let boolRecord: boolean = false;
let boolPlayStop: boolean = false;

//Drumpad_Buttons_EventListener
document.addEventListener("keydown", function (event: KeyboardEvent): void {
  //console.log(event);
  switch (event.key) {
    case "1":
      playSample2(0);
      recordABeat(0);
      break;
    case "2":
      playSample2(1);
      recordABeat(1);
      break;
    case "3":
      playSample2(2);
      recordABeat(2);
      break;
    case "4":
      playSample2(3);
      recordABeat(3);
      break;
    case "5":
      playSample2(4);
      recordABeat(4);
      break;
    case "6":
      playSample2(5);
      recordABeat(5);
      break;
    case "7":
      playSample2(6);
      recordABeat(6);
      break;
    case "8":
      playSample2(7);
      recordABeat(7);
      break;
    case "9":
      playSample2(8);
      recordABeat(8);
      break;
    case " ":
      playStopKeyboard();
      break;
    case "r":
      recordKeyboard();
      break;
    case "t":
      beatArray.length = 0;
      deleteButton.setAttribute("style", "color: " + "#ff6666");
      resetColor = setTimeout(function (): void {
        deleteButton.setAttribute("style", "color: " + "black");
      }, 800);
      break;
  }
});

document.querySelector("#drum1").addEventListener("click", function (): void {
  playSample2(0);
  recordABeat(0);
});

document.querySelector("#drum2").addEventListener("click", function (): void {
  playSample2(1);
  recordABeat(1);
});

document.querySelector("#drum3").addEventListener("click", function (): void {
  playSample2(2);
  recordABeat(2);
});

document.querySelector("#drum4").addEventListener("click", function (): void {
  playSample2(3);
  recordABeat(3);
});

document.querySelector("#drum5").addEventListener("click", function (): void {
  playSample2(4);
  recordABeat(4);
});

document.querySelector("#drum6").addEventListener("click", function (): void {
  playSample2(5);
  recordABeat(5);
});

document.querySelector("#drum7").addEventListener("click", function (): void {
  playSample2(6);
  recordABeat(6);
});

document.querySelector("#drum8").addEventListener("click", function (): void {
  playSample2(7);
  recordABeat(7);
});

document.querySelector("#drum9").addEventListener("click", function (): void {
  playSample2(8);
  recordABeat(8);
});

//play/stop_button_EventListener
playButton.addEventListener("click", function (): void {
  console.log(this);
  toggleClasses(this, stopButton);
  boolPlayStop = true;
  checkBeat();
});

stopButton.addEventListener("click", function (): void {
  toggleClasses(this, playButton);
  boolPlayStop = false;
  checkBeat();
});

//Record_button_EventListener
recordButton.addEventListener("click", function (): void {
  toggleClasses(this, recordButtonRed);
  boolRecord = true;
});
recordButtonRed.addEventListener("click", function (): void {
  toggleClasses(this, recordButton);
  boolRecord = false;
});

//Random_button_EventListener
randomButton.addEventListener("click", playRandomSample);


//FUNKTIONS
//Play_function(2)
function playSample2(x: number): void {
  sound[x].play();
}

function checkBeat(): void {
  console.log(boolPlayStop);
  if (boolPlayStop === true) {
    beatInterval = setInterval(function (): void {
      if (i < beatArray.length) {
        playSample2(beatArray[i]);
        i++;
      } else {
        i = 0;
      }
    }, 500);
  } else {
    clearInterval(beatInterval);
  }
}

//Record_function
function recordABeat(x: number): void {
  if (boolRecord == true) {
    beatArray.push(x);
  }
}

//Toggle_function
function toggleClasses(
  firstHtmlElement: HTMLElement,
  secondHtmlElement: HTMLElement
): void {
  firstHtmlElement.classList.add("isHidden");
  secondHtmlElement.classList.remove("isHidden");
}

//random_funktion
// 5 verschiedenen random Sounds hintereinander abspielen
function playRandomSample() {
  // 1) clear beatArray
  beatArray = [];
  // 2) fill beatArray with 5 radnom numbers
  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * 9);

    // fill beatarray with random number
    beatArray.push(randomNum);
  }

  // 3) play beatsArray
  boolPlayStop = true;
  checkBeat();

  // 4) show stop button
  toggleClasses(playButton, stopButton);
}

//KEYBOARD
//Play_Stop_Button_Keyboard_function
function playStopKeyboard(): void {
  if (boolPlayStop == false) {
    toggleClasses(playButton, stopButton);
    boolPlayStop = true;
    checkBeat();
  } else if (boolPlayStop == true) {
    toggleClasses(stopButton, playButton);
    boolPlayStop = false;
    checkBeat();
  }
}

//Record_Button_Keyboard_function
function recordKeyboard(): void {
  if (boolRecord == false) {
    toggleClasses(recordButton, recordButtonRed);
    boolRecord = true;
  } else if (boolRecord == true) {
    toggleClasses(recordButtonRed, recordButton);
    boolRecord = false;
  }
}