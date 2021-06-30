//Variablen//
var allTicTacToes = [];
var allDifficulties = [{ value: 3, name: "Leicht" }, { value: 4, name: "Mittel" }, { value: 5, name: "Schwer" }];
var player1Turn = true;
var player1Score = 0;
var player2Score = 0;
var round = 0;
var infoField;
var playField;
var comGame = false;
var factor;
//Zuweisung des Spielfelds + Menü//
window.addEventListener("load", function () {
    infoField = document.querySelector("#info");
    playField = document.querySelector("#field");
    drawStartScreen();
});
//Funktion um Spielmodus zu wählen//
//Funktion des Knöpfe//
function drawStartScreen() {
    infoField.innerHTML = "<h2> Willkommen bei Tic Tac Toe! </h2> <p> Wähle einen Spielmodus: </p>";
    playField.innerHTML = "";
    playField.style.visibility = "hidden";
    comGame = false;
    var pvcButton = document.createElement("button");
    var pvpButton = document.createElement("button");
    var pvcNode = document.createTextNode("Spieler gegen COM");
    var pvpNode = document.createTextNode("Spieler gegen Spieler");
    pvcButton.appendChild(pvcNode);
    pvpButton.appendChild(pvpNode);
    infoField.appendChild(pvcButton);
    infoField.appendChild(pvpButton);
    pvcButton.addEventListener("click", function () { comGame = true; drawDifficultyScreen(); });
    pvpButton.addEventListener("click", function () { drawDifficultyScreen(); });
}
//Funktion um Schwierigkeit zu wählen//
//Aufzählung jeweiliger Variablen//
//Funktion der Knöpfe//
function drawDifficultyScreen() {
    infoField.innerHTML = "<h2> Willkommen bei Tic Tac Toe! </h2> <p> Wähle einen Schwierigkeitsgrad: </p>";
    playField.innerHTML = "";
    var _loop_1 = function (i_1) {
        var difficulty = allDifficulties[i_1];
        var newDifficultyButton = document.createElement("button");
        var node = document.createTextNode(difficulty.name);
        var idDifficultyButton = document.createAttribute("id");
        idDifficultyButton.value = (allDifficulties[i_1].value).toString();
        newDifficultyButton.appendChild(node);
        newDifficultyButton.setAttributeNode(idDifficultyButton);
        infoField.appendChild(newDifficultyButton);
        newDifficultyButton.addEventListener("click", function () { setDifficulty(allDifficulties[i_1].value, i_1); });
    };
    for (var i_1 = 0; i_1 < allDifficulties.length; i_1++) {
        _loop_1(i_1);
    }
    //Funktion + Variablen des Zurück-Buttons//
    var backButton = document.createElement("p");
    backButton.innerHTML = "< Zurück";
    var backButtonId = document.createAttribute("id");
    backButtonId.value = "back";
    backButton.setAttributeNode(backButtonId);
    infoField.appendChild(backButton);
    backButton.addEventListener("click", function () { drawStartScreen(); });
}
//Aufbau/Maße der jeweiligen Spielfelder//
function setDifficulty(difficulty, difficultyId) {
    allTicTacToes.length = 0;
    for (var x = 0; x < difficulty; x++) {
        allTicTacToes[x] = [];
        for (var y = 0; y < difficulty; y++) {
            allTicTacToes[x][y] = { state: "free" };
        }
    }
    var cssWidthHeight = 228 + 76 * difficultyId + "px";
    playField.style.width = cssWidthHeight;
    playField.style.height = cssWidthHeight;
    factor = difficultyId;
    drawField();
}
function drawField() {
    playField.innerHTML = "";
    infoField.innerHTML = "";
    playField.style.visibility = "visible";
    for (var x = 0; x < allTicTacToes.length; x++) {
        var _loop_2 = function (y) {
            var ticTacToe = allTicTacToes[x][y];
            var newTicTacToe = document.createElement("div");
            var idTicTacToe = document.createAttribute("id");
            var symbolIcon = document.createElement("i");
            var symbolAtrr = document.createAttribute("class");
            idTicTacToe.value = x.toString() + y.toString();
            //"Click" löst EventListener aus und jeweiliges Symbol erscheint"
            if (ticTacToe.state == "free") {
                newTicTacToe.addEventListener("click", function () { clickHandler(idTicTacToe.value); });
            }
            else {
                if (ticTacToe.state == "X") {
                    symbolAtrr.value = "fas fa-times";
                }
                else {
                    symbolAtrr.value = "far fa-circle";
                }
                symbolIcon.setAttributeNode(symbolAtrr);
                newTicTacToe.appendChild(symbolIcon);
            }
            var fragment = void 0;
            if (factor == 0) {
                fragment = 0.9;
            }
            else if (factor == 1) {
                fragment = 0.7;
            }
            else {
                fragment = 0.53;
            }
            var symbolSize = void 0;
            if (window.innerWidth < 480) {
                fragment = 1;
                if (factor == 0) {
                    symbolSize = 63;
                }
                else if (factor == 1) {
                    symbolSize = 47;
                }
                else {
                    symbolSize = 36;
                }
            }
            var ticTacToeWidhHeight = (1 / allTicTacToes.length) * 100 - fragment + "%";
            newTicTacToe.style.width = ticTacToeWidhHeight;
            newTicTacToe.style.height = ticTacToeWidhHeight;
            newTicTacToe.setAttributeNode(idTicTacToe);
            playField.appendChild(newTicTacToe);
            symbolIcon.style.fontSize = symbolSize + "px";
        };
        for (var y = 0; y < allTicTacToes.length; y++) {
            _loop_2(y);
        }
    }
    //Funtion des Fortschrittsbalken//
    var player1ScoreElement = document.createElement("span");
    var player1ScoreNode = document.createTextNode("Spieler 1 Punkte: " + player1Score);
    var player2ScoreElement = document.createElement("span");
    var player2ScoreNode = document.createTextNode(" | Spieler 2 Punkte: " + player2Score);
    if (comGame == true) {
        player1ScoreNode = document.createTextNode("COM Punkte: " + player1Score);
        player2ScoreNode = document.createTextNode(" | Deine Punkte: " + player2Score);
    }
    var roundCounterElement = document.createElement("span");
    var roundCounterNode = document.createTextNode(" | Runde: " + (round + 1) + "/" + allTicTacToes.length);
    var progressBar = document.createElement("div");
    var barId = document.createAttribute("id");
    barId.value = "progressBar";
    progressBar.setAttributeNode(barId);
    var progress = ((1 / allTicTacToes.length) * 100) * (round + 1);
    progressBar.style.background = "linear-gradient(90deg, rgb(106, 182, 106) " + progress + "%, white " + progress + "%)";
    player1ScoreElement.appendChild(player1ScoreNode);
    player2ScoreElement.appendChild(player2ScoreNode);
    roundCounterElement.appendChild(roundCounterNode);
    infoField.appendChild(player1ScoreElement);
    infoField.appendChild(player2ScoreElement);
    infoField.appendChild(roundCounterElement);
    infoField.appendChild(progressBar);
    if (player1Turn == true && comGame == true) {
        comTurn();
    }
}
//Funktion des Computers//
//Wo können Symbole gesetzt werden//
//Wann können Symbole gesetzt werden//
function comTurn() {
    setTimeout(function () {
        while (player1Turn == true) {
            var random1 = Math.floor(Math.random() * allTicTacToes.length);
            var random2 = Math.floor(Math.random() * allTicTacToes.length);
            var randomTicTacToe = allTicTacToes[random1][random2];
            if (randomTicTacToe.state == "free") {
                break;
            }
        }
        clickHandler(random1.toString() + random2.toString());
    }, 200);
}
//Alle möglichen Spielergebnisse als Verzweigung//
function clickHandler(xy) {
    for (var x = 0; x < allTicTacToes.length; x++) {
        for (var y = 0; y < allTicTacToes.length; y++) {
            var ticTacToe = allTicTacToes[x][y];
            if (x.toString() + y.toString() == xy) {
                if (player1Turn == true) {
                    ticTacToe.state = "X";
                }
                else {
                    ticTacToe.state = "O";
                }
            }
        }
    }
    player1Turn = !player1Turn;
    var roundEnd = checkRoundEnd();
    if (roundEnd == "win" || roundEnd == "draw") {
        endRestartRound(roundEnd);
    }
    else {
        drawField();
    }
}
//Alle möglichen Spielabläufe als Verzweigungen//
function checkRoundEnd() {
    var freeCount = 0;
    for (var x = 0; x < allTicTacToes.length; x++) {
        var win_1 = false;
        var correctSymbols_1 = 0;
        for (var y = 0; y < allTicTacToes.length; y++) {
            var ticTacToe = allTicTacToes[x][y];
            if (ticTacToe.state != "free") {
                if (ticTacToe.state == "X") {
                    correctSymbols_1++;
                }
            }
            else {
                freeCount++;
                correctSymbols_1 = NaN;
            }
        }
        if (correctSymbols_1 == 0 || correctSymbols_1 == allTicTacToes.length) {
            win_1 = true;
        }
        if (win_1 == true) {
            return ("win");
        }
        win_1 = false;
        correctSymbols_1 = 0;
        for (var y = 0; y < allTicTacToes.length; y++) {
            var ticTacToe = allTicTacToes[y][x];
            if (ticTacToe.state != "free") {
                if (ticTacToe.state == "X") {
                    correctSymbols_1++;
                }
            }
            else {
                correctSymbols_1 = NaN;
            }
        }
        if (correctSymbols_1 == 0 || correctSymbols_1 == allTicTacToes.length) {
            win_1 = true;
        }
        if (win_1 == true) {
            return ("win");
        }
    }
    var win = false;
    var correctSymbols = 0;
    for (var x = 0; x < allTicTacToes.length; x++) {
        var ticTacToe = allTicTacToes[x][x];
        if (ticTacToe.state != "free") {
            if (ticTacToe.state == "X") {
                correctSymbols++;
            }
        }
        else {
            correctSymbols = NaN;
        }
    }
    if (correctSymbols == 0 || correctSymbols == allTicTacToes.length) {
        win = true;
    }
    if (win == true) {
        return ("win");
    }
    win = false;
    correctSymbols = 0;
    for (var x = 0; x < allTicTacToes.length; x++) {
        var ticTacToe = allTicTacToes[x][allTicTacToes.length - 1 - x];
        if (ticTacToe.state != "free") {
            if (ticTacToe.state == "X") {
                correctSymbols++;
            }
        }
        else {
            correctSymbols = NaN;
        }
    }
    if (correctSymbols == 0 || correctSymbols == allTicTacToes.length) {
        win = true;
    }
    if (win == true) {
        return ("win");
    }
    if (freeCount == 0) {
        return ("draw");
    }
}
//Ende eines Spiels wird definiert"
function endRestartRound(roundEnd) {
    if (roundEnd == "win") {
        if (player1Turn == false) {
            player1Score++;
        }
        else {
            player2Score++;
        }
    }
    round += 1;
    var difficultyIndex = 0;
    if (allTicTacToes.length == 4) {
        difficultyIndex = 1;
    }
    else if (allTicTacToes.length == 5) {
        difficultyIndex = 2;
    }
    if (round < allTicTacToes.length) {
        setDifficulty(allDifficulties[difficultyIndex].value, difficultyIndex);
    }
    else {
        gameOver(difficultyIndex);
    }
}
function gameOver(difficultyIndex) {
    playField.innerHTML = "";
    infoField.innerHTML = "";
    playField.style.width = "0px";
    playField.style.height = "0px";
    playField.style.visibility = "hidden";
    //Ergebnis wird gezeigt//
    var winner;
    if (player1Score > player2Score) {
        winner = "Spieler 1 ( <i class= 'fas fa-times' ></i> ) hat gewonnen!";
        if (comGame == true) {
            winner = "COM ( <i class= 'fas fa-times' ></i> ) hat gewonnen!";
        }
    }
    else if (player2Score > player1Score) {
        winner = "Spieler 2 ( <i class= 'far fa-circle' ></i> ) hat gewonnen!";
        if (comGame == true) {
            winner = "Du ( <i class= 'far fa-circle' ></i> ) hast gewonnen!";
        }
    }
    else {
        winner = "Unentschieden!";
    }
    //Variablen für Endmenü//
    var winnerAnnouncement = document.createElement("p");
    var restartButton = document.createElement("button");
    var startScreenButton = document.createElement("button");
    var br = document.createElement("br");
    var restartNode = document.createTextNode("Wiederholen");
    var startScreenNode = document.createTextNode("Zurück zum Startbildschirm");
    var buttonIdMobile = document.createAttribute("id");
    buttonIdMobile.value = "buttonMobile";
    winnerAnnouncement.innerHTML = winner;
    infoField.appendChild(winnerAnnouncement);
    restartButton.appendChild(restartNode);
    startScreenButton.appendChild(startScreenNode);
    startScreenButton.setAttributeNode(buttonIdMobile);
    infoField.appendChild(restartButton);
    infoField.appendChild(br);
    infoField.appendChild(startScreenButton);
    player1Turn = true;
    player1Score = 0;
    player2Score = 0;
    round = 0;
    restartButton.addEventListener("click", function () { setDifficulty(allDifficulties[difficultyIndex].value, difficultyIndex); });
    startScreenButton.addEventListener("click", function () { drawStartScreen(); });
}
//# sourceMappingURL=Endaufgabe.js.map