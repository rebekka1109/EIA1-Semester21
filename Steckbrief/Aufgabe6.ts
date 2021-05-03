var ContinentAfrica: string = "Africa";
var ContinentSouthAmerica: string = "South America";
var ContinentEurope: string = "Europe";
var ContinentNorthAmerica: string = "North America";
var ContinentAsia: string = "Asia";
var ContinentAustralia: string = "Australia";
var Africa2008: number = 1028;
var Africa2018: number = 1235.5;
var SouthAmerica2008: number = 1132.6;
var SouthAmerica2018: number = 1261.5;
var Europe2008: number = 4965.7;
var Europe2018: number = 4209.3;
var NorthAmerica2008: number = 6600.4;
var NorthAmerica2018: number = 6035.6;
var Asia2008: number = 12954.7;
var Asia2018: number = 16274.2;
var Australia2008: number = 1993;
var Australia2018: number = 2100.5;
var Gesamt: number = Africa2018 + SouthAmerica2018 + Europe2018 + NorthAmerica2018 + Asia2018 + Australia2018;

window.addEventListener('load', function () {

    document.querySelector('.europe').addEventListener('click', function () { emissions(ContinentEurope, Europe2018, Europe2008) });
    document.querySelector('.northamerica').addEventListener('click', function () { emissions(ContinentNorthAmerica, NorthAmerica2018, NorthAmerica2008) });
    document.querySelector('.southamerica').addEventListener('click', function () { emissions(ContinentSouthAmerica, SouthAmerica2018, SouthAmerica2008) });
    document.querySelector('.africa').addEventListener('click', function () { emissions(ContinentAfrica, Africa2018, Africa2008) });
    document.querySelector('.asia').addEventListener('click', function () { emissions(ContinentAsia, Asia2018, Asia2008) });
    document.querySelector('.australia').addEventListener('click', function () { emissions(ContinentAustralia, Australia2018, Australia2008) });

    function emissions(continent: string, continent2018: number, continent2008: number) {
        document.querySelector("#titleRegion").innerHTML = continent;
        document.querySelector("#subtitleRegion").innerHTML = continent;
        document.querySelector("#continent2018").innerHTML = continent2018.toString();
        document.querySelector("#continentRelative").innerHTML = Math.round(continent2018 / Gesamt * 100 * 100) / 100 + "%";
        document.querySelector("#continentGrowthRateRel").innerHTML = Math.round((continent2018 - continent2008) / continent2008 * 100 * 100) / 100 + "%";
        document.querySelector("#continentGrowthRateAbs").innerHTML = (Math.round((continent2018 - continent2008) * 100) / 100).toString();
        document.querySelector(".chartWrapper .chart").setAttribute('style', 'height:' + continent2018 / Gesamt * 100 + '%')
    };
});