class Player{
    constructor(money, ownedMiners, ownedCrypto){
        this.money = money;
        this.ownedMiners = ownedMiners;
        this.ownedCrypto = ownedCrypto;
    }
}

//Player object
var Person = new Player(
    money = 0, 
    ownedMiners = [0, 0, 0, 0],
    ownedCrypto = [0, 0]
);

var numView = "BTC"