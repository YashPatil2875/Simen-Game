let gameSeq = []; 
let userSeq = [];
let highScore = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false; 
let level = 0;

let h2 = document.querySelector('h2'); 

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;
        levelUP();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUP() {
    level++; 
    userSeq = [];
    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random() * 4); 
    let randColor = btns[randidx]; 
    let randbtn =  document.querySelector(`.${randColor}`);
    // console.log(randidx);
    // console.log(randColor);
    // console.log(randbtn);
    gameSeq.push(randColor); 
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx) {
    // console.log("curr level : ", level);
    

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUP, 250);
        }
    } else { 
        highScore.push(level - 1);
        let result = highScore.reduce((max, el) => {
            if(el > max) {
                    return el;
                } else {
                    return max;
                } 
            });
        h2.innerHTML = `Game Over!! Your score was <b>${level-1}</b> <br>Press any key to start <h5><b>Your High Score is ${result}</b></h5>`;
         
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () { 
            document.querySelector("body").style.backgroundColor = "white"; 
        }, 150);
        reset();
    }

}

function btnPressed() {
    let btn = this; 
    // console.log(this);
    userFlash(btn);

    userColor = btn.getAttribute("id"); 
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPressed);
} 

function reset() { 
    level = 0; 
    gameSeq = []; 
    userSeq = []; 
    started = false;
}

