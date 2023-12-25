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
    new Building(level = 0, cost = 10, factor = 1.3, base_income = 1),
    new Building(level = 1, cost = 150, factor = 1.2, base_income = 7),
    new Building(level = 2, cost = 5000, factor = 1.1, base_income = 120),
    new Building(level = 3, cost = 100000, factor = 1.08, base_income = 1000)
];

//Player object
var Person = new Player(
    money = 0, 
    ownedBuildings = [0, 0, 0, 0]
);
