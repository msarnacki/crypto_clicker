class Player{
    constructor(money, ownedBuildings){
        this.money = money;
        this.ownedBuildings = ownedBuildings;
    }
}

class Building{
    constructor(level, cost, factor, base_income){
        this.level = level;
        this.cost = cost;
        this.factor = factor;
        this.base_income = base_income;
    }
}

var lBuildings = [
    new Building(level = 1, cost = 1, factor = 1.05, base_income = 1),
    new Building(level = 2, cost = 100, factor = 1.04, base_income = 7),
    new Building(level = 3, cost = 5000, factor = 1.03, base_income = 120),
    new Building(level = 4, cost = 100000, factor = 1.02, base_income = 1000)
];

//Player object
var Person = new Player(
    money = 0, 
    ownedBuildings = [0, 0, 0, 0]
);
