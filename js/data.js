class Player{
    constructor(money = 0, 
                ownedMiners = [0,0,0,0,0,0,0,0], 
                ownedCrypto = [0,0], 
                incomeWhenOff = 0,
                numView="BTC", 
                lastSaveBeforeOff = Date(), 
                mainMultiplier = 1, 
                ownedAchievements = [], 
                visibleUpgrades = [], 
                ownedUpgrades = [],
                ownedEnergy = 0,
                maxUnpaidEnergy = 10,
                allTimeStats = {
                    "allTimeMined_All": 0,
                    "allTimeMined_Miner0": 0,
                    "allTimeMined_Miner1": 0,
                    "allTimeMined_Miner2": 0,
                    "allTimeMined_Miner3": 0,
                    "allTimeMined_Miner4": 0,
                    "allTimeMined_Miner5": 0,
                    "allTimeMined_Miner6": 0,
                    "allTimeMined_Miner7": 0
                }){
        this.money = money;
        this.ownedMiners = ownedMiners;
        this.ownedCrypto = ownedCrypto;
        this.incomeWhenOff = incomeWhenOff;
        this.numView = numView;
        this.lastSaveBeforeOff = lastSaveBeforeOff;
        this.mainMultiplier = mainMultiplier;
        this.ownedAchievements = ownedAchievements;
        this.visibleUpgrades = visibleUpgrades;
        this.ownedUpgrades = ownedUpgrades;
        this.ownedEnergy = ownedEnergy;
        this.maxUnpaidEnergy = maxUnpaidEnergy;
        this.allTimeStats = allTimeStats;
        

        /*for (let MinerIndex = 0; MinerIndex < this.ownedMiners.lenght; MinerIndex++) {
            this.allTimeStats["allTimeMined_Miner" + String(MinerIndex)] = 0.0;  
        }*/
    }
}

//Player object - switched to constructor with default values
var Person = new Player();
    //new Player(
    //money = 0, 
    //ownedMiners = [0, 0, 0, 0],
    //ownedCrypto = [0, 0]
//);