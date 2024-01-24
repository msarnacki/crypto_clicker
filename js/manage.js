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
    $("#EarnedWhenOff").html("Earned when off: ".concat(String(earnedWhenOff)));
    Person.ownedCrypto[0] += earnedWhenOff;

    updateAllLabels();
    save();
});

//save every x sec
setInterval(save, 5000);
//refresh tick
setInterval(function() {updateAll();}, 1000);

//functions that handle saving
function save() {
	var d = new Date();
    Person.lastSaveBeforeOff = d;
	localStorage.setItem("playerStored", JSON.stringify(Person));
	
	$("#lastSave").html("Last save: ".concat(Person.lastSaveBeforeOff.toLocaleTimeString()));
}

function load() {
	$.extend(true, Person, JSON.parse(localStorage.getItem("playerStored")));
}

function wipe() {
   //TODO Add confirmation popup
    Person = new Player();
    save();
    updateAll();
    updateAllLabels();
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