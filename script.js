var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var upCounter = 0;
var downCounter = 0;
var up = false;
var down = false;
var x = canvas.width/2 + 150;
var y = canvas.height + 150;
function canvasDraw()
{
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = "red";
    ctx.fillRect(x,y,100,50);
    
}
init();
window.addEventListener('resize',()=>{
  recognition.stop();
  init();
});
// Speech Recognition Code

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
const icon = document.querySelector('i.fa.fa-microphone')
let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');
var final_transcript;
let final_span = document.getElementById("final_span");
let interim_span = document.getElementById("interim_span");
recognition.continuous = true;
recognition.interimResults = false;
icon.addEventListener("click",function(){
    final_transcript = '';
    dictate();
});
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
var first_char = /\S/;
function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
  }
const dictate = function(){
    recognition.start();
    recognition.onresult = function(event){
        var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;

      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerText = final_transcript;
    checkCount(final_transcript);
    canvasUpdate();
    final_transcript = '';
    // interim_span.innerHTML = interim_transcript;
    }
    recognition.onspeechend = function() {
        recognition.stop();
        container.innerText = '';
    }
}
function checkCount(str)
{
  const arr = str.split(" ");
  arr.forEach(e => {
    if(e.toUpperCase() === "UP")
    {
      up =true;
      upCounter++;
    }
    else
    {
      up = false;
    }
    if(e.toUpperCase() === "DOWN")
    {
      down = true;
      downCounter++;
    }
    else
    {
      down = false;
    }
    console.log(upCounter,downCounter);
  });
}

function canvasUpdate()
{
  if(up)
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(x,y-(upCounter*5),100,50);
    ctx.closePath();
  }
  if(down)
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(x,y+(downCounter*5),100,50);
    ctx.closePath();
  }
}
function init()
{
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth/2;
  canvasDraw();
}