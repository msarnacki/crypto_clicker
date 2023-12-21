var money = 0;
var building1 = 0;

function buyBuilding1() {
    $("#lBuilding1").html(building1);
}

function bClick() {
    $("#lMoney").html(money);
}

function updateMoney() {
    money = money + building1;
    $("#lMoney").html(money);
}

function updateAll() {
    updateMoney();
}

$("#buyBuilding1").click(function () {
    building1+=1;
    buyBuilding1();
}); 


$("#clickButton").click(function () {
    money+=1;
    bClick();
});

//$(document).ready(function () {
//});

const interval = setInterval(function() {
    updateAll();
  }, 1000);   
