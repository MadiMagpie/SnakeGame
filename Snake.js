var ctx, drawSurface;
var width = 10;
var food;
var arr;
var direction;
var tail;
window.addEventListener("keydown", onKeyDown, false);
var timer;
var x, y;
var moveX;
var moveY;
var score;
var arr = [];

function setup() {
    var loop;
    drawSurface = document.getElementById("drawSurface");
    ctx = drawSurface.getContext("2d");
    direction = "Right";
    makeSnake();
    makeFood();
    score = 0;
    alert("Use the arrow keys to move.\nDon't hit the wall or your own tail!");
    
    var level = prompt("Choose a level:\n  Easy\n  Medium\n  Hard");
    switch (level.toLowerCase()) {
    case 'easy':
        if (timer !== "undefined") {
            clearInterval(timer);
            timer = setInterval(doItAll, 75);
        }
            
        break;
    case 'medium':
        if (timer !== "undefined") {
            clearInterval(timer);
            timer = setInterval(doItAll, 50);
        }
        break;
    case 'hard':
        if (timer !== "undefined") {
            clearInterval(timer);
            timer = setInterval(doItAll, 35);
        }
            
        break;
            
    default:
        alert("You did not enter a valid level. Assuming medium.");
        if (timer !== "undefined") {
            clearInterval(timer);
            timer = setInterval(doItAll, 50);
        }
    }
}


function drawFood(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * 10, y * 10, 10, 10);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * 10, y * 10, 10, 10);
}

function drawSnake(x, y) {
    ctx.fillStyle = "green";
    ctx.fillRect(x * 10, y * 10, 10, 10);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * 10, y * 10, 10, 10);
}

//draw that array!!! 
function makeSnake(x, y) {
    var i;
    var length = 1;
    for (i = length - 1; i >= 0; i--) {
        arr.push({x: i, y: 0});
    //starts snake at coordinate (0, 0)
    }
    for (i = 0; i < arr.length; i++) {
        drawSnake(arr[i].x, arr[i].y);
    }
}

//randomize where the food appears but make it round
function makeFood() {
    food = {
        x: Math.round(Math.random() * (450 - 10) / 10),
        y: Math.round(Math.random() * (450 - 10) / 10)
    };
    drawFood(food.x, food.y);
}

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
    case 38://up
        if (direction !== "Down") {
            direction = "Up";
        }
        break;

    case 40://down
        if (direction !== "Up") {
            direction = "Down";
        }
        break;

    case 37://left
        if (direction !== "Right") {
            direction = "Left";
        }
        break;

    case 39://right
        if (direction !== "Left") {
            direction = "Right";
        }
        break;
    }
}

//use this in the doItAll function 
function checkCollision(x, y, array) {
    moveX = arr[0].x;
    moveY = arr[0].y;
    var i;
    for (i = 1; i < array.length; i++) {
        if (array[i].x === moveX && array[i].y === moveY) {
            return true;
        }
        return false;
    }
}

function doItAll() {
    var i, j, tail;
    var moveX, moveY, beep, boop, endScore;
    ctx.clearRect(0, 0, 450, 450);
    
    moveX = arr[arr.length - 1].x;
    moveY = arr[arr.length - 1].y;
    
    
    if (direction === "Right") {
        
        moveX = moveX + 1;
    } else if (direction === "Left") {
        moveX = moveX - 1;
    } else if (direction === "Up") {
        moveY = moveY - 1;
    } else if (direction === "Down") {
        moveY = moveY + 1;
    }
    
//set boundaries
    if (moveX === -1 || moveX === (450 / 10) || moveY === -1 ||  moveY === (450 / 10) || checkCollision(arr.length.x, arr.length.y, arr)) {
        alert("You Lost!");
        reset();
    }
        
    if (moveX === food.x && moveY === food.y) {
        tail = {x: moveX, y: moveY};
        arr.push(tail);
        score = score + 1;
        makeFood();
    } else {

        arr.push({x: moveX, y: moveY});
        arr.shift();
        
    }
    
    endScore = score;
    for (j = 0; j < arr.length; j++) {
        drawSnake(arr[j].x, arr[j].y);
    }
    ctx.fillStyle = "black";
    ctx.fillText(endScore, 10, 440);  
    drawFood(food.x, food.y);
}

function reset() {
	clearInterval(timer);
    timer = "undefined";
	window.location.reload();
}
    