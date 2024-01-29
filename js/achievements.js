class Achievement{
    constructor(number = 0, name = "Empty", description = "[]", condition = false){
        this.number = number;
        this.name = name;
        this.description = description;
        this.condition = condition;
    }
}

var lAchievments = [
    new Achievement(number = 1, name = "Journey start", description = "Found your 1st dollar bill", condition = "AchievementCondition1()"),
    new Achievement(number = 2, name = "First miner", description = "Started your mining career", condition = "AchievementCondition2()")
];

function checkAchievements() { 
    AchievementsNumbers = Array.from({length: lAchievments.length}, (_, i) => i + 1)
    lAchievments.forEach(Achievement => {
        if (!(Person.ownedAchievements.includes(Achievement.number))) {
            if (eval(Achievement.condition)){
                Person.ownedAchievements.push(Achievement.number);
                Person.ownedAchievements.sort();
            }
        }
    });
    
    $("#lOwnedAchievements").html(Person.ownedAchievements.toString());
}

function AchievementCondition1() {
    //if (Person.money > 0) {return true;}
    //return false;
    return  Person.money > 0 ? true : false
}

function AchievementCondition2() {
    var sumOwned = 0;
    Person.ownedMiners.forEach(numMiner => {
        sumOwned += numMiner;
    });
    return  sumOwned > 0 ? true : false
}