function bClick() {
    $("#lMoney").html(Person.money);
}

function calcIntervalIncrease(aOwnedBuildings) {
    var increase = 0;
    for (let index = 0; index < aOwnedBuildings.length; index++) {
        increase = increase + aOwnedBuildings[index] * lBuildings[index].base_income;
    }
    return increase;
}

function calcCost(aOwnedBuildings, building_level, num) {
    var cost = 0;
    var q = lBuildings[building_level].factor;
    var a1 = lBuildings[building_level].cost;
    if(num == 1) 
    {
        // cost =  S1
        cost = a1*(q**aOwnedBuildings[building_level]);
    }
    else 
    {
        // cost = S owned+num - S owned
        cost = a1 * (1 - (q**(aOwnedBuildings[building_level]+num))/(1 - q)) - a1 * (1 - (q**(aOwnedBuildings[building_level]))/(1-q))
    }
    
    return Math.ceil(cost);
}

function updateMoney() {
    Person.money = Person.money + calcIntervalIncrease(Person.ownedBuildings);
    $("#lMoney").html(Person.money);
}

function updateAll() {
    updateMoney();
}

function buyBuilding(building_level, num) {
    if(Person.money >= calcCost(Person.ownedBuildings, building_level, num))
    {
        Person.money -= calcCost(Person.ownedBuildings, building_level, num);
        Person.ownedBuildings[building_level]+=num;
        var id_owned = "#lBuilding".concat('', building_level.toString())
        var id_income = "#lBuildingIncome".concat('', building_level.toString())
        var id_cost1 = "#1BuildingCost".concat('', building_level.toString())
        var id_cost10 = "#10BuildingCost".concat('', building_level.toString())
        var id_cost100 = "#100BuildingCost".concat('', building_level.toString())
        $(id_owned).html(Person.ownedBuildings[building_level]);
        $(id_income).html(Person.ownedBuildings[building_level] * lBuildings[building_level].base_income);
        $(id_cost1).html(calcCost(Person.ownedBuildings,building_level, 1));
        $(id_cost10).html(calcCost(Person.ownedBuildings,building_level, 10));
        $(id_cost100).html(calcCost(Person.ownedBuildings,building_level, 100));
    
        $("#lMoney").html(Person.money);
        $("#lIncome").html(calcIntervalIncrease(Person.ownedBuildings));
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
