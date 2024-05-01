$(document).ready(function () {
    //set style of numbers on load of page
    if(localStorage.getItem("playerStored") != null) {
        load();
    }

    //Income when off
    var lastSaveBeforeOff = new Date(Person.lastSaveBeforeOff);
    var dLoad = new Date();
	$("#lastSaveBeforeOff").html("Last save before off: ".concat(lastSaveBeforeOff.toLocaleString()));
	$("#LoadTime").html("Load Time: ".concat(dLoad.toLocaleString()));
    var timeOff = Number(((dLoad - lastSaveBeforeOff)/1000).toFixed(0));
    var earnedWhenOff = Number((timeOff*calcIntervalIncreaseCrypto(Person.ownedMiners)).toFixed(0));
    $("#Diff_LoadTime-lastSaveBeforeOff").html("Diff: ".concat(timeOff).concat("s"));
    var earnedWhenOffMultiplied = earnedWhenOff * Person.incomeWhenOff;
	$("#EarnedWhenOff").html("Earned when off: ".concat(String(earnedWhenOff) + " * " + String(Person.incomeWhenOff.toFixed(2)) + " = " + String(earnedWhenOffMultiplied.toFixed(2))));
    Person.ownedCrypto[0] += earnedWhenOffMultiplied;

	calcMinerCosts();

    updateAllLabels();
    save();
});


function calcMinerCosts() {
	//calculate Miner cost after reload
	lMiners.forEach(Miner => {
		console.log("asd")
        document.getElementById("dMinerCost".concat(Miner.level)).innerHTML = `Cost: ${calcCost(Person.ownedMiners,Miner.level, 1)} <i class="fa fa-usd"></i>`;
    })	
}

//save every x sec
setInterval(save, 10000);
//refresh tick
setInterval(updateAll, 1000);
//update BTC price
setInterval(getPriceBTC, 60000);

//update Price Chart
//setInterval(updatePriceChart, 5000);

//functions that handle saving
function save() {
	var d = new Date();
    Person.lastSaveBeforeOff = d;
	localStorage.setItem("playerStored", JSON.stringify(Person));
	
	$("#lastSave").html("Last save: ".concat(Person.lastSaveBeforeOff.toLocaleTimeString()));
}

function load() {
	$.extend(true, Person, JSON.parse(localStorage.getItem("playerStored")));
	getPriceBTC();
}

function wipe() {
   //TODO Add confirmation popup
    //window.stop();

    Person = new Player();
    getPriceBTC();
	save();
    updateAll();
    updateAllLabels();
	resetCryptoExchengeState();
	resetEnergyExchengeState();
	calcMinerCosts();
}

//TODO in future 
/*
function exportSave() {
	var exportText = btoa(JSON.stringify(Person));
	
	$("#exportSaveContents").toggle();
	$("#exportSaveText").val(exportText);
	$("#exportSaveText").select();
}

function importSave(){
	var importText = prompt("Paste the text you were given by the export save dialog here.\n" +
	"Warning: this will erase your current save!");
	if(importText){
		init();
		$.extend(true, Person, JSON.parse(atob(importText)));
		versionControl(true);
		fixJSON();
		save();
		calcGlobalMult();
		$("#currentNumToBuy").html(Person.numToBuy);
		
		updateAll();
	}
}*/

/* View in fullscreen */
function openFullscreen() {
	var elem = document.documentElement;
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	}
}

/* Close fullscreen */
function closeFullscreen() {
	var elem = document.documentElement;
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) { /* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE11 */
		document.msExitFullscreen();
	}
}



// TABS
function _class(name){
	return document.getElementsByClassName(name);
}

let tabPanes = _class("tab-header")[0].getElementsByTagName("div");

for(let i=0;i<tabPanes.length;i++){
	tabPanes[i].addEventListener("click",function(){
	_class("tab-header")[0].getElementsByClassName("active")[0].classList.remove("active");
	tabPanes[i].classList.add("active");
	
	_class("tab-content")[0].getElementsByClassName("active")[0].classList.remove("active");
	_class("tab-content")[0].getElementsByClassName("tab")[i].classList.add("active");
	
});
}