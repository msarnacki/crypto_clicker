class Upgrade{
    constructor(number = 0, name = "Empty", description = "[]", cost = 0, action = ""){
        this.number = number;
        this.name = name;
        this.description = description;
        this.action = action;
    }
}

var lUpgrades = [
    new Upgrade(number = 1, name = "First multiplier", description = "Earn 2x", cost = 100, action = "UpgradeAction1()"),
    new Upgrade(number = 2, name = "Second multiplier", description = "Earn 3x", cost = 1000, action = "UpgradeAction2()")
];

//runs every tick
function checkUpgrades() {
    // array 1, ... , numOfUpgrades 
    UpgradesNumbers = Array.from({length: lUpgrades.length}, (_, i) => i + 1)
    lUpgrades.forEach(Upgrade => {
        //if Upgrade.number is not in Person.ownedUpgrades
        // if not owned check if can be bought (money) - button clickable or not
        if (!(Person.ownedUpgrades.includes(Upgrade.number))) {
            if (Person.money >= Upgrade.cost){
                // turn on or off button clickaility
            }
        }
    });
    
    $("#lOwnedAchievements").html(Person.ownedUpgrade.toString());
}

//TODO add cost
function buyUpgrade(upgradeLevel) {

    Person.mainMultiplier = Person.mainMultiplier * 2;
    updateAllLabels();
}
