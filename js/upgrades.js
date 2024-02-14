class Upgrade{
    constructor(number = 0, name = "Empty", description = "[]", cost = 0){
        this.number = number;
        this.name = name;
        this.description = description;
        this.cost = cost;
    }
}

var lUpgrades = [
    new Upgrade(number = 1, name = "First multiplier", description = "Earn 2x", cost = 2),
    new Upgrade(number = 2, name = "Second multiplier", description = "Earn 3x", cost = 51)
];

//runs every tick
function checkUpgrades() {
    // array 1, ... , numOfUpgrades 
    //UpgradesNumbers = Array.from({length: lUpgrades.length}, (_, i) => i + 1)
    lUpgrades.forEach(Upgrade => {
        var updateUpgradeButton = "buyUpgrade".concat('', Upgrade.number.toString());
        document.getElementById(updateUpgradeButton).disabled = true;
        document.getElementById(updateUpgradeButton).style.display = "none";
        //if not owned
        if (!(Person.ownedUpgrades.includes(Upgrade.number))){
            //if not visible
            if (!(Person.visibleUpgrades.includes(Upgrade.number))){
                //check if should be visible
                if (IsVisible(Upgrade.number)){
                //if (eval(Upgrade.isVisible)){
                    //if visible
                    Person.visibleUpgrades.push(Upgrade.number);
                    Person.visibleUpgrades.sort();
                }
            }
            // if not owned and visible
            if (Person.visibleUpgrades.includes(Upgrade.number) && !(Person.ownedUpgrades.includes(Upgrade.number))){
                //display
                document.getElementById(updateUpgradeButton).style.display = "block";
                // if buyable
                if (Person.money >= lUpgrades[Upgrade.number-1].cost){
                    document.getElementById(updateUpgradeButton).disabled = false;
                }
                else{
                    document.getElementById(updateUpgradeButton).disabled = true;
                }
            } 
        }
        
    });
    
    $("#lVisibleUpgrades").html(Person.visibleUpgrades.toString());
    //$("#lBuyableUpgrades").html(lBuyableUpgrades.toString());
    $("#lOwnedUpgrades").html(Person.ownedUpgrades.toString());
    //ugradesTableUpdate();
}

function UpgradeAction(upgradeNumber) {
    switch (upgradeNumber) {
        case 1:
            break;
        case 2:
            break;
        default:
            break;
    }
}

function IsVisible(upgradeNumber) {
    switch (upgradeNumber) {
        case 1:
            return  Person.money >= 1 ? true : false
        case 2:
            return  Person.money >= 10 ? true : false
        default:
            return false;
    }
}

//TODO add cost
function buyUpgrade(upgradeNumber) {
    var updateUpgradeButton = "buyUpgrade".concat('', upgradeNumber.toString());
    document.getElementById(updateUpgradeButton).style.display = "none";
    Person.ownedUpgrades.push(upgradeNumber);
    UpgradeAction(upgradeNumber);
    //Person.mainMultiplier = Person.mainMultiplier * 2;
    checkUpgrades();
    updateAllLabels();
}
