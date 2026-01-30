const board = document.querySelector('.board');
const score = document.querySelector("#mscore");
const hscore = document.querySelector("#hscore")
const blockheight = 50
const blockwidth = 50
const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);
const blocks = []
score.innerHTML = "0"
let snaketime = document.getElementById("ltime")
let scorenum = 0
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
let newfood = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
// let eggsize = document.querySelector(".newfood").classList.add("newfoodsize")
let eggssize = document.querySelector(".newfood")
let eggs = eggssize.innerHTML = `<span class="newfoodsize"><i class="hgi hgi-stroke hgi-eggs"></i></span>`



console.log(eggs)
let snake = [
    { x: 5, y: 12 },
]
const block = document.createElement("div")
let direction = "left"
let speed = 500
// let minspeed=100
let interval;
let timeinterval;
let startgame = document.querySelector(".btn-start")
let restart = document.querySelector(".btn-over")
let gameovermodal = document.querySelector(".game-over")
let startgamemodal = document.querySelector(".start-game")
let modal = document.querySelector(".modal")
// for (let i =0; i < rows*cols; i++) {
//     const block=document.createElement("div")
//     block.classList.add("block")
//     board.appendChild(block)
// } 



for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        block.innerText = `${row}-${col}`
        blocks[`${row}-${col}`] = block;

    }
}

function time() {

    let seconds = 0;
    timeinterval = setInterval(() => {
        let minutes = Math.floor(seconds / 60);
        let sec = seconds % 60;
        snaketime.innerHTML = `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
        seconds++;
    }, 1000);
}

time()


function updatespeed() {
    // if (scorenum > 0 && scorenum % 10 === 0) {
    //     console.log(speed = Math.max(speed - 100, minspeed))
    //     updateinterval() //restart interval or change speed
    // }
    let newspeed;
    if (scorenum >= 40) {
        newspeed = 100
    }
    else if (scorenum >= 30) {
        newspeed = 200
    }
    else if (scorenum >= 20) {
        newspeed = 300
    }
    else if (scorenum >= 10) {
        newspeed = 400
    }
    else {
        newspeed = 500;
    }

    if (newspeed !== speed) {
        clearInterval(interval);
        speed = newspeed;
        console.log(newspeed)
        updateinterval();
    }
}

const lasthighscore = localStorage.getItem("lasthighscore");
if (lasthighscore) {
    hscore.innerHTML = lasthighscore
}


function render() {

    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add("food")
    blocks[`${newfood.x}-${newfood.y}`].innerHTML = `${eggs}`;
    if (direction === "left") {
        head = {
            x: snake[0].x,
            y: snake[0].y - 1,
        }
    }
    else if (direction === "right") {
        head = {
            x: snake[0].x,
            y: snake[0].y + 1
        }
    }
    else if (direction === "up") {
        head = {
            x: snake[0].x - 1,
            y: snake[0].y
        }
    }

    else if (direction === "down") {
        head = {
            x: snake[0].x + 1,
            y: snake[0].y
        }
    }

    //CONSUME FOOD
    let atefood = false;
    if (food.x === head.x && food.y === head.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        scorenum++
        score.innerHTML = `${scorenum}`
        if (scorenum > Number(lasthighscore)) {
            localStorage.setItem('lasthighscore', scorenum)
        }

        updatespeed()
        atefood = true;
    }
    7
    // Another food consume
    if (newfood.x === head.x && newfood.y === head.y) {
        blocks[`${newfood.x}-${newfood.y}`].innerHTML = ""
        newfood = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        scorenum += 2
        score.innerHTML = `${scorenum}`
        if (scorenum > Number(lasthighscore)) {
            localStorage.setItem('lasthighscore', scorenum)
        }

        updatespeed()
        atefood = true;
    }



    //If snake hit to the wall then game over
 

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })



    snake.unshift(head)
       if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {


        clearInterval(interval);
        modal.style.display = 'flex'
        gameovermodal.style.display = "flex"
        startgamemodal.style.display = 'none'

    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(interval);
            modal.style.display = 'flex'
            gameovermodal.style.display = "flex"
            startgamemodal.style.display = 'none'
            return;
        }

    }

    if (!atefood) {
        snake.pop();
    }




    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");




    })




}

function updateinterval() {

    interval = setInterval(() => {
        render()
    }, speed);

}

addEventListener('keydown', (event) => {

    if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right"
    }
    else if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up"
    }
    else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left"
    }
    else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down"
    }
});


startgame.addEventListener("click", () => {
    document.querySelector(".modal").style.display = 'none';
    updateinterval()
})


restart.addEventListener("click", () => {

    document.querySelector(".modal").style.display = 'none';
    //reset intervals
    clearInterval(interval)
    clearInterval(timeinterval)

    // reset speed
    speed = 500;

    // reset game state
    snake = [
        { x: 5, y: 12 },
    ]
    scorenum = 0;

    score.innerHTML = "0"
    snaketime.innerHTML = "00:00"

    blocks[`${food.x}-${food.y}`].classList.remove("food")
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }






    time()

    updateinterval()


})