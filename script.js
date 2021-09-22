const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

//globals
    var isPressed = false;
    var lastPos;
    var dotArray = [];
    var dotSelected = -1;
    var drawLinesToggle = false;
//globals
//Style
    var baseDotColor = "#000000"; //black
    var selectedDotColor = "#2a316b"
//Style
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

//************************************ a bunch a buttons */
function addButton(){
    var maxSize = 35;
    var minSize = 10;
    var tolerance = 100;
    var randX = Math.floor(Math.random()*1400);
    var randY = Math.floor(Math.random()*700);
    var randSize = Math.floor(Math.random()*(maxSize - minSize) + minSize);

    //check to see if it's too close to another dot.
    for( i=0; i < dotArray.length; i++){
        if (dotArray[i].x > randX - tolerance && dotArray[i].x < randX + tolerance && dotArray[i].y > randY - tolerance && dotArray[i].y < randY + tolerance){
            console.log(`rand xy too close at: ${randX}, ${randY} resetting...`);
            console.log(`too close to Dot${dotArray[i].name} at ${dotArray[i].x}, ${dotArray[i].y}`);
            addButton();
            return;
        }
    }
    console.log(`new rand dot: ${randX}, ${randY}, size: ${randSize}`);
    new Dot(randX, randY, randSize);
    //dotArray[dotArray.length-1].drawDot();
    refresh();
}

function deleteButton(){
    //remove the last one from the array and make it null.
    console.log('this is the delete button');
    dotArray.pop();
    refresh();
}

function drawButton(){
    if(drawLinesToggle){
        drawLinesToggle = false;
        refresh();
    } 
    else{
        drawLinesToggle = true;
        for(i=0; i < dotArray.length; i++) dotArray[i].drawLines();
    } 
    console.log('drawLinesToggle is now: ' + drawLinesToggle);
}

/// UNDER CONSTRUCTION
function parabolaButton(){
    if(dotSelected >= 0){
        dotArray[dotSelected].drawParabola();}
    else{console.error('you need to select a dot'); return;}
}
//************************************ END a bunch a buttons */

//refresh function
function refresh(){
    console.log('refresh...')
    ctx.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);
    for (let i = 0; i < dotArray.length; i++) {
        dotArray[i].drawDot();
        if(drawLinesToggle) dotArray[i].drawLines();
    }
}
//^^^ might have problems with color? we'll have to see i guess

function resetColors(){
    for (let i = 0; i < dotArray.length; i++) {
        dotArray[i].color = baseDotColor; 
    }
}


//debug button
document.addEventListener('keypress', function (listener) {
    if(listener.key === 'q') {
        console.log('debugging...');
        console.log(dotSelected);
    }
})

//make a color palete selector!!! and then as things are being created they are assigned random colors! from the palete array of color!
// you could even make it so each time that you refresh the colors are randomized again within the palete!!
// and then you just gotta get it so they are drawing lines on lines. and have an option for that.

// make a number selector! so they can set numbers for rand x y and size!
