class Miner{
    constructor(level, name, cost, factor, base_income, energy_consumption){
        this.level = level;
        this.name = name;
        this.cost = cost;
        this.factor = factor;
        this.base_income = base_income;
        this.energy_consumption = energy_consumption;
    }
}

var lMiners = [
    new Miner(level = 0, name="Miner0", cost = 10, factor = 1.3, base_income = 1, energy_consumption = 0.06),
    new Miner(level = 1, name="Miner1", cost = 20, factor = 1.2, base_income = 7, energy_consumption = 0.12),
    new Miner(level = 2, name="Miner2", cost = 30, factor = 1.1, base_income = 50, energy_consumption = 0.18),
    new Miner(level = 3, name="Miner3", cost = 40, factor = 1.08, base_income = 100, energy_consumption = 0.3),
    new Miner(level = 4, name="Miner4", cost = 51, factor = 1.06, base_income = 200, energy_consumption = 0.5),
    new Miner(level = 5, name="Miner5", cost = 60, factor = 1.05, base_income = 300, energy_consumption = 0.65),
    new Miner(level = 6, name="Miner6", cost = 70, factor = 1.045, base_income = 400, energy_consumption = 0.82),
    new Miner(level = 7, name="Miner7", cost = 80, factor = 1.04, base_income = 10000, energy_consumption = 0.97)
];

var EnergyPrice = 0.16

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


function buyMiner(miner_level, num) {
    if(Person.money >= calcCost(Person.ownedMiners, miner_level, num))
    {
        Person.money = Number((Person.money - calcCost(Person.ownedMiners, miner_level, num)).toFixed(2));
        Person.ownedMiners[miner_level]+=num;
        //var id_owned = "#lMiner".concat('', miner_level.toString())
        //var id_income = "#lMinerIncome".concat('', miner_level.toString())
        var MinerCost = "#dMinerCost".concat('', miner_level.toString())
        //$(id_owned).html(Person.ownedMiners[miner_level]);
        //$(id_income).html(Person.ownedMiners[miner_level] * lMiners[miner_level].base_income *Person.mainMultiplier);
        $(MinerCost).html(`Cost: ${calcCost(Person.ownedMiners,miner_level, 1)} <i class="fa fa-usd"></i>`);
    
        $("#lMoney").html(Person.money.toFixed(2));
        //$("#lIncomeMoney").html(calcIntervalIncreaseCrypto(Person.ownedMiners));
        $("#lCryptoIncome0").html(showNumber(calcIntervalIncreaseCrypto(Person.ownedMiners),Person.numView));
        $("#lEnergyIncome").html(Number((-calcIntervalEnergyUsage(Person.ownedMiners)).toFixed(2)));
    }
}

function generateMinersBoxTable() {
    const container = document.getElementById("dBuyMinersBox");

    lMiners.forEach(Miner => {
        const divMinerBox = document.createElement('div');
        divMinerBox.setAttribute("class", "dMinersBox");
        divMinerBox.setAttribute("id", "dMinersBox".concat(Miner.level));
        container.appendChild(divMinerBox);

        const imgMiner = document.createElement("img");
        imgMiner.className = "imgMiner";
        imgMiner.id = `imgMiner${Miner.level}`
        imgMiner.src = `../img/Miners/Miner${Miner.level}.jpg`;
        divMinerBox.appendChild(imgMiner);

        const dMinerContent = document.createElement("div");
        dMinerContent.className = "dMinerContent";
        divMinerBox.appendChild(dMinerContent);

        const dMinerInfoLine1 = document.createElement("div");
        dMinerInfoLine1.className = "dMinerInfoLine";
        dMinerContent.appendChild(dMinerInfoLine1);

        const dMinerLeftInfo1 = document.createElement("div");
        dMinerLeftInfo1.className = "dMinerLeftInfo";
        dMinerLeftInfo1.id = "dMinerName".concat(Miner.level);
        dMinerLeftInfo1.innerHTML = `${Miner.name}`;
        dMinerInfoLine1.appendChild(dMinerLeftInfo1);

        const dMinerRightInfo1 = document.createElement("div");
        dMinerRightInfo1.className = "dMinerRightInfo";
        dMinerRightInfo1.id = "dMinerCost".concat(Miner.level);
        dMinerRightInfo1.innerHTML = `Cost: ${Miner.cost} <i class="fa fa-usd"></i>`;
        dMinerInfoLine1.appendChild(dMinerRightInfo1);

        const dMinerInfoLine2 = document.createElement("div");
        dMinerInfoLine2.className = "dMinerInfoLine";
        dMinerContent.appendChild(dMinerInfoLine2);

        const dMinerLeftInfo2 = document.createElement("div");
        dMinerLeftInfo2.className = "dMinerLeftInfo";
        dMinerLeftInfo2.id = "dMinerIncome".concat(Miner.level);
        var IncomeDenominated = Miner.base_income/10**lCryptoCurrs[0].denominationUnit;
        dMinerLeftInfo2.innerHTML = `<i class="fa fa-line-chart"></i> +${IncomeDenominated.toFixed(lCryptoCurrs[0].denominationUnit)} <i class="fa fa-btc"></i>/s`;
        dMinerInfoLine2.appendChild(dMinerLeftInfo2);

        const dMinerRightInfo2 = document.createElement("div");
        dMinerRightInfo2.className = "dMinerRightInfo";
        dMinerRightInfo2.id = "dMinerEnergy".concat(Miner.level);
        dMinerRightInfo2.innerHTML = `<i class="fa fa-bolt"></i> -${Miner.energy_consumption} W/s`;
        dMinerInfoLine2.appendChild(dMinerRightInfo2);

        const dBuyMiners = document.createElement("div");
        dBuyMiners.className = "dBuyMiners";
        dMinerContent.appendChild(dBuyMiners);

        const aBuyMiner1 = document.createElement("a");
        aBuyMiner1.className = "aBuyMiner";
        aBuyMiner1.innerHTML = `Buy 1`;
        aBuyMiner1.setAttribute("onClick", `buyMiner(${Miner.level},1)`);
        dBuyMiners.appendChild(aBuyMiner1);

        const aBuyMiner10 = document.createElement("a");
        aBuyMiner10.className = "aBuyMiner";
        aBuyMiner10.innerHTML = `Buy 10`;
        aBuyMiner10.setAttribute("onClick", `buyMiner(${Miner.level},10)`);
        dBuyMiners.appendChild(aBuyMiner10);

        const aBuyMinerMax = document.createElement("a");
        aBuyMinerMax.className = "aBuyMiner";
        aBuyMinerMax.innerHTML = `Buy Max`;
        aBuyMinerMax.setAttribute("onClick", `buyMiner(${Miner.level},-1)`);
        dBuyMiners.appendChild(aBuyMinerMax);
    });
}

generateMinersBoxTable();

function generateMinersStatsTable() {
    const container = document.getElementById("tableMinerStats");
    const denomUnit = lCryptoCurrs[0].denominationUnit;
    
    lMiners.forEach(Miner => {
        const owned = Person.ownedMiners[Miner.level];
        const income = Miner.base_income/10**denomUnit;
        const energy = Miner.energy_consumption;
        
        const tr = document.createElement('tr');
        container.appendChild(tr);

        const td1 = document.createElement('td');
        td1.innerHTML= Miner.name;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.id = "tdOwnedMiners".concat(Miner.level);
        td2.innerHTML = owned;
        tr.appendChild(td2);

        /*const td3 = document.createElement('td');
        td3.id = "tdSingleIncome".concat(Miner.level);
        td3.innerHTML = (income).toFixed(denomUnit);
        tr.appendChild(td3);*/

        const td4 = document.createElement('td');
        td4.id = "tdAllIncome".concat(Miner.level);
        td4.innerHTML = (income*owned).toFixed(denomUnit);
        tr.appendChild(td4);

        const td5 = document.createElement('td');
        td5.id = "tdAllTimeEarned".concat(Miner.level);
        td5.innerHTML = 0.0.toFixed(8);
        tr.appendChild(td5);

        /*const td6 = document.createElement('td');
        td6.id = "tdSingleEnergy".concat(Miner.level);
        td6.innerHTML = energy;
        tr.appendChild(td6);*/

        const td7 = document.createElement('td');
        td7.id = "tdAllEnergy".concat(Miner.level);
        td7.innerHTML = (energy*owned).toFixed(2);
        tr.appendChild(td7);
    });
}

generateMinersStatsTable();

function updateMinersStatsTable() {
    const denomUnit = lCryptoCurrs[0].denominationUnit;

    lMiners.forEach(Miner => {
        const owned = Person.ownedMiners[Miner.level];
        const income = Miner.base_income/10**denomUnit;
        const energy = Miner.energy_consumption;
        const allTimeMined = Person.allTimeStats["allTimeMined_Miner" + String(Miner.level)] /10**denomUnit;
        
        $("#tdOwnedMiners".concat(Miner.level)).html(owned);
        //$("#tdSingleIncome".concat(Miner.level)).html((income).toFixed(denomUnit));
        $("#tdAllIncome".concat(Miner.level)).html((income*owned).toFixed(denomUnit));
        $("#tdAllTimeEarned".concat(Miner.level)).html(allTimeMined.toFixed(denomUnit));
        //$("#tdSingleEnergy".concat(Miner.level)).html(energy);
        $("#tdAllEnergy".concat(Miner.level)).html((energy*owned).toFixed(2));
    });
}