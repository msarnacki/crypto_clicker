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
    priceRandomWalk();
    checkAchievements();
    checkUpgrades();
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
    $("#BTCnumViewToConvert").html(Person.numView.concat(" to convert: "));
    //immidiately update all lines with showNumber
    $("#lCrypto0").html(showNumber(Person.ownedCrypto[0],Person.numView));
    $("#lCryptoIncome0").html(showNumber(calcIntervalIncreaseCrypto(Person.ownedMiners),Person.numView));
        
}

function updateAllLabels() {
    $("#numView").html(Person.numView);
    $("#BTCnumViewToConvert").html(Person.numView.concat(" to convert: "));

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
    
    $("#lOwnedAchievements").html(Person.ownedAchievements.toString());

    //achievementsTableUpdate();
    achievementsImagesUpdate();
    checkUpgrades();
}

var bBuyBTC = true;

function switchToBuy() {
    if(!bBuyBTC){
        bBuyBTC = true;
        document.getElementById("bConvert").innerHTML = "Buy";
        document.getElementById("bBuy").style.background = "linear-gradient(90deg, rgba(20,167,62,1) 50%, rgba(102,247,113,1) 100%)";
        document.getElementById("bSell").style.background = "";
        document.getElementById("icoBtcDollar").setAttribute("class", "");
        document.getElementById("icoBtcDollar").innerHTML = "$";
        document.getElementById("youWillGetCurrency").innerHTML = "";
        document.getElementById("youWillGetCurrency").setAttribute("class", "fa fa-btc");
    }
    getConvertValueFromSlider();
    var usdToConvert = document.getElementById("inputConvertCurrencies").value;
    document.getElementById("youWillGet").innerHTML = (usdToConvert/lCryptoCurrs[0].usdRate).toFixed(lCryptoCurrs[0].denominationUnit);
}

function switchToSell() {
    if(bBuyBTC){
        bBuyBTC = false;
        document.getElementById("bConvert").innerHTML = "Sell";
        document.getElementById("bBuy").style.background = "#878683";
        document.getElementById("bSell").style.background = "linear-gradient(270deg, rgb(224, 0, 0) 50%, rgb(241, 116, 0) 100%)";
        document.getElementById("icoBtcDollar").setAttribute("class", "fa fa-btc");
        document.getElementById("icoBtcDollar").innerHTML = "";
        document.getElementById("youWillGetCurrency").innerHTML = "$";
        document.getElementById("youWillGetCurrency").setAttribute("class", "");
    }
    getConvertValueFromSlider();
    var cryptoToConvert = document.getElementById("inputConvertCurrencies").value;
    document.getElementById("youWillGet").innerHTML =  Number((cryptoToConvert*lCryptoCurrs[0].usdRate).toFixed(2));
}

//Exchenge
function convertCurrencies(toConvert) {
    if(bBuyBTC) {
        //usd to btc
        convertToBTC(toConvert);
    }
    else{
        //btc to usd
        convertToUSD(toConvert);
    }
}

function convertToUSD(toConvert) {
    if (toConvert == -1){
        cryptoToConvert = Person.ownedCrypto[0];
    }else{
        if (Person.numView == "Satoshi") {
            cryptoToConvert = Number(document.getElementById("inputConvertCurrencies").value);
        }else{
            cryptoToConvert = Number(document.getElementById("inputConvertCurrencies").value)*10**lCryptoCurrs[0].denominationUnit;
        }
    }
    if(cryptoToConvert <= Person.ownedCrypto[0]){
        Person.ownedCrypto[0] -= Number(cryptoToConvert.toFixed(0));
        Person.money += Number((cryptoToConvert*lCryptoCurrs[0].usdRate/10**lCryptoCurrs[0].denominationUnit).toFixed(2));
        
        //after bought update value in input box
        getConvertValueFromSlider();
    }
    updateAllLabels();
}

function convertToBTC(toConvert) {
    usdToConvert = document.getElementById("inputConvertCurrencies").value; //BTC 

    if(usdToConvert <= Person.money){
        Person.ownedCrypto[0] += Number((usdToConvert/lCryptoCurrs[0].usdRate*10**lCryptoCurrs[0].denominationUnit).toFixed(0));
        Person.money -= usdToConvert;
        //after bought update value in input box
        getConvertValueFromSlider();
    }
    updateAllLabels();
}

//pregressbar
const progressbar = document.getElementById("workProgressBar");

const changeProgress = (progress) => {
    progressbar.style.width = `${progress}%`;
    if(progress > 100){
        progressbar.style.width = 0
    }
};
function startProgressBar(time) {
    changeProgress(100/time);
    $("#workTime").html(`1/${time}`);
}

function resetProgressBar() {
    $("#workTime").html("");
    progressbar.style.width = 0;
}

function updateProgress(t, time) {
    setTimeout(() => changeProgress((t+1)*100/time), t*1000);
    setTimeout(function() {$("#workTime").html(`${t+1}/${time}`);}, t*1000);    
}

function work(time, earnings) {
    document.getElementById("clickButton").disabled = true;
    document.querySelectorAll('button.workButtons').forEach(workButton => {
        workButton.disabled = true;
    });

    startProgressBar(time);

    for (var t = 1; t <= time; t++) {
        updateProgress(t, time);
    }
    
    setTimeout(function(){
        document.querySelectorAll('button.workButtons').forEach(workButton => {
            workButton.disabled = false;
        });
        document.getElementById("clickButton").disabled = false;
    }, time*1000);

    setTimeout(function(){
        Person.money = Person.money + earnings;
        updateMoney();
        resetProgressBar();
    },time*1000)
        

}
//pregressbar