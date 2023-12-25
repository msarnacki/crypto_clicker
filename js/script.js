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
    var cost = (aOwnedBuildings[building_level]+1) * lBuildings[building_level]
}

function updateMoney() {
    Person.money = Person.money + calcIntervalIncrease(Person.ownedBuildings);
    $("#lMoney").html(Person.money);
}

function updateAll() {
    updateMoney();
}

function buyBuilding(building_level, num) {
    Person.ownedBuildings[building_level]+=num;
    var id_owned = "#lBuilding".concat('', building_level.toString())
    var id_income = "#lBuildingIncome".concat('', building_level.toString())
    $(id_owned).html(Person.ownedBuildings[building_level]);
    $(id_income).html(Person.ownedBuildings[building_level] * lBuildings[building_level].base_income);

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
