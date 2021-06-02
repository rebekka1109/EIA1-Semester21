interface InterfaceListe {
    content: string;
    checked: boolean;
}
let newArray: InterfaceListe[] = [
    {
        content: "Schlafen",
        checked: true
    },
    {
        content: "Chillen",
        checked: false
    },
    {
        content: "Netflix",
        checked: false
    }
];

declare const artyom: any;

window.addEventListener("click", function (): void {
    const artyom: any = new Artyom();

    function startContinuousArtyom(): void {
        artyom.fatality();

        setTimeout(
            function (): void {
                artyom.initialize({
                    lang: "de-DE",
                    continuous: true,
                    listen: true,
                    interimResults: true,
                    debug: true
                }).then(function (): void {
                    console.log("Ready!");
                });
            },
            250);
    }
    startContinuousArtyom();

    artyom.addCommands({
        indexes: ["erstelle Aufgabe *"],
        smart: true,
        action: function (i: any, wildcard: string): void { 
            newArray.unshift({
                content: wildcard,
                checked: false
            });

            drawListToDOM();
            console.log("Folgende Aufgabe wird der Liste hinzugefügt: " + wildcard);
            artyom.say("Deine Aufgabe" + wildcard + " wurde der Liste hinzugefügt.");
        }
    });
    document.querySelector("#voiceControl").addEventListener("click", function (): void {
        artyom.say("Welche Aufgabe soll ich der Liste hinzufügen?");
        startContinuousArtyom();
    });
});

var inputDOMElement: HTMLInputElement;
var addButtonDOMElement: HTMLElement;
var todosDOMElement: HTMLElement;
var counterDOMElement: HTMLElement;
var doneDOMElement: HTMLElement;
var openDOMElement: HTMLElement;


window.addEventListener("load", function (): void {

    inputDOMElement = document.querySelector("#inputTodo");
    addButtonDOMElement = document.querySelector("#addButton");
    todosDOMElement = document.querySelector("#todos");
    counterDOMElement = document.querySelector("#counter");
    doneDOMElement = document.querySelector("#done");
    openDOMElement = document.querySelector("#open");

    addButtonDOMElement.addEventListener("click", addTodo);
    drawListToDOM();
});

function drawListToDOM(): void {

    todosDOMElement.innerHTML = "";

    for (let index: number = 0; index < newArray.length; index++) {

        let todo: HTMLElement = document.createElement("div");
        todo.classList.add("todo");

        todo.innerHTML = "<span class='check " + newArray[index].checked + "'><i class='fas fa-check'></i></span>"
            + newArray[index].content +
            "<span class='trash fas fa-trash-alt'></span>";

        todo.querySelector(".check").addEventListener("click", function (): void {
            toggleCheckState(index);
        });
        todo.querySelector(".trash").addEventListener("click", function (): void {
            deleteTodo(index);
        });
        todosDOMElement.appendChild(todo);
    }

    updateCounter();
    taskDone();
    taskOpen();
}

function updateCounter(): void {
    counterDOMElement.innerHTML = newArray.length + " in total";
}

function taskDone(): void {
    var done: number = 0;
    for (var index: number = 0; index < newArray.length; index++) {
        if (newArray[index].checked == true)
        done++;
    }
    doneDOMElement.innerHTML = done + " done";
}

function taskOpen(): void {
    var open: number = 0;
    for (var index: number = 0; index < newArray.length; index++) {
        if (newArray[index].checked == false)
        open++;
    }
    openDOMElement.innerHTML = open + " open";
}

function addTodo(): void {

    if (inputDOMElement.value != "") {

        newArray.unshift(
            {
                content: inputDOMElement.value,
                checked: false
            }
        );
        inputDOMElement.value = "";
        drawListToDOM();
    }
}


function toggleCheckState(index: number): void {
    newArray[index].checked = !newArray[index].checked;
    drawListToDOM();
}


function deleteTodo(index: number): void {
    newArray.splice(index, 1);
    drawListToDOM();
}