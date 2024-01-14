function bClick() {
    $("#lMoney").html(Person.money);
}

function showNumber(num, style = "BTC") {

    if (Number.isInteger(num) == true) {
        const lenNum = Math.ceil(Math.log10(num + 1));
        console.log(lenNum);
    }
    else{
        const lenDenomUnit = toString(lCryptoCurrs[0].denominationUnit + 1).length - 2;
        console.log(lenDenomUnit);
    }
    
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
    $("#lCrypto0").html(Person.ownedCrypto[0]);
}

function updateAll() {
    updateMoney();
    updateCrypto();
    showNumber(125);
    showNumber(0.0000000001)
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
        $("#lCryptoIncome0").html(calcIntervalIncreaseCrypto(Person.ownedMiners));
        
    }
}

$("#clickButton").click(function () {
    Person.money+=1;
    bClick();
});

//$(document).ready(function () {
//});

const interval = setInterval(function() {
    updateAll();
  }, 1000);   
