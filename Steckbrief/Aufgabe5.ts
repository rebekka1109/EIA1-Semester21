var Africa: string="Africa";
var SouthAmerica: string="SouthAmerica";
var Europe: string="Europe";
var NorthAmerica: string="NorthAmerica";
var Asia: string="Asia";
var Australia: string="Australia";
var Africa2008: number= 1028;
var Africa2018: number= 1235.5;
var SouthAmerica2008: number= 1132.6;
var SouthAmerica2018: number= 1261.5;
var Europe2008: number= 4965.7;
var Europe2018: number= 4209.3;
var NorthAmerica2008: number= 6600.4;
var NorthAmerica2018: number= 6035.6;
var Asia2008: number= 12954.7;
var Asia2018: number= 16274.1;
var Australia2008: number= 1993;
var Australia2018: number= 2100.5;
var Gesamt: number= Africa2018 + SouthAmerica2018 + Europe2018 + NorthAmerica2018 + Asia2018 + Australia2018;

console.log("Die Emission von " + Africa + " ist: " + Africa2018 + "kg CO2");
console.log("Relativ zu Gesamtemission der Welt verursacht " + Africa + " damit " + Math.round(Africa2018/Gesamt*100 *100)/100 + "%");
console.log("Für " + Africa + " hat sich 2018 im Vergleich zu 2008 die Emission um " + Math.round((Africa2018-Africa2008)/Africa2008*100 *100)/100 + "% verändert");
console.log("2018 im Vergleich zu 2008 sind das " + (Africa2018-Africa2008) + "kg CO2");

console.log("Die Emission von " + SouthAmerica + " ist: " + SouthAmerica2018 + "kg CO2");
console.log("Relativ zu Gesamtemission der Welt verursacht " + SouthAmerica + " damit " + Math.round(SouthAmerica2018/Gesamt*100 *100)/100 + "%");
console.log("Für " + SouthAmerica + " hat sich 2018 im Vergleich zu 2008 die Emission um " + Math.round((SouthAmerica2018-SouthAmerica2008)/SouthAmerica2008*100 *100)/100 + "% verändert");
console.log("2018 im Vergleich zu 2008 sind das " + Math.round((SouthAmerica2018-SouthAmerica2008)*100)/100 + "kg CO2");

console.log("Die Emission von " + Europe + " ist: " + Europe2018 + "kg CO2");
console.log("Relativ zu Gesamtemission der Welt verursacht " + Europe + " damit " + Math.round(Europe2018/Gesamt*100 *100)/100 + "%");
console.log("Für " + Europe + " hat sich 2018 im Vergleich zu 2008 die Emission um " + Math.round((Europe2018-Europe2008)/Europe2008*100 *100)/100 + "% verändert");
console.log("2018 im Vergleich zu 2008 sind das " + Math.round((Europe2018-Europe2008)*100)/100 + "kg CO2");

console.log("Die Emission von " + NorthAmerica + " ist: " + NorthAmerica2018 + "kg CO2");
console.log("Relativ zu Gesamtemission der Welt verursacht " + NorthAmerica + " damit " + Math.round(NorthAmerica2018/Gesamt*100 *100)/100 + "%");
console.log("Für " + NorthAmerica + " hat sich 2018 im Vergleich zu 2008 die Emission um " + Math.round((NorthAmerica2018-NorthAmerica2008)/NorthAmerica2008*100 *100)/100 + "% verändert");
console.log("2018 im Vergleich zu 2008 sind das " + Math.round((NorthAmerica2018-NorthAmerica2008)*100)/100 + "kg CO2");

console.log("Die Emission von " + Asia + " ist: " + Asia2018 + "kg CO2");
console.log("Relativ zu Gesamtemission der Welt verursacht " + Asia + " damit " + Math.round(Asia2018/Gesamt*100 *100)/100 + "%");
console.log("Für " + Asia + " hat sich 2018 im Vergleich zu 2008 die Emission um " + Math.round((Asia2018-Asia2008)/Asia2008*100 *100)/100 + "% verändert");
console.log("2018 im Vergleich zu 2008 sind das " + Math.round((Asia2018-Asia2008)*100)/100 + "kg CO2");

console.log("Die Emission von " + Australia + " ist: " + Australia2018 + "kg CO2");
console.log("Relativ zu Gesamtemission der Welt verursacht " + Australia + " damit " + Math.round(Australia2018/Gesamt*100 *100)/100 + "%");
console.log("Für " + Australia + " hat sich 2018 im Vergleich zu 2008 die Emission um " + Math.round((Australia2018-Australia2008)/Australia2008*100 *100)/100 + "% verändert");
console.log("2018 im Vergleich zu 2008 sind das " + (Australia2018-Australia2008) + "kg CO2");