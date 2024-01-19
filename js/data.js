class Player{
    constructor(money = 0, ownedMiners = [0,0,0,0], ownedCrypto = [0,0]){
        this.money = money;
        this.ownedMiners = ownedMiners;
        this.ownedCrypto = ownedCrypto;
    }
}

//Player object - switched to constructor with default values
var Person = new Player();
    //new Player(
    //money = 0, 
    //ownedMiners = [0, 0, 0, 0],
    //ownedCrypto = [0, 0]
//);

var numView = "BTC"