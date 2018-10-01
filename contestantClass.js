class Contestant {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
    adjustScore(amount, answeredCorrectly){
        if (answeredCorrectly === false){amount = amount * -1}
        this.score = this.score + amount;
        console.log(this.score)
    }
}