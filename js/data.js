class Player{
    constructor(money = 0, ownedMiners = [0,0,0,0], ownedCrypto = [0,0], numView="BTC", lastSaveBeforeOff = Date(), mainMultiplier = 1, ownedAchievements = [], ownedUpgrades = []){
        this.money = money;
        this.ownedMiners = ownedMiners;
        this.ownedCrypto = ownedCrypto;
        this.numView = numView;
        this.lastSaveBeforeOff = lastSaveBeforeOff;
        this.mainMultiplier = mainMultiplier;
        this.ownedAchievements = ownedAchievements;
        this.ownedUpgrades = ownedUpgrades;
    }
}

//Player object - switched to constructor with default values
var Person = new Player();
    //new Player(
    //money = 0, 
    //ownedMiners = [0, 0, 0, 0],
    //ownedCrypto = [0, 0]
//);