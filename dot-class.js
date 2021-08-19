class Dot {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.name = dotArray.length + 1;

        this.clicked = false;
        this.dropX;
        this.dropY;
        dotArray.push(this);
    }

// /*
//     delete(){
//         this = null;
//       }
//    */ 

      drawDot(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0*Math.PI,2*Math.PI);
        ctx.fill();
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
        this.x = this.x - offsetX/5;
        this.y = this.y - offsetY/5;

        ctx.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0*Math.PI,2*Math.PI);
        ctx.fill();
        ctx.stroke();

        //maintain all of the other dots in their place.
        for (let i = 0; i < dotArray.length; i++) {
            dotArray[i].drawDot();
        }

        //touch check - check each frame if he is touching the mouse.
        // if the mouse is pressed, or if he is not touching the mouse, request frame.
        // this way, if the mouse is not pressed, but he hasn't reached the mouse lastPos yet, he will continue to move.
        if(this.touchCheck(x,y)){touching = true}
        //if(this.clicked || !touching) requestAnimationFrame(this.hunt.bind(this, x, y));
        //if(this.clicked || !touching) requestAnimationFrame(this.hunt.bind(this, lastPos.x, lastPos.y));
        if(this.clicked || !touching) requestAnimationFrame(this.hunt.bind(this, this.dropX, this.dropY));
    }

    toggleClicked(){
        if(this.clicked){
            this.clicked = false;
        }else{ 
            this.clicked = true;
            console.log(`this name: ${this.name}`);
        }
    }
}