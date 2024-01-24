function bClick() {
    $("#lMoney").html(Person.money.toFixed(2));
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
    return increase*Person.mainMultiplier;
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
    $("#lMoney").html(Person.money.toFixed(2));
}

function updateCrypto() {
    Person.ownedCrypto[0] = Person.ownedCrypto[0] + calcIntervalIncreaseCrypto(Person.ownedMiners);
    $("#lCrypto0").html(showNumber(Person.ownedCrypto[0],Person.numView));
    $("#lCryptoValue0").html((Person.ownedCrypto[0]*lCryptoCurrs[0].usdRate/10**lCryptoCurrs[0].denominationUnit).toFixed(2));
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
        $(id_income).html(Person.ownedMiners[miner_level] * lMiners[miner_level].base_income *Person.mainMultiplier);
        $(id_cost1).html(calcCost(Person.ownedMiners,miner_level, 1));
        $(id_cost10).html(calcCost(Person.ownedMiners,miner_level, 10));
        $(id_cost100).html(calcCost(Person.ownedMiners,miner_level, 100));
    
        $("#lMoney").html(Person.money.toFixed(2));
        //$("#lIncomeMoney").html(calcIntervalIncreaseCrypto(Person.ownedMiners));
        $("#lCryptoIncome0").html(showNumber(calcIntervalIncreaseCrypto(Person.ownedMiners),Person.numView));
        
    }
}

function buyMultiplier() {
    Person.mainMultiplier = Person.mainMultiplier * 2;
    updateAllLabels();
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

    $("#lMoney").html(Person.money.toFixed(2));
    $("#lCrypto0").html(showNumber(Person.ownedCrypto[0],Person.numView));
    $("#lCryptoIncome0").html(showNumber(calcIntervalIncreaseCrypto(Person.ownedMiners),Person.numView));
    $("#lCryptoRate0").html(lCryptoCurrs[0].usdRate.toFixed(2));
    $("#lCryptoValue0").html((Person.ownedCrypto[0]*lCryptoCurrs[0].usdRate/10**lCryptoCurrs[0].denominationUnit).toFixed(2));
    
    $("#lMiner0").html(Person.ownedMiners[0]);
    $("#lMinerIncome0").html(Person.ownedMiners[0] * lMiners[0].base_income *Person.mainMultiplier);
    $("#1MinerCost0").html(calcCost(Person.ownedMiners,0, 1));
    $("#10MinerCost0").html(calcCost(Person.ownedMiners,0, 10));
    $("#100MinerCost0").html(calcCost(Person.ownedMiners,0, 100));

    $("#lMiner1").html(Person.ownedMiners[1]);
    $("#lMinerIncome1").html(Person.ownedMiners[1] * lMiners[1].base_income *Person.mainMultiplier);
    $("#1MinerCost1").html(calcCost(Person.ownedMiners,1, 1));
    $("#10MinerCost1").html(calcCost(Person.ownedMiners,1, 10));
    $("#100MinerCost1").html(calcCost(Person.ownedMiners,1, 100));

    $("#lMainMultiplier").html(Person.mainMultiplier);
}

//Exchenge
function convertToUSD() {
    cryptoToConvert = document.getElementById("inputConvertToUSD").value; //BTC
    if(cryptoToConvert <= Person.ownedCrypto[0]/10**lCryptoCurrs[0].denominationUnit){
        Person.ownedCrypto[0] -= Number((cryptoToConvert*10**lCryptoCurrs[0].denominationUnit).toFixed(0));
        Person.money += Number((cryptoToConvert*lCryptoCurrs[0].usdRate).toFixed(2));
    }
    updateAllLabels();
}

function convertToBTC() {
    usdToConvert = document.getElementById("inputConvertToBTC").value;
    if(usdToConvert <= Person.money){
        Person.ownedCrypto[0] += Number((usdToConvert/lCryptoCurrs[0].usdRate*10**lCryptoCurrs[0].denominationUnit).toFixed(0));
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