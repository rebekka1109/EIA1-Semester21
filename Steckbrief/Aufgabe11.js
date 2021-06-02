var newArray = [
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
window.addEventListener("click", function () {
    var artyom = new Artyom();
    function startContinuousArtyom() {
        artyom.fatality();
        setTimeout(function () {
            artyom.initialize({
                lang: "de-DE",
                continuous: true,
                listen: true,
                interimResults: true,
                debug: true
            }).then(function () {
                console.log("Ready!");
            });
        }, 250);
    }
    startContinuousArtyom();
    artyom.addCommands({
        indexes: ["erstelle Aufgabe *"],
        smart: true,
        action: function (i, wildcard) {
            newArray.unshift({
                content: wildcard,
                checked: false
            });
            drawListToDOM();
            console.log("Folgende Aufgabe wird der Liste hinzugefügt: " + wildcard);
            artyom.say("Deine Aufgabe" + wildcard + " wurde der Liste hinzugefügt.");
        }
    });
    document.querySelector("#voiceControl").addEventListener("click", function () {
        artyom.say("Welche Aufgabe soll ich der Liste hinzufügen?");
        startContinuousArtyom();
    });
});
var inputDOMElement;
var addButtonDOMElement;
var todosDOMElement;
var counterDOMElement;
var doneDOMElement;
var openDOMElement;
window.addEventListener("load", function () {
    inputDOMElement = document.querySelector("#inputTodo");
    addButtonDOMElement = document.querySelector("#addButton");
    todosDOMElement = document.querySelector("#todos");
    counterDOMElement = document.querySelector("#counter");
    doneDOMElement = document.querySelector("#done");
    openDOMElement = document.querySelector("#open");
    addButtonDOMElement.addEventListener("click", addTodo);
    drawListToDOM();
});
function drawListToDOM() {
    todosDOMElement.innerHTML = "";
    var _loop_1 = function (index_1) {
        var todo = document.createElement("div");
        todo.classList.add("todo");
        todo.innerHTML = "<span class='check " + newArray[index_1].checked + "'><i class='fas fa-check'></i></span>"
            + newArray[index_1].content +
            "<span class='trash fas fa-trash-alt'></span>";
        todo.querySelector(".check").addEventListener("click", function () {
            toggleCheckState(index_1);
        });
        todo.querySelector(".trash").addEventListener("click", function () {
            deleteTodo(index_1);
        });
        todosDOMElement.appendChild(todo);
    };
    for (var index_1 = 0; index_1 < newArray.length; index_1++) {
        _loop_1(index_1);
    }
    updateCounter();
    taskDone();
    taskOpen();
}
function updateCounter() {
    counterDOMElement.innerHTML = newArray.length + " in total";
}
function taskDone() {
    var done = 0;
    for (var index = 0; index < newArray.length; index++) {
        if (newArray[index].checked == true)
            done++;
    }
    doneDOMElement.innerHTML = done + " done";
}
function taskOpen() {
    var open = 0;
    for (var index = 0; index < newArray.length; index++) {
        if (newArray[index].checked == false)
            open++;
    }
    openDOMElement.innerHTML = open + " open";
}
function addTodo() {
    if (inputDOMElement.value != "") {
        newArray.unshift({
            content: inputDOMElement.value,
            checked: false
        });
        inputDOMElement.value = "";
        drawListToDOM();
    }
}
function toggleCheckState(index) {
    newArray[index].checked = !newArray[index].checked;
    drawListToDOM();
}
function deleteTodo(index) {
    newArray.splice(index, 1);
    drawListToDOM();
}
//# sourceMappingURL=Aufgabe11.js.map