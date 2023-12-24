function buyBuilding() {
    $("#lBuilding1").html(Person.ownedBuildings[1]);
}

function bClick() {
    $("#lMoney").html(Person.money);
}

function updateMoney() {
    Person.money = Person.money + Person.ownedBuildings[1]*lBuildings[1].base_income;
    $("#lMoney").html(Person.money);
}

function updateAll() {
    updateMoney();
}

$("#buyBuilding").click(function () {
    Person.ownedBuildings[1]+=1;
    buyBuilding();
}); 


$("#clickButton").click(function () {
    Person.money+=1;
    bClick();
});

//$(document).ready(function () {
//});

const interval = setInterval(function() {
    updateAll();
  }, 1000);   
