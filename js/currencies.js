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
        console.log(response.bitcoin.usd);
        console.log(response.bitcoin.last_updated_at);
        lCryptoCurrs[0].usdRate = Number(response.bitcoin.usd);
        $("#lCryptoRate0").html(lCryptoCurrs[0].usdRate.toFixed(2));
        
        var date = new Date(response.bitcoin.last_updated_at*1000);
        $("#lastUpdatedBTC").html(date.toLocaleTimeString());
    });
}