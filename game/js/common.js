function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function clearDiv(div) {
    while (div.children[0]) {
        div.removeChild(div.children[0]);
    }
}

let massPrill = ['Ужасный', 'Гадкий', 'Злобный', 'Страшный', 'Сопливый'];
let massType = ['орк', 'гном', 'гоблин', 'динозавр', 'микки'];
let massName = ['Валера', 'Макс', 'Дима', 'Анатолий', 'Антонио'];

let randMassPrill = Math.floor(Math.random() * massPrill.length);
let randMassType = Math.floor(Math.random() * massType.length);
let randmassName = Math.floor(Math.random() * massName.length);


//таймер
let intervalID = 0;
let second = document.getElementById('second').innerHTML;

class Timer {

    constructor(sec) {
        this.defaultSec = sec;
        this.timerID = 0;
               
        second = this.defaultSec;
    }

    getTime() {
        function fixTimer(value) {
            let str = String(value);
            let result = (value < 10 && str.length === 1) ? "0" + value : value;
            return result;
        }

        if (second > 0) {
            second--;
        }

        document.getElementById('second').innerHTML = fixTimer(second);
        if (second == 0) {
            clearInterval(this.timerID);
        }
    }

    startTimer() {
        second = this.defaultSec;
        this.timerID = setInterval(this.getTime, 1000);
    }

    stopTimer() {
        clearInterval(this.timerID);
    }

    value() {
        return second;
    }

    setValue(value) {
        second = value;
    }
}



