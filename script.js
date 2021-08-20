const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

//globals
    var isPressed = false;
    var lastPos;
    var dotArray = [];
    var drawLinesToggle = false;
//globals

console.log('welcome to my mommas house');

var Dot1 = new Dot(50,60,10);
var Dot2 = new Dot(100,120,20);
var Dot3 = new Dot(300,360,30);

//draw our dots.
for (let i = 0; i < dotArray.length; i++) {
    dotArray[i].drawDot();
}

//mousedown listener
canvas.addEventListener('mousedown', function(listener) {
    //gets x and y of the click.
    var mouseX = listener.offsetX;
    var mouseY = listener.offsetY;

    isPressed = true;
    lastPos = {x: listener.offsetX, y: listener.offsetY}
    
    //for each dotArray, check if it's been clicked, tell the dot it's been clicked, and start animating it.
    for(let i = 0; i < dotArray.length; i++){
        if(dotArray[i].clickCheck(mouseX, mouseY)){
            dotArray[i].toggleClicked();
            dotArray[i].hunt(lastPos.x, lastPos.y);
        }
    }
})

//it should only hunt when it's been clicked, it will stop hunting when the mouse is released. we need a mouseup listener.
// mouseup listener
canvas.addEventListener('mouseup', function(listener) {
    isPressed = false;
    lastPos = {x: listener.offsetX, y: listener.offsetY} 

    //it would have to be specific to the dot that is hunting... hmmm
    //needs to know if he is hunting. or if he is clicked?
    for(let i = 0; i < dotArray.length; i++){
        if(dotArray[i].clicked){
            dotArray[i].toggleClicked();
        }
    }
})

//mousemove listner, updates lastPos for every frame more or less.
canvas.addEventListener('mousemove', function(listener){
    //if(isPressed){    lastPos = {x: listener.offsetX, y: listener.offsetY}  }
    lastPos = {x: listener.offsetX, y: listener.offsetY} 
})

function drawButton(){
        if(drawLinesToggle)drawLinesToggle = false; 
        else{
            drawLinesToggle = true;
            for(i=0; i < dotArray.length; i++) dotArray[i].drawLines();
        } 
        console.log('drawLinesToggle is now: ' + drawLinesToggle);
}








//debug button
document.addEventListener('keypress', function (listener) {
    if(listener.key === 'q') {
        console.log('debugging...');
    }
})
