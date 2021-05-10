function playSample(sounds: string) {
  var sound: HTMLAudioElement = new Audio(sounds); 
  sound.play();
}

var beats: string[] = ["kick.mp3","kick.mp3","snare.mp3","kick.mp3", "hihat.mp3"];

var index: number = 0;

document.querySelector('#drum1').addEventListener('click', function () { playSample("kick.mp3") });
document.querySelector('#drum2').addEventListener('click', function () { playSample("snare.mp3") });
document.querySelector('#drum3').addEventListener('click', function () { playSample("hihat.mp3") });
document.querySelector('#drum4').addEventListener('click', function () { playSample("F.mp3") });
document.querySelector('#drum5').addEventListener('click', function () { playSample("G.mp3") });
document.querySelector('#drum6').addEventListener('click', function () { playSample("A.mp3") });
document.querySelector('#drum7').addEventListener('click', function () { playSample("C.mp3") });
document.querySelector('#drum8').addEventListener('click', function () { playSample("laugh-2.mp3") });
document.querySelector('#drum9').addEventListener('click', function () { playSample("laugh-1.mp3") });
document.querySelector('#playbutton').addEventListener('click', function () {

  var interval: number = setInterval(function () {
      var beat: HTMLAudioElement = new Audio(beats[index]); 
      beat.play();

      index = index + 1;

      if (index == 5) {
          index = 0;
      }

  }, 300);
});
