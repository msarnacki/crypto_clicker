class CryptoCurr{
    constructor(name, symbol, denomitationName, denominationUnit, usdRate){
        this.name = name;
        this.symbol = symbol;
        this.denominationName = denomitationName;
        this.denominationUnit = denominationUnit;
        this.usdRate = usdRate;
    }
}

var lCryptoCurrs = [
    new CryptoCurr(name = "Bitcoin", symbol = "BTC", denominationName = "Satoshi", denominationUnit = 8,usdRate = 45500), //100000000
    new CryptoCurr(name = "Ethereum", symbol = "ETH", denominationName = "Gwei", denominationUnit = 9,usdRate = 2400)     //1000000000
];

function getPriceBTC() {
    var livePrice = {
        "async": true,
        "scroosDomain": true,
        "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_last_updated_at=true",
        "method": "GET",
        "headers": {}
    }
    $.ajax(livePrice).done(function (response) {
        //console.log(response.bitcoin.usd);
        //console.log(response.bitcoin.last_updated_at);
        lCryptoCurrs[0].usdRate = Number(response.bitcoin.usd);
        $("#lCryptoRate0").html(lCryptoCurrs[0].usdRate.toFixed(2));
        
        var date = new Date(response.bitcoin.last_updated_at*1000);
        $("#lastUpdatedBTC").html(date.toLocaleTimeString());
    });
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function priceRandomWalk() {
    lCryptoCurrs[0].usdRate += Number(random(-8,8).toFixed(2));
    $("#lCryptoRate0").html(lCryptoCurrs[0].usdRate.toFixed(2));
}


const xValues = ["t-9","t-8","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t"];
var price = [];
    
var priceChart = new Chart("priceChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            data: price,
            borderColor: "red",
            fill: false
        }]
    },
    options: {
        legend: {display: false},
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'BTC Price Chart'
            }
        }
    }
});

function updatePriceChart() {
    if (!(price.length==xValues.length)){
        xValues.forEach(element => {
            price.push(lCryptoCurrs[0].usdRate);
        });
    }
    price.shift();
    price.push(lCryptoCurrs[0].usdRate);
    priceChart.data.datasets.data = price;
    priceChart.update();
}


function createIncomeStructureChart() {
    var incomeStructureChartLabels = ["Miner0", "Miner1","Miner2", "Miner3"];
    var incomeStructureChartValues = [];
    incomeStructureChartValues = [];
    if (!(incomeStructureChartValues.length==incomeStructureChartLabels.length)){
        lMiners.forEach(Miner => {
            //Person.ownedMiners[miner_level] * lMiners[miner_level].base_income *Person.mainMultiplier
            incomeStructureChartValues.push(Person.ownedMiners[Miner.level] * lMiners[Miner.level].base_income *Person.mainMultiplier);
        });
    }
    console.log(incomeStructureChartValues);
    var incomeStructureChart = new Chart("incomeStructureChart", {
        type: "pie",
        data: {
            labels: incomeStructureChartLabels,
            datasets: [{
                data: incomeStructureChartValues,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(54, 255, 86)'
                    ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true
        }
    });
}

let attached = false;
let imageContainer = document.querySelector("#image");

const followMouse = (event) => {
    imageContainer.style.left = event.x + "px";
    var y = event.y + Math.ceil(window.scrollY);
    imageContainer.style.top =  y + "px";
}

function showImage() {
    createIncomeStructureChart();
    if (!attached) {
        attached = true;
        imageContainer.style.display = "block";
        document.addEventListener("pointermove", followMouse);
    }
}

function hideImage() {
    attached = false;
    imageContainer.style.display = "";
    document.removeEventListener("pointermove", followMouse);
}