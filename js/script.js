'use strict';

/* Нахождение всех игровых элементов */
const playerBox = document.querySelector('.player');
const hook = document.querySelector('.hook');
const chein = document.querySelector('.chein');
const gameBox = document.querySelector('.game_box');
const dieText = document.querySelector('.die-heading');
const count = document.querySelector('.count');
const repeatBtn = document.querySelector('.repeat-btn');
const score = document.querySelector('.score');
const startGameText = document.querySelector('.start-game-text');
const breakSound = document.querySelector('.sound-break');
const dieSound = document.querySelector('.sound-die');

/* Размеры игрового поля и начало таймера */

var TIME = 0;
const COORDINATE_MIN_X = 70;
const COORDINATE_MAX_X = 1000;
const COORDINATE_MIN_Y = 0;
const COORDINATE_MAX_Y = 430;

/* Функция рандомного числа */

var randomInteger = function (min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};


/* Назначение клавиши для начала игры */

window.addEventListener('keydown', keyToStart);
function keyToStart(evt) {
    if (evt.code === 'KeyF') {
        startGame()
    }
}

/* Функция для назначения анимации динамическим элементам */

function hookMove() {
    hook.classList.add('hook-move');
    chein.classList.add('chein-move');
}

/* Функция для переноса мышью игрового элемента */

playerBox.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    let startCoords = {
        x: evt.clientX,
        y: evt.clientY
    };

    let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };

        /* Параметры для ограничения переноса за игровое поле */

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

    /* Функция для отжатия клавиши мыши */

    let onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

   /* Функция начала игры */

function startGame() {
    hookMove();
    startGameText.classList.add('disable-content');
    let hookStart = setInterval(() => hook.style.top = randomInteger(0, 400) + 'px', 800);
    let cheinStart = setInterval(() => chein.style.top = (parseInt(hook.style.top) + 30) + 'px', 800);
    let TimeStart = setInterval(() => timeSet(), 800);

    function timeSet() {
        TIME++;
        count.textContent = TIME;
        score.textContent = 'Ваш счет: ' + TIME;
    };

    window.removeEventListener('keydown', keyToStart);

    repeatBtn.addEventListener('click', function (evt) {
        evt.preventDefault;
        repeatBtn.classList.remove('btn-repeat-anima');
        repeatGameFoo();
        window.addEventListener('keydown', keyToStart);
    });

      /* Функция окончания игры */

    function gameOverFoo() {
        playerBox.classList.add('disable-content');
        hook.classList.add('disable-content');
        chein.classList.add('disable-content');
        gameBox.classList.add('die-animation');
        dieText.classList.add('die-text-animation');
        score.classList.add('die-text-animation');
        repeatBtn.classList.add('btn-repeat-anima');
        clearInterval(DefeatControl);
        clearInterval(TimeStart);
        clearInterval(hookStart);
        clearInterval(cheinStart);
        breakSound.play();
        dieSound.play();
    }

    /* Таймер и функция для контроля попадания по игровому элементу */

    var DefeatControl = setInterval(() => gameOver(), 10);

    function gameOver() {
        if (((playerBox.offsetTop - 50) <= hook.offsetTop) && ((playerBox.offsetTop + 70) >= hook.offsetTop) && (playerBox.offsetLeft <= hook.offsetLeft) && ((playerBox.offsetLeft + 70) >= hook.offsetLeft)) {
            gameOverFoo();
        }
    };
}

/* Функция для перезапуска игры */

function repeatGameFoo() {
    playerBox.classList.remove('disable-content');
    hook.classList.remove('disable-content');
    chein.classList.remove('disable-content');
    chein.classList.remove('disable-content');
    gameBox.classList.remove('die-animation');
    dieText.classList.remove('die-text-animation');
    score.classList.remove('die-text-animation');
    hook.classList.remove('hook-move');
    chein.classList.remove('chein-move');
    TIME = 0;
    count.textContent = TIME;
    score.textContent = 'Ваш счет: ' + TIME;
}