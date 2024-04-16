class Achievement{
    constructor(number = 0, name = "Empty", description = "[]", condition = false){
        this.number = number;
        this.name = name;
        this.description = description;
        this.condition = condition;
    }
}

var lAchievements = [
    new Achievement(number = 1, name = "Journey start", description = "Found your 1st dollar bill", condition = "AchievementCondition1()"),
    new Achievement(number = 2, name = "First miner", description = "Started your mining career", condition = "AchievementCondition2()"),
    new Achievement(number = 3, name = "TEST3", description = "TEST_DECRIPTION3", condition = "AchievementCondition3()"),
    new Achievement(number = 4, name = "TEST4", description = "TEST_DECRIPTION4", condition = "AchievementCondition4()"),
    new Achievement(number = 5, name = "TEST5", description = "TEST_DECRIPTION5", condition = "AchievementCondition5()"),
    new Achievement(number = 6, name = "TEST6", description = "TEST_DECRIPTION6", condition = "AchievementCondition6()"),
];

//runs every tick
function checkAchievements() {
    // array 1, ... , numOfAchievments 
    //AchievementsNumbers = Array.from({length: lAchievements.length}, (_, i) => i + 1)
    lAchievements.forEach(Achievement => {
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

function AchievementCondition4() {
    var sumOwned = 0;
    Person.ownedMiners.forEach(numMiner => {
        sumOwned += numMiner;
    });
    return  sumOwned > 3 ? true : false
}

function AchievementCondition5() {
    var sumOwned = 0;
    Person.ownedMiners.forEach(numMiner => {
        sumOwned += numMiner;
    });
    return  sumOwned > 3 ? true : false
}

function AchievementCondition6() {
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
        var insideText = `${AchievementNumber}: ${lAchievements[AchievementNumber-1].name} - ${lAchievements[AchievementNumber-1].description}`;
    }
    else{
        var insideText = `${AchievementNumber}: ??? - ?????`;
    }
    document.getElementById("AchievementBox").innerHTML = insideText;
}

let attachedAchievementBox = false;
let AchievementBoxContainer = document.getElementById("AchievementBox");

const followMouseAchievement = (event) => {
    var rect = document.getElementById("tab-content").getBoundingClientRect();
    AchievementBoxContainer.style.left = event.x - rect.left + "px";
    var y = event.y + Math.ceil(window.scrollY);
    AchievementBoxContainer.style.top =  event.y - rect.top + "px";
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
    AchievementBoxContainer.style.display = "none";
    document.removeEventListener("pointermove", followMouseAchievement);
}

function generateAchievementsBoxTable() {
    const container = document.getElementById("divAchievementsBoxTable");

    lAchievements.forEach(Achievement => {
        const div = document.createElement('div');
        div.setAttribute("class", "divAchievementsBox");
        div.setAttribute("id", "divAchievementsBox".concat(Achievement.number));
        div.setAttribute("onpointerenter", `showAchievementsBox(${Achievement.number})`);
        div.setAttribute("onpointerleave", `hideAchievementsBox()`);
        //div.innerHTML = `${Achievement.number}`;
        div.style.backgroundImage = `url('../img/Unknown.jpg')`;
        //div.style.backgroundImage = `url('../img/${Achievement.number}Achievement.jpg')`;
        div.style.backgroundSize = "contain";
        container.appendChild(div);
    });
}

generateAchievementsBoxTable();


function achievementsImagesUpdate() {
    var ownedNum = Person.ownedAchievements.length;
    if (ownedNum==0){
        lAchievements.forEach(Achievement => {
            const div = document.getElementById("divAchievementsBox".concat(Achievement.number));
            div.style.backgroundImage = `url('../img/Unknown.jpg')`;
        });
    }
    else{
        for (let i = 0; i<ownedNum; i++){
            const div = document.getElementById("divAchievementsBox".concat(i+1));
            div.style.backgroundImage = `url('../img/Achievement${i+1}.jpg')`;
            div.classList.add("ownedAchievement");
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
            var colInfo = [lAchievements[Person.ownedAchievements[i]-1].number, lAchievements[Person.ownedAchievements[i]-1].name, lAchievements[Person.ownedAchievements[i]-1].description];
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