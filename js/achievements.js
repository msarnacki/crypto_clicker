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
    new Achievement(number = 2, name = "First miner", description = "Started your mining career", condition = "AchievementCondition2()"),
    new Achievement(number = 3, name = "TEST3", description = "TEST_DECRIPTION3", condition = "AchievementCondition3()"),
];

//runs every tick
function checkAchievements() {
    // array 1, ... , numOfAchievments 
    //AchievementsNumbers = Array.from({length: lAchievments.length}, (_, i) => i + 1)
    lAchievments.forEach(Achievement => {
        //if Achievement.number is not in Person.ownedAchievements
        if (!(Person.ownedAchievements.includes(Achievement.number))) {
            //if Achievement condition met
            if (eval(Achievement.condition)){
                // add number to ownedAchievements and sort array
                Person.ownedAchievements.push(Achievement.number);
                Person.ownedAchievements.sort();
            }
        }
    });
    
    $("#lOwnedAchievements").html(Person.ownedAchievements.toString());
    achievementsImagesUpdate();
    //achievementsTableUpdate();
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

function AchievementCondition3() {
    var sumOwned = 0;
    Person.ownedMiners.forEach(numMiner => {
        sumOwned += numMiner;
    });
    return  sumOwned > 3 ? true : false
}


function createAchievementBox(AchievementNumber) {
    //const div = document.getElementById("divAchievementsBox".concat(AchievementNumber));
    //div.style.backgroundImage = `url('../img/${Achievement.number}Achievement.jpg')`;
    if (Person.ownedAchievements.includes(AchievementNumber)){
        var insideText = `${AchievementNumber}: ${lAchievments[AchievementNumber-1].name} - ${lAchievments[AchievementNumber-1].description}`;
    }
    else{
        var insideText = `${AchievementNumber}: ??? - ?????`;
    }
    document.getElementById("AchievementBox").innerHTML = insideText;
}

let attachedAchievementBox = false;
let AchievementBoxContainer = document.querySelector("#AchievementBox");

const followMouseAchievement = (event) => {
    AchievementBoxContainer.style.left = event.x + "px";
    var y = event.y + Math.ceil(window.scrollY);
    AchievementBoxContainer.style.top =  y + "px";
}

function showAchievementsBox(AchievementNumber) {
    createAchievementBox(AchievementNumber);
    if (!attachedAchievementBox) {
        attachedAchievementBox = true;
        AchievementBoxContainer.style.display = "block";
        document.addEventListener("pointermove", followMouseAchievement);
    }
}

function hideAchievementsBox() {
    attachedAchievementBox = false;
    AchievementBoxContainer.style.display = "";
    document.removeEventListener("pointermove", followMouseAchievement);
}

function generateAchievementsBoxTable() {
    const container = document.getElementById("divAchievementsBoxTable");

    lAchievments.forEach(Achievement => {
        const div = document.createElement('div');
        div.setAttribute("class", "divAchievementsBox");
        div.setAttribute("id", "divAchievementsBox".concat(Achievement.number));
        div.setAttribute("onpointerenter", `showAchievementsBox(${Achievement.number})`);
        div.setAttribute("onpointerleave", `hideAchievementsBox()`);
        //div.innerHTML = `${Achievement.number}`;
        div.style.backgroundImage = `url('../img/Achievement0.jpg')`;
        //div.style.backgroundImage = `url('../img/${Achievement.number}Achievement.jpg')`;
        div.style.backgroundSize = "contain";
        container.appendChild(div);
    });
}

generateAchievementsBoxTable();


function achievementsImagesUpdate() {
    var ownedNum = Person.ownedAchievements.length;
    if (ownedNum==0){
        lAchievments.forEach(Achievement => {
            const div = document.getElementById("divAchievementsBox".concat(Achievement.number));
            div.style.backgroundImage = `url('../img/Achievement0.jpg')`;
        });
    }
    else{
        for (let i = 0; i<ownedNum; i++){
            const div = document.getElementById("divAchievementsBox".concat(i+1));
            div.style.backgroundImage = `url('../img/Achievement${i+1}.jpg')`;
        }
    }
}

/* function achievementsTableUpdate() {
    var table = document.getElementById("achievementsTable");
    table.style.width = '100px';
    table.style.border = '1px solid black';
    
    var rowNum = table.rows.length;
    var colNum = table.rows[0].cells.length;

    var ownedNum = Person.ownedAchievements.length;
    
    // if owned not showed in table
    if (ownedNum > rowNum-1){
        achievementsTableClear();
        for (let i = 0; i<ownedNum; i++){
            var colInfo = [lAchievments[Person.ownedAchievements[i]-1].number, lAchievments[Person.ownedAchievements[i]-1].name, lAchievments[Person.ownedAchievements[i]-1].description];
            var tr = table.insertRow();
            for (let j = 0; j < colNum; j++) {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(colInfo[j]));
                td.style.border = '1px solid black';
            }
        }
    } 
    // if showed too many (when wipeing)
    if(ownedNum < rowNum-1){
        achievementsTableClear();
        achievementsTableUpdate();
    }
    rowNum = table.rows.length;

    //show if rowNum > 1
    if(rowNum > 1){
        table.style.display = "block";
    }else{
        table.style.display = "none";
    }
}

function achievementsTableClear() {
    var table = document.getElementById("achievementsTable");
    if(table.rows.length > 1){
        for(let i = 0; i<table.rows.length; i++){
            table.deleteRow(1);
        }
    }
} */