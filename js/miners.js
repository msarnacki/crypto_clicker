class Miner{
    constructor(level, cost, factor, base_income){
        this.level = level;
        this.cost = cost;
        this.factor = factor;
        this.base_income = base_income;
    }
}

class CryptoCurr{
    constructor(name, symbol, denomitationName, denominationUnit, usdRate){
        this.name = name;
        this.symbol = symbol;
        this.denominationName = denomitationName;
        this.denominationUnit = denominationUnit;
        this.usdRate = usdRate;
    }
}

var lMiners = [
    new Miner(level = 0, cost = 10, factor = 1.3, base_income = 1),
    new Miner(level = 1, cost = 150, factor = 1.2, base_income = 7),
    new Miner(level = 2, cost = 5000, factor = 1.1, base_income = 120),
    new Miner(level = 3, cost = 100000, factor = 1.08, base_income = 1000)
];

var lCryptoCurrs = [
    new CryptoCurr(name = "Bitcoin", symbol = "BTC", denominationName = "Satoshi", denominationUnit = 8,usdRate = 45500), //100000000
    new CryptoCurr(name = "Ethereum", symbol = "ETH", denominationName = "Gwei", denominationUnit = 9,usdRate = 2400)     //1000000000
];