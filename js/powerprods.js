class PowerProd{
    constructor(level, name, cost, factor, base_prod){
        this.level = level;
        this.name = name;
        this.cost = cost;
        this.factor = factor;
        this.base_prod = base_prod;
    }
}

var lPowerProds = [
    new PowerProd(level = 0, name="PowerProd0", cost = 10, factor = 1.3, base_prod = 0.1),
    new PowerProd(level = 1, name="PowerProd1", cost = 20, factor = 1.2, base_prod = 0.7),
    new PowerProd(level = 2, name="PowerProd2", cost = 30, factor = 1.1, base_prod = 1.5),
    new PowerProd(level = 3, name="PowerProd3", cost = 40, factor = 1.08, base_prod = 10),
    new PowerProd(level = 4, name="PowerProd4", cost = 51, factor = 1.06, base_prod = 20)
];

//var EnergyPrice = 0.16

function calcCost(aOwnedPowerProds, powerProd_level, num) {
    var cost = 0;
    var q = lPowerProds[powerProd_level].factor;
    var a1 = lPowerProds[powerProd_level].cost;

    if(num == 1) 
    {
        // cost =  S1
        cost = a1*(q**aOwnedPowerProds[powerProd_level]);
    }
    else 
    {
        // cost = S owned+num - S owned
        cost = a1 * (1 - (q**(aOwnedPowerProds[powerProd_level]+num))/(1 - q)) - a1 * (1 - (q**(aOwnedPowerProds[powerProd_level]))/(1-q))
    }
    
    return Math.ceil(cost);
}


/*function buyPowerProd(powerProd_level, num) {
    if(Person.money >= calcCost(Person.ownedPowerProds, powerProd_level, num))
    {
        Person.money = Number((Person.money - calcCost(Person.ownedPowerProds, powerProd_level, num)).toFixed(2));
        Person.ownedPowerProds[powerProd_level]+=num;
        //var id_owned = "#lPowerProd".concat('', powerProd_level.toString())
        //var id_production = "#lPowerProdProduction".concat('', powerProd_level.toString())
        
        //var PowerProdCost = "#dPowerProdCost".concat('', powerProd_level.toString())
        
        //$(id_owned).html(Person.ownedPowerProds[powerProd_level]);
        //$(id_production).html(Person.ownedPowerProds[powerProd_level] * lPowerProds[powerProd_level].base_income *Person.mainPowerProdMultiplier);
        
        //$(PowerProdCost).html(`Cost: ${calcCost(Person.ownedPowerProds,powerProd_level, 1)} <i class="fa fa-usd"></i>`);
    
        $("#lMoney").html(Person.money.toFixed(2));
        //$("#lIncomeMoney").html(calcIntervalIncreaseCrypto(Person.ownedPowerProds));
        $("#lCryptoIncome0").html(showNumber(calcIntervalIncreaseCrypto(Person.ownedPowerProds),Person.numView));
        $("#lEnergyIncome").html(Number((-calcIntervalEnergyUsage(Person.ownedPowerProds)).toFixed(2)));
    }
}*/

function generatePowerProdsBoxTable() {
    const container = document.getElementById("dBuyPowerProdsBox");
    console.log(lPowerProds);
    lPowerProds.forEach(PowerProd => {
        console.log(PowerProd.name);
        const divPowerProdBox = document.createElement('div');
        divPowerProdBox.setAttribute("class", "dPowerProdsBox");
        divPowerProdBox.setAttribute("id", "dPowerProdsBox".concat(PowerProd.level));
        container.appendChild(divPowerProdBox);

        /*const imgPowerProd = document.createElement("img");
        imgPowerProd.className = "imgPowerProd";
        imgPowerProd.id = `imgPowerProd${PowerProd.level}`
        imgPowerProd.src = `../img/PowerProds/PowerProd${PowerProd.level}.jpg`;
        divPowerProdBox.appendChild(imgPowerProd);

        const dPowerProdContent = document.createElement("div");
        dPowerProdContent.className = "dPowerProdContent";
        divPowerProdBox.appendChild(dPowerProdContent);

        const dPowerProdInfoLine1 = document.createElement("div");
        dPowerProdInfoLine1.className = "dPowerProdInfoLine";
        dPowerProdContent.appendChild(dPowerProdInfoLine1);

        const dPowerProdLeftInfo1 = document.createElement("div");
        dPowerProdLeftInfo1.className = "dPowerProdLeftInfo";
        dPowerProdLeftInfo1.id = "dPowerProdName".concat(PowerProd.level);
        dPowerProdLeftInfo1.innerHTML = `${PowerProd.name}`;
        dPowerProdInfoLine1.appendChild(dPowerProdLeftInfo1);

        const dPowerProdRightInfo1 = document.createElement("div");
        dPowerProdRightInfo1.className = "dPowerProdRightInfo";
        dPowerProdRightInfo1.id = "dPowerProdCost".concat(PowerProd.level);
        dPowerProdRightInfo1.innerHTML = `Cost: ${PowerProd.cost} <i class="fa fa-usd"></i>`;
        dPowerProdInfoLine1.appendChild(dPowerProdRightInfo1);

        const dPowerProdInfoLine2 = document.createElement("div");
        dPowerProdInfoLine2.className = "dPowerProdInfoLine";
        dPowerProdContent.appendChild(dPowerProdInfoLine2);

        const dPowerProdLeftInfo2 = document.createElement("div");
        dPowerProdLeftInfo2.className = "dPowerProdLeftInfo";
        dPowerProdLeftInfo2.id = "dPowerProdIncome".concat(PowerProd.level);
        var IncomeDenominated = PowerProd.base_income/10**lCryptoCurrs[0].denominationUnit;
        dPowerProdLeftInfo2.innerHTML = `<i class="fa fa-line-chart"></i> ${IncomeDenominated.toFixed(lCryptoCurrs[0].denominationUnit)} <i class="fa fa-btc"></i>/s`;
        dPowerProdInfoLine2.appendChild(dPowerProdLeftInfo2);

        const dPowerProdRightInfo2 = document.createElement("div");
        dPowerProdRightInfo2.className = "dPowerProdRightInfo";
        dPowerProdRightInfo2.id = "dPowerProdEnergy".concat(PowerProd.level);
        dPowerProdRightInfo2.innerHTML = `<i class="fa fa-bolt"></i> ${PowerProd.energy_consumption} W/s`;
        dPowerProdInfoLine2.appendChild(dPowerProdRightInfo2);

        const dBuyPowerProds = document.createElement("div");
        dBuyPowerProds.className = "dBuyPowerProds";
        dPowerProdContent.appendChild(dBuyPowerProds);

        const aBuyPowerProd1 = document.createElement("a");
        aBuyPowerProd1.className = "aBuyPowerProd";
        aBuyPowerProd1.innerHTML = `Buy 1`;
        aBuyPowerProd1.setAttribute("onClick", `buyPowerProd(${PowerProd.level},1)`);
        dBuyPowerProds.appendChild(aBuyPowerProd1);

        const aBuyPowerProd10 = document.createElement("a");
        aBuyPowerProd10.className = "aBuyPowerProd";
        aBuyPowerProd10.innerHTML = `Buy 10`;
        aBuyPowerProd10.setAttribute("onClick", `buyPowerProd(${PowerProd.level},10)`);
        dBuyPowerProds.appendChild(aBuyPowerProd10);

        const aBuyPowerProdMax = document.createElement("a");
        aBuyPowerProdMax.className = "aBuyPowerProd";
        aBuyPowerProdMax.innerHTML = `Buy Max`;
        aBuyPowerProdMax.setAttribute("onClick", `buyPowerProd(${PowerProd.level},-1)`);
        dBuyPowerProds.appendChild(aBuyPowerProdMax);*/
    });
}

generatePowerProdsBoxTable();


/*function generatePowerProdsStatsTable() {
    const container = document.getElementById("tablePowerProdStats");
    const denomUnit = lCryptoCurrs[0].denominationUnit;
    
    lPowerProds.forEach(PowerProd => {
        const owned = Person.ownedPowerProds[PowerProd.level];
        const income = PowerProd.base_income/10**denomUnit;
        const energy = PowerProd.energy_consumption;
        
        const tr = document.createElement('tr');
        container.appendChild(tr);

        const td1 = document.createElement('td');
        td1.innerHTML= PowerProd.name;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.id = "tdOwnedPowerProds".concat(PowerProd.level);
        td2.innerHTML = owned;
        tr.appendChild(td2);

        const td4 = document.createElement('td');
        td4.id = "tdAllIncome".concat(PowerProd.level);
        td4.innerHTML = (income*owned).toFixed(denomUnit);
        tr.appendChild(td4);

        const td5 = document.createElement('td');
        td5.id = "tdAllTimeEarned".concat(PowerProd.level);
        td5.innerHTML = 0.0.toFixed(8);
        tr.appendChild(td5);

        const td7 = document.createElement('td');
        td7.id = "tdAllEnergy".concat(PowerProd.level);
        td7.innerHTML = (energy*owned).toFixed(2);
        tr.appendChild(td7);
    });
}

generatePowerProdsStatsTable();

function updatePowerProdsStatsTable() {
    const denomUnit = lCryptoCurrs[0].denominationUnit;

    lPowerProds.forEach(PowerProd => {
        const owned = Person.ownedPowerProds[PowerProd.level];
        const income = PowerProd.base_income/10**denomUnit;
        const energy = PowerProd.energy_consumption;
        const allTimeMined = Person.allTimeStats["allTimeProduced_PowerProd" + String(PowerProd.level)] /10**denomUnit;
        
        $("#tdOwnedPowerProds".concat(PowerProd.level)).html(owned);
        //$("#tdSingleIncome".concat(PowerProd.level)).html((income).toFixed(denomUnit));
        $("#tdAllIncome".concat(PowerProd.level)).html((income*owned).toFixed(denomUnit));
        $("#tdAllTimeEarned".concat(PowerProd.level)).html(allTimeMined.toFixed(denomUnit));
        //$("#tdSingleEnergy".concat(PowerProd.level)).html(energy);
        $("#tdAllEnergy".concat(PowerProd.level)).html((energy*owned).toFixed(2));
    });
}

*/