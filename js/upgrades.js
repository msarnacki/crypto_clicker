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
    new Upgrade(number = 2, name = "Second multiplier", description = "Earn 3x", cost = 5),
    new Upgrade(number = 3, name = "Third multiplier", description = "Earn 4x", cost = 16),
    new Upgrade(number = 4, name = "4 test", description = "Earn 4x", cost = 26),
    new Upgrade(number = 5, name = "5 test", description = "Earn 4x", cost = 36),
    new Upgrade(number = 6, name = "6 test", description = "Earn 4x", cost = 46),
    new Upgrade(number = 7, name = "7 test", description = "Earn 4x", cost = 56)
];

//runs every tick
function checkUpgrades() {
    // array 1, ... , numOfUpgrades 
    //UpgradesNumbers = Array.from({length: lUpgrades.length}, (_, i) => i + 1)
    lUpgrades.forEach(Upgrade => {
        var updateUpgradeBox = "bUpgradesBox".concat('', Upgrade.number.toString());
        var updateUpgradeBoxBackground = "bUpgradesBoxBackground".concat('', Upgrade.number.toString());
        var updateGridButtons = "dGridButtons".concat('', Upgrade.number.toString());
        document.getElementById(updateUpgradeBox).disabled = true;
        document.getElementById(updateUpgradeBox).style.display = "none";
        document.getElementById(updateUpgradeBoxBackground).style.display = "none";
        document.getElementById(updateGridButtons).style.display = "none";

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
                document.getElementById(updateUpgradeBoxBackground).style.display = "block";
                document.getElementById(updateGridButtons).style.display = "grid";

                // if buyable
                if (Person.money >= lUpgrades[Upgrade.number-1].cost){
                    document.getElementById(updateUpgradeBox).disabled = false;
                    document.getElementById(updateUpgradeBox).style.filter = "grayscale(0)";
                    document.getElementById(updateUpgradeBoxBackground).style.filter = "grayscale(0)"; 
                }
                else{
                    document.getElementById(updateUpgradeBox).disabled = true;
                    document.getElementById(updateUpgradeBox).style.filter = "grayscale(100)";
                    document.getElementById(updateUpgradeBoxBackground).style.filter = "grayscale(100)";
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
        case 4:
            Person.mainMultiplier = Person.mainMultiplier * 2;
            break;
        case 5:
            Person.mainMultiplier = Person.mainMultiplier * 2;
            break;
        case 6:        
            Person.mainMultiplier = Person.mainMultiplier * 2;
            break;
        case 7:        
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
        case 4:
            return  Person.money >= 25 ? true : false
        case 5:
            return  Person.money >= 35 ? true : false
        case 6:
            return  Person.money >= 45 ? true : false
        case 7:
            return  Person.money >= 55 ? true : false   
        default:
            return false;
    }
}

function createUpgradeBox(UpgradeNumber) {
    //const div = document.getElementById("divAchievementsBox".concat(AchievementNumber));
    //div.style.backgroundImage = `url('../img/${Achievement.number}Achievement.jpg')`;
    if (Person.visibleUpgrades.includes(UpgradeNumber)){
        var insideText = `${UpgradeNumber}: ${lUpgrades[UpgradeNumber-1].name} - ${lUpgrades[UpgradeNumber-1].description} \n Cost = ${lUpgrades[UpgradeNumber-1].cost}$`;
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
        //1. create div_grid
        //2. create background button
        //3. create main button

        //1.
        const buttons_grid = document.createElement("div");
        buttons_grid.setAttribute("class", "dGridButtons");
        buttons_grid.setAttribute("id", "dGridButtons".concat(Upgrade.number));
        container.appendChild(buttons_grid);
        //2.
        const button_background = document.createElement('button');
        button_background.setAttribute("class", "bUpgradesBoxBackground");
        button_background.setAttribute("id", "bUpgradesBoxBackground".concat(Upgrade.number));
        buttons_grid.appendChild(button_background);

        //3.
        const button_main = document.createElement('button');
        button_main.setAttribute("class", "bUpgradesBox");
        button_main.setAttribute("id", "bUpgradesBox".concat(Upgrade.number));
        button_main.setAttribute("onpointerenter", `showUpgradesBox(${Upgrade.number})`);
        button_main.setAttribute("onpointerleave", `hideUpgradesBox()`);
        button_main.setAttribute("onClick", `buyUpgrade(${Upgrade.number})`);
        //button_main.innerHTML = `${Upgrade.number}`;
        button_main.style.backgroundImage = `url('../img/Upgrade${Upgrade.number}.jpg')`;
        button_main.style.backgroundSize = "contain";
        button_main.disabled = true;
        buttons_grid.appendChild(button_main);
    });
}

generateUpgradesBoxTable();


//TODO add cost
function buyUpgrade(upgradeNumber) {
    var updateUpgradeButton = "bUpgradesBox".concat('', upgradeNumber.toString());
    document.getElementById(updateUpgradeButton).style.display = "none";
    
    if (Person.money >= lUpgrades[upgradeNumber-1].cost) {
        Person.money -= lUpgrades[upgradeNumber-1].cost;
        Person.ownedUpgrades.push(upgradeNumber);
        UpgradeAction(upgradeNumber);
        checkUpgrades();
        updateAllLabels();
    }
} 