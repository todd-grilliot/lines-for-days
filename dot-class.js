class Dot {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = baseDotColor;
        this.name = dotArray.length;

        this.clicked = false;
        this.parabolaToggle = false;
        this.dropX;
        this.dropY;
        dotArray.push(this);
    }

      drawDot(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0*Math.PI,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    //draw the lines silly
    drawLines(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);

        //deciding who this dot draws his line to. If this is the last dot in the array, he draws back to the first one.
        if(this.name === dotArray.length - 1)ctx.lineTo(dotArray[0].x, dotArray[0].y);
        else(ctx.lineTo(dotArray[this.name +1].x, dotArray[this.name +1].y ));

        //ctx.strokeStyle = "#FFFF";
        ctx.strokeStyle = "#FFFF00";
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    //draw a parabola.
    drawParabola(){
        //define neighbors
        var next;
        var prev;

        if(this.name === dotArray.length - 1){console.log('this is the last dot'); next = dotArray[0];}
        else next = dotArray[this.name + 1];
        if(this.name === 0){console.log('this is the first dot'); prev = dotArray[dotArray.length - 1];}
        else prev = dotArray[this.name - 1];

        //loop to draw the lines. the interval calculation gets kind of messy.. I didn't want to make any new vars
        for (let i = 0; i < parabolaInt; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x - ((this.x - next.x)*((i+1)/parabolaInt)), this.y - ((this.y - next.y)*((i+1)/parabolaInt)));
            ctx.lineTo(this.x - ((this.x - prev.x)*((parabolaInt - i)/parabolaInt)), this.y - ((this.y - prev.y)*((parabolaInt - i)/parabolaInt)));

            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        

    }

    //to see if you clicked within the dot.
    //clickCheck is the same as touchCheck, but touchCheck is much narrower. < to help it to know when to stop hunting.
    clickCheck(mouseX, mouseY){
        if(mouseX > this.x - this.size && mouseX < this.x + this.size && mouseY > this.y - this.size && mouseY < this.y + this.size){
            return true;
        }else return false;
    }
    touchCheck(mouseX, mouseY){
        var curb = 10;
        if(mouseX > this.x - this.size/curb && mouseX < this.x + this.size/curb && mouseY > this.y - this.size/curb && mouseY < this.y + this.size/curb){
            return true;
        }else return false;
    }

    //targetX, targetY
    hunt(x, y){
 
        var touching = false;

        //dropXY (class global) is the pos of the mouse when clicked becomes false. if() its not clicked, just use the last pos of dropXY.
        if(this.clicked){ 
            this.dropX = lastPos.x;
            this.dropY = lastPos.y;
        }

        //setting the speed that it should move for the next frame.
        var offsetX = this.x - x;
        var offsetY = this.y - y;
        this.x = this.x - offsetX/15;
        this.y = this.y - offsetY/15;

        ctx.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0*Math.PI,2*Math.PI);
        ctx.fill();
        ctx.stroke();

        //maintain all of the other dots in their place.
        for (let i = 0; i < dotArray.length; i++) {
            dotArray[i].drawDot();
            if(drawLinesToggle) dotArray[i].drawLines();
            if(this.parabolaToggle === true) this.drawParabola();
        }

        //touch check - check each frame if he is touching the mouse.
        // if the mouse is pressed, or if he is not touching the mouse, request frame.
        // this way, if the mouse is not pressed, but he hasn't reached the mouse lastPos yet, he will continue to move.
        if(this.touchCheck(x,y)){touching = true}
        //if(this.clicked || !touching) requestAnimationFrame(this.hunt.bind(this, x, y));
        //if(this.clicked || !touching) requestAnimationFrame(this.hunt.bind(this, lastPos.x, lastPos.y));
        if(this.clicked || !touching) requestAnimationFrame(this.hunt.bind(this, this.dropX, this.dropY));
    }

    //toggles between true and false for the value "clicked"
    toggleClicked(){
        if(this.clicked){
            this.clicked = false;
        }else{ 
            this.clicked = true;
            dotSelected = this.name;

            //reset all colors.
            resetColors();
            this.color = selectedDotColor;
            console.log(`selected: ${dotSelected}`);
        }
    }
}