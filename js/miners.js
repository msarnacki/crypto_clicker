class Miner{
    constructor(level, name, cost, factor, base_income){
        this.level = level;
        this.name = name;
        this.cost = cost;
        this.factor = factor;
        this.base_income = base_income;
    }
}

var lMiners = [
    new Miner(level = 0, name="Graphics card from scrapyard", cost = 10, factor = 1.3, base_income = 1),
    new Miner(level = 1, name="Used graphics card", cost = 150, factor = 1.2, base_income = 7),
    new Miner(level = 2, name="New graphics card", cost = 5000, factor = 1.1, base_income = 120),
    new Miner(level = 3, name="Cheap mining rig", cost = 100000, factor = 1.08, base_income = 1000)
];


