function bClick() {
    $("#lMoney").html(Person.money);
}

function showNumber(num, style = "BTC") {
    var numberFormatted = ''
    if (style == "BTC"){
        numberFormatted = (num / 10**lCryptoCurrs[0].denominationUnit).toFixed(lCryptoCurrs[0].denominationUnit)
    }else if (style == "Satoshi"){
        numberFormatted = num
    }
    return `${numberFormatted} ${style}`
}

function calcIntervalIncreaseCrypto(aOwnedMiners) {
    var increase = 0;
    for (let index = 0; index < aOwnedMiners.length; index++) {
        increase = increase + aOwnedMiners[index] * lMiners[index].base_income; //Math.round(aOwnedMiners[index]) * lCryptoCurrs[0].denominationUnit// * lCryptoCurrs[0].denominationUnit;
    }
    return increase;
}

function calcCost(aOwnedMiners, miner_level, num) {
    var cost = 0;
    var q = lMiners[miner_level].factor;
    var a1 = lMiners[miner_level].cost;
    if(num == 1) 
    {
        // cost =  S1
        cost = a1*(q**aOwnedMiners[miner_level]);
    }
    else 
    {
        // cost = S owned+num - S owned
        cost = a1 * (1 - (q**(aOwnedMiners[miner_level]+num))/(1 - q)) - a1 * (1 - (q**(aOwnedMiners[miner_level]))/(1-q))
    }
    
    return Math.ceil(cost);
}

function updateMoney() {
    Person.money = Person.money; // + calcIntervalIncreaseMoney(Person.ownedMiners)
    $("#lMoney").html(Person.money);
}

function updateCrypto() {
    Person.ownedCrypto[0] = Person.ownedCrypto[0] + calcIntervalIncreaseCrypto(Person.ownedMiners);
    $("#lCrypto0").html(showNumber(Person.ownedCrypto[0],Person.numView));
    $("#lCryptoValue0").html(Person.ownedCrypto[0]*lCryptoCurrs[0].usdRate/10**lCryptoCurrs[0].denominationUnit);
}

function updateAll() {
    updateMoney();
    updateCrypto();
}

function buyMiner(miner_level, num) {
    if(Person.money >= calcCost(Person.ownedMiners, miner_level, num))
    {
        Person.money -= calcCost(Person.ownedMiners, miner_level, num);
        Person.ownedMiners[miner_level]+=num;
        var id_owned = "#lMiner".concat('', miner_level.toString())
        var id_income = "#lMinerIncome".concat('', miner_level.toString())
        var id_cost1 = "#1MinerCost".concat('', miner_level.toString())
        var id_cost10 = "#10MinerCost".concat('', miner_level.toString())
        var id_cost100 = "#100MinerCost".concat('', miner_level.toString())
        $(id_owned).html(Person.ownedMiners[miner_level]);
        $(id_income).html(Person.ownedMiners[miner_level] * lMiners[miner_level].base_income);
        $(id_cost1).html(calcCost(Person.ownedMiners,miner_level, 1));
        $(id_cost10).html(calcCost(Person.ownedMiners,miner_level, 10));
        $(id_cost100).html(calcCost(Person.ownedMiners,miner_level, 100));
    
        $("#lMoney").html(Person.money);
        //$("#lIncomeMoney").html(calcIntervalIncreaseCrypto(Person.ownedMiners));
        $("#lCryptoIncome0").html(showNumber(calcIntervalIncreaseCrypto(Person.ownedMiners),Person.numView));
        
    }
}

$("#clickButton").click(function () {
    Person.money+=1;
    bClick();
});

function switchViewButton() {
    if (Person.numView == "BTC") {
        Person.numView = "Satoshi";
    }else{
        Person.numView = "BTC";
    }
    
    $("#numView").html(Person.numView);
    //immidiately update all lines with showNumber
    $("#lCrypto0").html(showNumber(Person.ownedCrypto[0],Person.numView));
    $("#lCryptoIncome0").html(showNumber(calcIntervalIncreaseCrypto(Person.ownedMiners),Person.numView));
        
}

function updateAllLabels() {
    $("#numView").html(Person.numView);

    $("#lMoney").html(Person.money);
    $("#lCrypto0").html(showNumber(Person.ownedCrypto[0],Person.numView));
    $("#lCryptoIncome0").html(showNumber(calcIntervalIncreaseCrypto(Person.ownedMiners),Person.numView));
    $("#lCryptoRate0").html(lCryptoCurrs[0].usdRate);
    $("#lCryptoValue0").html(Person.ownedCrypto[0]*lCryptoCurrs[0].usdRate/10**lCryptoCurrs[0].denominationUnit);
    
    $("#lMiner0").html(Person.ownedMiners[0]);
    $("#lMinerIncome0").html(Person.ownedMiners[0] * lMiners[0].base_income);
    $("#1MinerCost0").html(calcCost(Person.ownedMiners,0, 1));
    $("#10MinerCost0").html(calcCost(Person.ownedMiners,0, 10));
    $("#100MinerCost0").html(calcCost(Person.ownedMiners,0, 100));

    $("#lMiner1").html(Person.ownedMiners[1]);
    $("#lMinerIncome1").html(Person.ownedMiners[1] * lMiners[1].base_income);
    $("#1MinerCost1").html(calcCost(Person.ownedMiners,1, 1));
    $("#10MinerCost1").html(calcCost(Person.ownedMiners,1, 10));
    $("#100MinerCost1").html(calcCost(Person.ownedMiners,1, 100));
}

$(document).ready(function () {
    //set style of numbers on load of page
    if(localStorage.getItem("playerStored") != null) {
        load();
    }

    updateAllLabels();
    save();
});

//Exchenge
function convertToUSD() {
    cryptoToConvert = document.getElementById("inputConvertToUSD").value; //BTC
    if(cryptoToConvert <= Person.ownedCrypto[0]/10**lCryptoCurrs[0].denominationUnit){
        Person.ownedCrypto[0] -= cryptoToConvert*10**lCryptoCurrs[0].denominationUnit;
        Person.money += cryptoToConvert*lCryptoCurrs[0].usdRate;
    }
    updateAllLabels();
}

function convertToBTC() {
    usdToConvert = document.getElementById("inputConvertToBTC").value;
    if(usdToConvert <= Person.money){
        Person.ownedCrypto[0] += usdToConvert/lCryptoCurrs[0].usdRate*10**lCryptoCurrs[0].denominationUnit;
        Person.money -= usdToConvert;
    }
    updateAllLabels();
}

//pregressbar
const progressbar = document.querySelector(".progress");

const changeProgress = (progress) => {
    progressbar.style.width = `${progress}%`;
    if(progress >= 100){
        progressbar.style.width = 0
    }
};

function updateProgress(t) {
    setTimeout(() => changeProgress(t*10), t*1000);
    setTimeout(function() {$("#work1Time").html(t);}, t*1000);    
}

function work(time, earnings) {
    document.getElementById("work1Button").disabled = true;
    
    for (var t = 1; t <= time; t++) {
        updateProgress(t);
    }
    setTimeout(function(){document.getElementById("work1Button").disabled = false;}, time*1000);
    setTimeout(function(){
        Person.money = Person.money + earnings;
        updateMoney();},time*1000)
}

//pregressbar

//save every x sec
setInterval(save, 10000);
//refresh tick
setInterval(function() {updateAll();}, 1000);

//functions that handle saving
function save() {
	localStorage.setItem("playerStored", JSON.stringify(Person));
	
	var d = new Date();
	$("#lastSave").html("Last save: ".concat(d.toLocaleTimeString()));
}

function load() {
	$.extend(true, Person, JSON.parse(localStorage.getItem("playerStored")));
}

function wipe() {
   //TODO Add confirmation popup
    Person = new Player();
    save();
    updateAll();
}


//TODO in future 
/*
function exportSave() {
	var exportText = btoa(JSON.stringify(Person));
	
	$("#exportSaveContents").toggle();
	$("#exportSaveText").val(exportText);
	$("#exportSaveText").select();
}

function importSave(){
	var importText = prompt("Paste the text you were given by the export save dialog here.\n" +
								"Warning: this will erase your current save!");
	if(importText){
		init();
		$.extend(true, Person, JSON.parse(atob(importText)));
		versionControl(true);
		fixJSON();
		save();
		calcGlobalMult();
		$("#currentNumToBuy").html(Person.numToBuy);
		
		updateAll();
	}
}*/