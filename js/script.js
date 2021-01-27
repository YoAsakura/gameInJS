const playerBox = document.querySelector('.player');
const hook = document.querySelector('.hook');
const chein = document.querySelector('.chein');
const gameBox = document.querySelector('.game');
const dieText = document.querySelector('.die-heading');
const count = document.querySelector('.count');
const repeatBtn = document.querySelector('.repeat-btn');
const score = document.querySelector('.score');

var TIME = 0;
var COORDINATE_MIN_X = 70;
var COORDINATE_MAX_X = 1000;
var COORDINATE_MIN_Y = 0;
var COORDINATE_MAX_Y = 430;


var randomInteger = function (min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

window.addEventListener('keydown', startGame);

function hookMove() {
    hook.classList.add('hook-move');
    chein.classList.add('chein-move');
}

playerBox.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
        x: evt.clientX,
        y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };


        if ((playerBox.offsetTop - shift.y) >= COORDINATE_MIN_Y && (playerBox.offsetTop - shift.y) <= COORDINATE_MAX_Y) {
            playerBox.style.top = (playerBox.offsetTop - shift.y) + 'px';
        } else {
            if ((playerBox.offsetTop - shift.y) <= COORDINATE_MIN_Y) {
                playerBox.style.top = COORDINATE_MIN_Y + 'px';
            } else {
                playerBox.style.top = COORDINATE_MAX_Y + 'px';
            }
        }

        if ((playerBox.offsetLeft - shift.x) >= COORDINATE_MIN_X - 70 && (playerBox.offsetLeft - shift.x) <= (COORDINATE_MAX_X - 70)) {
            playerBox.style.left = (playerBox.offsetLeft - shift.x) + 'px';
        } else {
            if ((playerBox.offsetLeft - shift.x) <= COORDINATE_MIN_X) {
                playerBox.style.left = COORDINATE_MIN_X - 70 + 'px';
            } else {
                playerBox.style.left = COORDINATE_MAX_X - 70 + 'px';
            }
        }
    }
    var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function startGame() {
    hookMove();
    let hookStart = setInterval(() => hook.style.top = randomInteger(0, 400) + 'px', 500);
    let cheinStart = setInterval(() => chein.style.top = (parseInt(hook.style.top) + 30) + 'px', 500);
    let stopwatch = setInterval(() => timeSet(), 500);

    function timeSet() {
        TIME++;
        count.textContent = TIME;
        score.textContent = 'Ваш счет: ' + TIME;
    };

    window.removeEventListener('keydown', startGame);

    function gameOverFoo() {
        document.querySelector('.sound-break').play();
        document.querySelector('.sound-die').play();
        playerBox.classList.add('disable-content');
        hook.classList.add('disable-content');
        chein.classList.add('disable-content');
        gameBox.classList.add('show-content');
        dieText.classList.add('show-text');
        score.classList.add('show-text');
        repeatBtn.classList.add('btn-repeat-anima');
        clearInterval(timer);
        clearInterval(stopwatch);
        clearInterval(hookStart);
        clearInterval(cheinStart);
    }

    function repeatGameFoo() {
        playerBox.classList.remove('disable-content');
        hook.classList.remove('disable-content');
        chein.classList.remove('disable-content');
        chein.classList.remove('disable-content');
        gameBox.classList.remove('show-content');
        dieText.classList.remove('show-text');
        score.classList.remove('show-text');
        hook.classList.remove('hook-move');
        chein.classList.remove('chein-move');
        TIME = 0;
        count.textContent = TIME;
        score.textContent = 'Ваш счет: ' + TIME;
    }

    repeatBtn.addEventListener('click', function(evt){
        evt.preventDefault;
        repeatBtn.classList.remove('btn-repeat-anima');
        repeatGameFoo();
        window.addEventListener('keydown', startGame);
    });

    
    let timer = setInterval(() => gameOver(), 5);
    function gameOver() {
        if (((playerBox.offsetTop - 50) <= hook.offsetTop) && ((playerBox.offsetTop + 70) >= hook.offsetTop) && (playerBox.offsetLeft <= hook.offsetLeft) && ((playerBox.offsetLeft + 70) >= hook.offsetLeft)){
            gameOverFoo();
        }
    };
}