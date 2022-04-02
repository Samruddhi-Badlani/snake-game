
let inputDir ={ x: 0, y: 0};
let score= 0;
let highScoreVal ;
let pause = false;

const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3")

let board = document.getElementById('board');
let scoreBox = document.getElementById('score');
let highScoreBox = document.getElementById('highScore');
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 2, y: 9 }
//Game functions
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
   // console.log(ctime);
    gameEngine();
}

function isCollide(snake_arr){

    // If snake collides with itself
    for(let index=1 ; index < snake_arr.length ; index++){
        if(snake_arr[index].x === snake_arr[0].x && snake_arr[index].y === snake_arr[0].y){
            return true;
        }
    }
        if(snake_arr[0].x >= 18|| snake_arr[0].x <=0 ||snake_arr[0].y >= 18|| snake_arr[0].y <=0){
            return true;

        }
    return false;

}
if(!pause){
function gameEngine() {


    //Updating snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play()
        musicSound.pause()
        inputDir = {x:0,y:0}
        alert("Game over, Press any key to play again")
        snakeArr = [{x:13,y:15}]
        
        score = 0;
        scoreBox.innerHTML="Score 0";

    }

    // If food is eaten  : incremenet score and recreate food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){

        foodSound.play();
        score++;
        speed += 0;
        if(score > highScoreVal){
            highScoreVal = score;
            localStorage.setItem('highScore',JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score "+highScoreVal;
        }
        scoreBox.innerHTML = "Score " +score;

        let a = 2
        console.log("eaten");
        let b = 16
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y :snakeArr[0].y + inputDir.y});
        console.log(snakeArr);
        food = {x :Math.round(a+ (b-a)* Math.random()),y :Math.round(a+ (b-a)* Math.random())}

    }

    // Move the snake
    for(let i =snakeArr.length -2 ; i>=0 ; i--){
        const element = snakeArr[i];
        console.log("hello");
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x  += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Display snake and food

    // Display Snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {

        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
}




// Game Logic
window.requestAnimationFrame(main);
musicSound.play();
highScore = localStorage.getItem('highScore');
if(highScore === null){
    highScoreVal=0;
    localStorage.setItem('highScore',JSON.stringify(highScoreVal));
    highScoreBox.innerHTML = "High Score "+highScoreVal;
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score "+highScoreVal;
}

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Starting game
    musicSound.play();
    
    moveSound.play()

    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow up");
            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowDown":
            console.log("Arrow down");
            inputDir.x = 0
            inputDir.y = 1
            break;
        case "ArrowLeft":
            console.log("Arrow left");
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight":
            console.log("Arrow right");
            inputDir.x = 1
            inputDir.y = 0
            break;
        
        default:
            break;
    }
})