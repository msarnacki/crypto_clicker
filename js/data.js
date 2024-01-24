class Player{
    constructor(money = 0, ownedMiners = [0,0,0,0], ownedCrypto = [0,0], numView="BTC", lastSaveBeforeOff = Date()){
        this.money = money;
        this.ownedMiners = ownedMiners;
        this.ownedCrypto = ownedCrypto;
        this.numView = numView;
        this.lastSaveBeforeOff = lastSaveBeforeOff;
    }
}

//Player object - switched to constructor with default values
var Person = new Player();
    //new Player(
    //money = 0, 
    //ownedMiners = [0, 0, 0, 0],
    //ownedCrypto = [0, 0]
//);