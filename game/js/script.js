let score = [];
let user = {name: '', count: 0};


function setLocalStorage() {
    if (localStorage.getItem('score') !== null) {
        score = JSON.parse(localStorage.getItem('score'));
    }
    else {
        localStorage.setItem('score', JSON.stringify(score));
    }
}

function registration() {
    user.name = document.getElementById('fname').value;
    if (user.name != '') {
        document.getElementById('win').style.visibility = 'hidden';
        windowTask();
    }
}

function startGame() {
    document.getElementById('score').style.visibility = 'hidden';
    document.getElementById('choice').style.visibility = 'hidden';
    document.getElementById('win').style.visibility = 'visible';
    taskTimer.stopTimer();
    taskTimer.setValue(15);
    user.count = 0;
}

function addScore(item) {

    function compareCount(a, b) {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
    }

    if (score.length == 5) {
        score.forEach(function (t, number, arr) {
                if (item.count > t.count) {
                    arr.splice(number, 1, item);
                    return;
                }
            }
        )
    }
    else {
        score.push(item);
    }
    if (score.length > 1) {
        score.sort(compareCount);
    }
    localStorage.setItem('score', JSON.stringify(score));
}


let nameMonster = document.getElementById('name');
nameMonster.innerHTML = massPrill[randMassPrill] + ' ' + massType[randMassType] + ' ' + massName[randmassName];
let timerID = 0;


let taskTimer = new Timer(15);

function windowTask() {
    setLocalStorage();
    createMonster();

    let elements = forms.setForms();
    let countSeconds = 0;

    function attempt(value) {
        if (value) {
            body.lifeM.setHp(body.lifeM.getHp() - 20);
        }
        else {
            body.lifeU.setHp(body.lifeU.getHp() - 20);
        }
    }

    function showScore() {
        let tr = document.getElementById('score');
        score.forEach(function (item, index, arr) {
                tr.children[0].children[0].children[2 + index].children[1].innerHTML = item.name;
                tr.children[0].children[0].children[2 + index].children[2].innerHTML = item.count;
            }
        )
        document.getElementById('score').style.visibility = 'visible';
    }

    function checkHealth() {
        if (!body.lifeM.dead()) {
            forms.setForms();
        } else {
            user.count += 1;
            windowTask();
        }

        if (!body.lifeU.dead()) {
            forms.setForms();
        } else {
            addScore(user);
            showScore();
        }
    }

    function checkTimer() {
        if (taskTimer.value() == '0') {
            clearInterval(timerID);
            forms.setForms('div');
            elements.newDiv.innerHTML = "Время закончилось! Переход хода к монстру";
            countSeconds += 15;
            attempt(false);
            setTimeout(checkHealth, 2000);
        }
    }

    function buttonClick(value, result) {
        taskTimer.stopTimer();
        elements.vvod.style.visibility = 'hidden';
        elements.button.style.visibility = 'hidden';
        elements.img.style.visibility = 'hidden';
        if (value == result) {
            countSeconds += 15 - taskTimer.value();
            elements.newDiv.innerHTML = "Верно!";
            attempt(true);
        } else {
            elements.newDiv.innerHTML = "Не верно! Переход хода к монстру";
            countSeconds += 15;
            attempt(false);
        }
        clearInterval(timerID);
        setTimeout(checkHealth, 2000);
    }

    arifmetic.onclick = function () {
        arifmeticTask();
    }

    audio.onclick = function () {
        audioTask();
    }

    translate.onclick = function () {
        translateTask();
    }


    function arifmeticTask() {
        forms.setForms('arifmetic');
        let massSign = ['+', '-', '*'];
        taskTimer.startTimer();
        timerID = setInterval(checkTimer, 100); // переработать

        let ran1 = Math.floor(Math.random() * (100 - 1 + 1)) + 100;
        let ran2 = Math.floor(Math.random() * (100 - 1 + 1)) + 100;
        let sum = "" + ran1 + ' ' + massSign[Math.floor(Math.random() * massSign.length)] + ' ' + ran2;

        elements.newDiv.innerHTML = sum + " = ";
        elements.newDiv.style.display = 'inline';
        let result = eval(sum);

        elements.button.onclick = function () {
            buttonClick(elements.vvod.value, +result);
        }
    }


    function translateTask() {
        let word = new TaskWords();

        taskTimer.startTimer();
        setInterval(checkTimer, 100);

        forms.setForms('translate');

        elements.newDiv.innerHTML = "Перевод " + word.getWord() + " ";
        elements.newDiv.style.display = 'inline';

        elements.button.onclick = function () {
            buttonClick(word.checkWord(vvod.value), true);
        }
    }


    function audioTask() {
        forms.setForms('audio');
        let mass = ['economic', 'inspiration', 'vocabulary', 'design', 'redundancy', 'run', 'probability'];
        let massRandom = 0;
        taskTimer.startTimer();
        setInterval(checkTimer, 100);

        elements.img.onclick = function () {
            massRandom = Math.floor(Math.random() * mass.length);
            speechSynthesis.speak(new SpeechSynthesisUtterance(mass[massRandom]));
        }

        elements.button.onclick = function () {
            buttonClick(mass[massRandom], elements.vvod.value);
        }
    }
}

class Forms {
    constructor() {
        this.elements = {};
        this.elements.task = document.getElementById('content-task');
        this.elements.vvod = document.getElementById('vvod');
        this.elements.newDiv = document.getElementById('span-text');
        this.elements.button = document.getElementById('button-result');
        this.elements.img = document.getElementById('div-image');
        this.elements.modalTask = document.getElementById('task');
        this.elements.modalChoice = document.getElementById('choice');
        this.elements.newDiv.innerHTML = "";
        this.elements.vvod.value = '';
    }

    setForms(form) {

        for (let key in this.elements) {
            this.elements[key].style.visibility = 'hidden';
        }

        switch (form) {
            case 'arifmetic':
            case 'translate':
                this.elements.modalTask.style.visibility = 'visible';
                this.elements.newDiv.style.visibility = 'visible';
                this.elements.vvod.style.visibility = 'visible';
                this.elements.button.style.visibility = 'visible';
                break;

            case 'audio':
                this.elements.modalTask.style.visibility = 'visible';
                this.elements.newDiv.style.visibility = 'visible';
                this.elements.vvod.style.visibility = 'visible';
                this.elements.button.style.visibility = 'visible';

                this.elements.img.style.visibility = 'visible';
                break;
            case 'div':
                this.elements.modalTask.style.visibility = 'visible';
                this.elements.newDiv.style.visibility = 'visible';
                break;

            default:
                this.elements.modalChoice.style.visibility = 'visible';
                break;
        }

        return this.elements;
    }
}

let forms = new Forms();

startGame();
