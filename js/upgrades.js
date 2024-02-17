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
    new Upgrade(number = 2, name = "Second multiplier", description = "Earn 3x", cost = 51),
    new Upgrade(number = 3, name = "Third multiplier", description = "Earn 4x", cost = 61)
];

//runs every tick
function checkUpgrades() {
    // array 1, ... , numOfUpgrades 
    //UpgradesNumbers = Array.from({length: lUpgrades.length}, (_, i) => i + 1)
    lUpgrades.forEach(Upgrade => {
        var updateUpgradeBox = "bUpgradesBox".concat('', Upgrade.number.toString());
        document.getElementById(updateUpgradeBox).disabled = true;
        document.getElementById(updateUpgradeBox).style.display = "none";

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
                document.getElementById(updateUpgradeBox).style.display = "block";

                // if buyable
                if (Person.money >= lUpgrades[Upgrade.number-1].cost){
                    document.getElementById(updateUpgradeBox).disabled = false;
                    document.getElementById(updateUpgradeBox).style.filter = "grayscale(0)"; 
                }
                else{
                    document.getElementById(updateUpgradeBox).disabled = true;
                    document.getElementById(updateUpgradeBox).style.filter = "grayscale(100)";
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
            Person.mainMultiplier = Person.mainMultiplier * 2;
            break;
        case 2:
            Person.mainMultiplier = Person.mainMultiplier * 2;
            break;
        case 3:        
            Person.mainMultiplier = Person.mainMultiplier * 2;
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
        case 3:
            return  Person.money >= 15 ? true : false
        default:
            return false;
    }
}

function createUpgradeBox(UpgradeNumber) {
    //const div = document.getElementById("divAchievementsBox".concat(AchievementNumber));
    //div.style.backgroundImage = `url('../img/${Achievement.number}Achievement.jpg')`;
    if (Person.visibleUpgrades.includes(UpgradeNumber)){
        var insideText = `${UpgradeNumber}: ${lUpgrades[UpgradeNumber-1].name} - ${lUpgrades[UpgradeNumber-1].description}`;
    }
    else{
        var insideText = `${UpgradeNumber}: ??? - ?????`;
    }
    document.getElementById("UpgradeBox").innerHTML = insideText;
}

let attachedUpgradeBox = false;
let UpgradeBoxContainer = document.querySelector("#UpgradeBox");

const followMouseUpgrade = (event) => {
    UpgradeBoxContainer.style.left = event.x + "px";
    var y = event.y + Math.ceil(window.scrollY);
    UpgradeBoxContainer.style.top =  y + "px";
}

function showUpgradesBox(UpgradeNumber) {
    createUpgradeBox(UpgradeNumber);
    if (!attachedUpgradeBox) {
        attachedUpgradeBox = true;
        UpgradeBoxContainer.style.display = "block";
        document.addEventListener("pointermove", followMouseUpgrade);
    }
}

function hideUpgradesBox() {
    attachedUpgradeBox = false;
    UpgradeBoxContainer.style.display = "";
    document.removeEventListener("pointermove", followMouseUpgrade);
}

function generateUpgradesBoxTable() {
    const container = document.getElementById("divUpgradesBoxTable");

    lUpgrades.forEach(Upgrade => {
        const div = document.createElement('button');
        div.setAttribute("class", "bUpgradesBox");
        div.setAttribute("id", "bUpgradesBox".concat(Upgrade.number));
        div.setAttribute("onpointerenter", `showUpgradesBox(${Upgrade.number})`);
        div.setAttribute("onpointerleave", `hideUpgradesBox()`);
        div.setAttribute("onClick", `buyUpgrade(${Upgrade.number})`);
        //div.innerHTML = `${Upgrade.number}`;
        div.style.backgroundImage = `url('../img/Upgrade${Upgrade.number}.jpg')`;
        div.style.backgroundSize = "contain";
        div.disabled = true;
        container.appendChild(div);
    });
}

generateUpgradesBoxTable();


//TODO add cost
function buyUpgrade(upgradeNumber) {
    var updateUpgradeButton = "bUpgradesBox".concat('', upgradeNumber.toString());
    document.getElementById(updateUpgradeButton).style.display = "none";
    Person.ownedUpgrades.push(upgradeNumber);
    UpgradeAction(upgradeNumber);
    console.log(upgradeNumber);
    checkUpgrades();
    updateAllLabels();
} 
