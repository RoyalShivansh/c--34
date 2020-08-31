var hypnoticBall;
var database ; 
var position;

function setup(){
    //create the database and save it
    database = firebase.database();
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //refer to a location in the database 
    var hypnoticBallPosition = database.ref('ball/position');
    //creates a listner ,keeps listining t changes in the database
    //read position will be called for every change in the position value
    // show error will be called if problem in reading values
    hypnoticBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    //draw the ball only when position is not equal to undefined
    if (position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
         }
         else if(keyDown(RIGHT_ARROW)){
             writePosition(1,0);
         }
         else if(keyDown(UP_ARROW)){
             writePosition(0,-1);
         }
         else if(keyDown(DOWN_ARROW)){
             writePosition(0,+1);
         }
         drawSprites();

    }
}

//writes the new position inside the database


function writePosition(x,y){
    //refers to the place and set the value
 database.ref('ball/position').set({
    'x':position.x+x,
    'y':position.y+y
 })

}


//reads the position from the database
function readPosition(data){
position = data.val();
console.log(position.x);
hypnoticBall.x = position.x;
hypnoticBall.y= position.y;

}

function showError(){
console.log("error in reading from the database");



}


