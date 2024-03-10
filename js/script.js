function bClick() {
    $("#lMoney").html(Person.money.toFixed(2));
    updateConvertAmount();
    checkMaxMoney(document.getElementById("lEnergyValue").innerHTML * document.getElementById("SliderEnergy").value/100);
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
    //Person.money = Person.money; // + calcIntervalIncreaseMoney(Person.ownedMiners)
    $("#lMoney").html(Person.money.toFixed(2));
}

function updateCrypto() {
    if(!(-Person.ownedEnergy > Person.maxUnpaidEnergy)){
        Person.ownedCrypto[0] = Person.ownedCrypto[0] + calcIntervalIncreaseCrypto(Person.ownedMiners);
        document.getElementById("lCrypto0").style.color = "#ffffff";
        document.getElementById("lCryptoIncome0").style.color = "#ffffff";
        $("#lCrypto0").html(showNumber(Person.ownedCrypto[0],Person.numView));
        $("#lCryptoValue0").html((Person.ownedCrypto[0]*lCryptoCurrs[0].usdRate/10**lCryptoCurrs[0].denominationUnit).toFixed(2));
    }
    else{
        document.getElementById("lCrypto0").style.color = "#F6465D";
        document.getElementById("lCryptoIncome0").style.color = "#F6465D";
    }
}

function calcIntervalEnergyUsage(aOwnedMiners) {
    var usage = 0;
    for (let index = 0; index < aOwnedMiners.length; index++) {
        usage = usage + aOwnedMiners[index] * lMiners[index].energy_consumption; //Math.round(aOwnedMiners[index]) * lCryptoCurrs[0].denominationUnit// * lCryptoCurrs[0].denominationUnit;
    }
    return usage;
}

function updateEnergy() {
    if(!(-Person.ownedEnergy > Person.maxUnpaidEnergy)){
        Person.ownedEnergy = Number((Person.ownedEnergy - calcIntervalEnergyUsage(Person.ownedMiners)).toFixed(2));
        document.getElementById("lEnergy").style.color = "#ffffff";
        document.getElementById("lEnergyIncome").style.color = "#ffffff";
        var Watts = document.getElementsByClassName("WattsInTable");
        for (var i = 0; i < Watts.length; ++i) {
            var item = Watts[i];  
            item.style.color = "#ffffff";
        }
        $("#lEnergy").html(Person.ownedEnergy);
        $("#lEnergyPrice").html(EnergyPrice);
        $("#lEnergyValue").html((EnergyPrice*Person.ownedEnergy).toFixed(2));
    }
    else{
        document.getElementById("lEnergy").style.color = "#F6465D";
        document.getElementById("lEnergyIncome").style.color = "#F6465D";
        var Watts = document.getElementsByClassName("WattsInTable");
        for (var i = 0; i < Watts.length; ++i) {
            var item = Watts[i];  
            item.style.color = "#F6465D";
        }
    }

    document.getElementById("maxUnpaidBills").innerHTML = Person.maxUnpaidEnergy;
}

function updateAll() {
    priceRandomWalk();
    checkAchievements();
    checkUpgrades();
    updateMoney();
    updateCrypto();
    updateEnergy();
    updateConvertAmount();
    updatePayBillsAmount();
    checkMaxMoney(document.getElementById("lEnergyValue").innerHTML * document.getElementById("SliderEnergy").value/100);

}

function buyMiner(miner_level, num) {
    if(Person.money >= calcCost(Person.ownedMiners, miner_level, num))
    {
        Person.money = Number((Person.money - calcCost(Person.ownedMiners, miner_level, num)).toFixed(2));
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
        $("#lEnergyIncome").html(Number((-calcIntervalEnergyUsage(Person.ownedMiners)).toFixed(2)));
    }
}

$("#clickButton").click(function () {
    Person.money = Number((Person.money + 1).toFixed(2));
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

    $("#lEnergy").html(Person.ownedEnergy.toString());
    $("#lEnergyIncome").html(Number((-calcIntervalEnergyUsage(Person.ownedMiners)).toFixed(2)));
    
    $("#lEnergyPrice").html(EnergyPrice);
    $("#lEnergyValue").html((EnergyPrice*Person.ownedEnergy).toFixed(2));
    

    //achievementsTableUpdate();
    achievementsImagesUpdate();
    checkUpgrades();
}

var bBuyBTC = true;

function switchToBuy() {
    if(!bBuyBTC){
        bBuyBTC = true;
        document.getElementById("bConvert").innerHTML = "Buy";
        document.getElementById("bConvert").style.background = "#0ECB81";
        document.getElementById("bBuy").style.background = "#0ECB81";
        document.getElementById("bSell").style.background = "#878683";
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
        document.getElementById("bConvert").style.background = "#F6465D";
        document.getElementById("bBuy").style.background = "#878683";
        document.getElementById("bSell").style.background = "#F6465D";
        document.getElementById("icoBtcDollar").setAttribute("class", "fa fa-btc");
        document.getElementById("icoBtcDollar").innerHTML = "";
        document.getElementById("youWillGetCurrency").innerHTML = "$";
        document.getElementById("youWillGetCurrency").setAttribute("class", "");
    }
    getConvertValueFromSlider();
    var cryptoToConvert = document.getElementById("inputConvertCurrencies").value;
    document.getElementById("youWillGet").innerHTML =  (cryptoToConvert*lCryptoCurrs[0].usdRate).toFixed(2);
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
        Person.money = Number((Person.money + cryptoToConvert*lCryptoCurrs[0].usdRate/10**lCryptoCurrs[0].denominationUnit).toFixed(2));
        
        //after bought update value in input box
        getConvertValueFromSlider();
    }
    updateAllLabels();
}

function convertToBTC(toConvert) {
    usdToConvert = document.getElementById("inputConvertCurrencies").value; //BTC 
    if(usdToConvert <= Person.money){
        Person.ownedCrypto[0] += Number((usdToConvert/lCryptoCurrs[0].usdRate*10**lCryptoCurrs[0].denominationUnit).toFixed(0));
        Person.money = Number((Person.money - usdToConvert).toFixed(2));
        //after bought update value in input box
        getConvertValueFromSlider();
    }
    updateAllLabels();
}

function payBills() {
    var valueToPay = document.getElementById("inputPayBills").value;
    //value to pay is negative value
    if (-valueToPay>Person.money) {
        Person.ownedEnergy = Number((Person.ownedEnergy + Person.money/EnergyPrice).toFixed(2));
        Person.money = 0;
    }
    else{
        Person.ownedEnergy = Number((Person.ownedEnergy - valueToPay/EnergyPrice).toFixed(2));
        Person.money = Number((Person.money + Number(valueToPay)).toFixed(2));
    }
    document.getElementById("inputPayBills").value = (Number(document.getElementById("lEnergyValue").innerHTML) * document.getElementById("SliderEnergy").value/100).toFixed(2);
    getPayAmountFromSlider();
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
    //document.getElementById("clickButton").disabled = true;
    document.querySelectorAll('button.glow-on-hover').forEach(workButton => {
        workButton.disabled = true;
        //workButton.style.background = "linear-gradient(45deg, #ffffff)";
        // TODO: show that this button is disabled
    });

    startProgressBar(time);

    for (var t = 1; t <= time; t++) {
        updateProgress(t, time);
    }
    
    setTimeout(function(){
        document.querySelectorAll('button.glow-on-hover').forEach(workButton => {
            workButton.disabled = false;
            //workButton.style.background = "linear-gradient(45deg, #ffffff)";
        });
        //document.getElementById("clickButton").disabled = false;
    }, time*1000);

    setTimeout(function(){
        Person.money = Number((Person.money + earnings).toFixed(2));
        updateMoney();
        resetProgressBar();
    },time*1000)
        

}
//pregressbar