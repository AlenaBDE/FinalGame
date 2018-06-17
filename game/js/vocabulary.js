let words = [
    {
        "word": "home",
        "translate1": "дом",
        "translate2": "домик",
        "translate3": "хата",
        "translate4": "хатка"
    },
    {
        "word": "door",
        "translate1": "дверь",
        "translate2": "дверька"
    },
    {
        "word": "deal",
        "translate1": "сделка",
        "translate2": "дело",
        "translate3": "сотрудничество",
        "translate4": "договор"
    },
    {
        "word": "son",
        "translate1": "сын",
        "translate2": "сыночек",
        "translate3": "сынишка",
        "translate4": "сынуля"
    },
    {
        "word": "voyage",
        "translate1": "путешествие",
        "translate2": "рейс",
        "translate3": "перелет",
        "translate4": "полет"
    },
    {
        "word": "pillar",
        "translate1": "столб",
        "translate2": "колонна",
        "translate3": "опора",
        "translate4": "стержень"
    }
]


class TaskWords {
    constructor() {
        this.index = getRandomInt(0, words.length);
        this.getWord = function () {
            return words[this.index].word;
        }
    }

    checkWord(str) {
        for (let key in words[this.index]) {
            if (words[this.index][key] === str) {
                return true;
            }
        }
        return false;
    }
}
