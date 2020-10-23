const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");// context .. the thing we are going to make is 2D

//creating the unit
const box = 32;

//load the images
const ground = new Image();
ground.src = "Img/ground.png";

const foodImg = new Image();
foodImg.src = "Img/food.png";


const dead = new Audio();
dead.src = "audio/dead.mp3";
const eat = new Audio();
eat.src = "audio/eat.mp3";
const up = new Audio();
up.src = "audio/up.mp3";
const down = new Audio();
down.src = "audio/down.mp3";
const left = new Audio();
left.src = "audio/left.mp3";
const right = new Audio();
right.src = "audio/right.mp3";

//create the snake
let snake = [];
snake[0] = {
	x : 9 * box,
	y : 10 * box
}

//create the food
let food = {
	x : Math.floor(Math.random()*17+1) * box,
	y : Math.floor(Math.random()*15+3) * box
}
let score =0;
// controlling snake
let d;
document.addEventListener("keydown", direction);

// left 37
//up 38
//right 39
//down 40
function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        left.play();
        d= "LEFT";
    }
    else if(event.keyCode == 38 && d != "DOWN"){
        up.play();
        d= "UP";
    }
    else if(event.keyCode == 39 && d != "LEFT"){
        right.play();
        d= "RIGHT";
    }
    else if(event.keyCode == 40 && d != "UP"){
        down.play();
        d= "DOWN";
    }
}

// check collision
function collision(head, array){
    //body
    for(let i=0; i<array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
//draw everything to canvas
function draw(){
	ctx.drawImage(ground, 0, 0);

	for(let i = 0; i < snake.length; i++){
		ctx.fillStyle = (i == 0)? "green" : "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box)

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box)
    }
   
    ctx.drawImage(foodImg, food.x, food.y);
// old head position 
    let snakeX =snake[0].x;
    let snakeY =snake[0].y;
//Which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    //if snake eat apple
    if(snakeX == food.x && snakeY == food.y ){
        score++;
        eat.play();
        food={
            x : Math.floor(Math.random()*17+1) * box,
	        y : Math.floor(Math.random()*15+3) * box
        }
    }
    else
    {
        snake.pop();
    }
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Game over

    if  (
         snakeX < box ||
         snakeX >17 * box || 
         snakeY <3*box ||
         snakeY > 17 * box ||
         collision(newHead, snake)
        )
        {
        clearInterval(game);
        dead.play();
        alert("Khalaaaaaaaaaaaas!");
        }
    snake.unshift(newHead);

    //Score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

   // call draw function every 200ms
   let game = setInterval(draw, 200); 
   