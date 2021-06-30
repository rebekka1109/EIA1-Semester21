//Variablen//

interface TicTacToe { state: string; }
interface Difficulty { value: number; name: string; }
let allTicTacToes: TicTacToe[][] = [];
let allDifficulties: Difficulty[] = [{value: 3, name: "Leicht"}, {value: 4, name: "Mittel"}, {value: 5, name: "Schwer"}];
let player1Turn: boolean = true;
let player1Score: number = 0;
let player2Score: number = 0;
let round: number = 0;
let infoField: HTMLElement;
let playField: HTMLElement;
let comGame: boolean = false;
let factor: number;

//Zuweisung des Spielfelds + Menü//

window.addEventListener("load", function(): void {
    infoField = document.querySelector("#info");
    playField = document.querySelector("#field");
    drawStartScreen();
});

//Funktion um Spielmodus zu wählen//
//Funktion des Knöpfe//

function drawStartScreen(): void {
    infoField.innerHTML = "<h2> Willkommen bei Tic Tac Toe! </h2> <p> Wähle einen Spielmodus: </p>";
    playField.innerHTML = "";
    playField.style.visibility = "hidden";
    comGame = false;

    let pvcButton: HTMLButtonElement = document.createElement("button");
    let pvpButton: HTMLButtonElement = document.createElement("button");
    let pvcNode: Node = document.createTextNode("Spieler gegen COM");
    let pvpNode: Node = document.createTextNode("Spieler gegen Spieler");

    pvcButton.appendChild(pvcNode);
    pvpButton.appendChild(pvpNode);
    infoField.appendChild(pvcButton);
    infoField.appendChild(pvpButton);
    
    pvcButton.addEventListener("click", function (): void { comGame = true; drawDifficultyScreen(); });
    pvpButton.addEventListener("click", function (): void { drawDifficultyScreen(); });
}

//Funktion um Schwierigkeit zu wählen//
//Aufzählung jeweiliger Variablen//
//Funktion der Knöpfe//

function drawDifficultyScreen(): void {
    infoField.innerHTML = "<h2> Willkommen bei Tic Tac Toe! </h2> <p> Wähle einen Schwierigkeitsgrad: </p>";
    playField.innerHTML = "";

    for (let i: number = 0; i < allDifficulties.length; i++) {
        let difficulty: Difficulty = allDifficulties[i];

        let newDifficultyButton: HTMLButtonElement = document.createElement("button");
        let node: Node = document.createTextNode(difficulty.name);
        let idDifficultyButton: Attr = document.createAttribute("id");
        

        idDifficultyButton.value = (allDifficulties[i].value).toString();
      
        newDifficultyButton.appendChild(node);
        newDifficultyButton.setAttributeNode(idDifficultyButton);

        infoField.appendChild(newDifficultyButton);
        
        newDifficultyButton.addEventListener("click", function (): void {setDifficulty(allDifficulties[i].value, i); });

    }

    //Funktion + Variablen des Zurück-Buttons//

    let backButton: HTMLParagraphElement = document.createElement("p");
    backButton.innerHTML = "< Zurück";
    let backButtonId: Attr = document.createAttribute("id");
    backButtonId.value = "back";
    backButton.setAttributeNode(backButtonId);
    infoField.appendChild(backButton);
    backButton.addEventListener("click", function(): void {drawStartScreen(); });
}

//Aufbau/Maße der jeweiligen Spielfelder//

function setDifficulty(difficulty: number, difficultyId: number): void {
    allTicTacToes.length = 0;
    for ( let x: number = 0; x < difficulty; x++) {
        allTicTacToes[x] = [];
        for (let y: number = 0; y < difficulty; y++) {
            allTicTacToes[x][y] = {state: "free"};
        }
    }
    let cssWidthHeight: string = 228 + 76 * difficultyId + "px";
    playField.style.width = cssWidthHeight;
    playField.style.height = cssWidthHeight;
    factor = difficultyId;
    
    drawField();
}

function drawField(): void {
    playField.innerHTML = "";
    infoField.innerHTML = "";
    playField.style.visibility = "visible";
    for ( let x: number = 0; x < allTicTacToes.length; x++) {
        for (let y: number = 0; y < allTicTacToes.length; y++) {
            let ticTacToe: TicTacToe = allTicTacToes[x][y];

            let newTicTacToe: HTMLDivElement = document.createElement("div");
            let idTicTacToe: Attr = document.createAttribute("id");
            let symbolIcon: HTMLElement = document.createElement("i");
            let symbolAtrr: Attr = document.createAttribute("class");

            idTicTacToe.value = x.toString() +  y.toString();

            //"Click" löst EventListener aus und jeweiliges Symbol erscheint"

            if (ticTacToe.state == "free") {
                newTicTacToe.addEventListener("click", function (): void {clickHandler(idTicTacToe.value); });
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
            let fragment: number;
            if (factor == 0) {
                fragment = 0.9;

            }
            else if (factor == 1) {
                fragment = 0.7;
            }
            else {
                fragment = 0.53;
            }
            let symbolSize: number;
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
            let ticTacToeWidhHeight: string = (1 / allTicTacToes.length) * 100 - fragment + "%"; 
            newTicTacToe.style.width = ticTacToeWidhHeight;
            newTicTacToe.style.height = ticTacToeWidhHeight;
            newTicTacToe.setAttributeNode(idTicTacToe);
            playField.appendChild(newTicTacToe);
            symbolIcon.style.fontSize = symbolSize + "px";
        }
    }

    //Funtion des Fortschrittsbalken//

    let player1ScoreElement: HTMLSpanElement = document.createElement("span");
    let player1ScoreNode: Node = document.createTextNode("Spieler 1 Punkte: " + player1Score);
    let player2ScoreElement: HTMLSpanElement = document.createElement("span");
    let player2ScoreNode: Node = document.createTextNode(" | Spieler 2 Punkte: " + player2Score);
    if (comGame == true) {
        player1ScoreNode = document.createTextNode("COM Punkte: " + player1Score);
        player2ScoreNode =  document.createTextNode(" | Deine Punkte: " + player2Score);
    }
    let roundCounterElement: HTMLSpanElement = document.createElement("span");
    let roundCounterNode: Node = document.createTextNode(" | Runde: " + (round + 1) + "/" + allTicTacToes.length);

    let progressBar: HTMLDivElement = document.createElement("div");
    let barId: Attr = document.createAttribute("id");
    barId.value = "progressBar";
    progressBar.setAttributeNode(barId);
    let progress: number = ((1 / allTicTacToes.length) * 100) * (round + 1);
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

function comTurn(): void {
    setTimeout(function (): void {
        while (player1Turn == true) {
            var random1: number = Math.floor(Math.random() * allTicTacToes.length);
            var random2: number = Math.floor(Math.random() * allTicTacToes.length);
            let randomTicTacToe: TicTacToe = allTicTacToes[random1][random2];
            if (randomTicTacToe.state == "free") {
                break;
            }
        }
        clickHandler(random1.toString() + random2.toString());
    },         200);
}

//Alle möglichen Spielergebnisse als Verzweigung//

function clickHandler(xy: string): void {
    for (let x: number = 0; x < allTicTacToes.length; x++) {
        for (let y: number = 0; y < allTicTacToes.length; y++) {
            let ticTacToe: TicTacToe = allTicTacToes[x][y];
            if (x.toString() +  y.toString() == xy) {
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
    let roundEnd: string = checkRoundEnd();
    if (roundEnd == "win" || roundEnd == "draw") {
        endRestartRound(roundEnd);
    }
    else {
        drawField();
    }
}

//Alle möglichen Spielabläufe als Verzweigungen//

function checkRoundEnd(): string {
    let freeCount: number = 0;
    for (let x: number = 0; x < allTicTacToes.length; x++) {
        let win: boolean = false;
        let correctSymbols: number = 0;
        for (let y: number = 0; y < allTicTacToes.length; y++) {
            let ticTacToe: TicTacToe = allTicTacToes[x][y];
            if (ticTacToe.state != "free") {
                if (ticTacToe.state == "X") {
                    correctSymbols++;
                }
            }
            else {
                freeCount++;
                correctSymbols = NaN;
            }
        }
        if (correctSymbols == 0 || correctSymbols == allTicTacToes.length) {
            win = true;
        }
        if (win == true) {
            return("win");
        }
        win = false;
        correctSymbols = 0;
        for (let y: number = 0; y < allTicTacToes.length; y++) {
            let ticTacToe: TicTacToe = allTicTacToes[y][x];
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
            return("win");
        }
    }
    let win: boolean = false;
    let correctSymbols: number = 0;
    for (let x: number = 0; x < allTicTacToes.length; x++) {
        let ticTacToe: TicTacToe = allTicTacToes[x][x];
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
        return("win");
    }
    win = false;
    correctSymbols = 0;
    for (let x: number = 0; x < allTicTacToes.length; x++) {
        let ticTacToe: TicTacToe = allTicTacToes[x][allTicTacToes.length - 1 - x];
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
        return("win");
    }
    if (freeCount == 0) {
        return("draw");
    }
}

//Ende eines Spiels wird definiert"

function endRestartRound(roundEnd: string): void {
    if (roundEnd == "win") {
        if (player1Turn == false) {
            player1Score++;
        }
        else {
            player2Score++;
        }
    }
    round += 1;
    let difficultyIndex: number = 0;
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

function gameOver(difficultyIndex: number): void {
    playField.innerHTML = "";
    infoField.innerHTML = "";
    playField.style.width = "0px";
    playField.style.height = "0px";
    playField.style.visibility = "hidden";

    //Ergebnis wird gezeigt//

    let winner: string;
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

    let winnerAnnouncement: HTMLParagraphElement = document.createElement("p");
    let restartButton: HTMLButtonElement = document.createElement("button");
    let startScreenButton: HTMLButtonElement = document.createElement("button");
    let br: HTMLBRElement = document.createElement("br");
    let restartNode: Node = document.createTextNode("Wiederholen");
    let startScreenNode: Node = document.createTextNode("Zurück zum Startbildschirm");
    let buttonIdMobile: Attr = document.createAttribute("id");
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
    restartButton.addEventListener("click", function (): void {setDifficulty(allDifficulties[difficultyIndex].value, difficultyIndex); });
    startScreenButton.addEventListener("click", function (): void {drawStartScreen(); });
}