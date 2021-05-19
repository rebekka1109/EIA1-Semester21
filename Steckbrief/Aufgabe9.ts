var zaehler: number = 0;
var userTask: any = (document.getElementById("new-task")); 

var checkInputBool: boolean = false;
var preventEvent: boolean = false;

document.addEventListener("keydown", function(event: KeyboardEvent): void { 
    if (event.code == "Enter" && checkInputBool == true) {
            createTask();
            setTimeout(function(): void {
                clearInput();
            }, 100);
            preventEvent = false;
    }
});


document.addEventListener("click", function(): void {
    if (preventEvent == false) {
    checkInputBool = false;
    }
});


userTask.addEventListener("click", function(): void {
    checkInputBool = true;
    preventEvent = true;
});

function createTask (): void { 


    let container: HTMLDivElement = document.createElement("div");
    let icon1: HTMLElement = document.createElement("i");
    icon1.className = "far fa-circle";
    let icon2: HTMLElement = document.createElement("i");
    icon2.className = "far fa-check-circle isHidden";
    let text: HTMLSpanElement = document.createElement("span");
    text.className = "task-text";
    text.innerHTML = userTask.value;
    let icon3: HTMLElement = document.createElement("i");
    icon3.className = "fas fa-trash-alt";

    
    document.body.appendChild(container);
    container.appendChild(icon1);
    container.appendChild(icon2);
    container.appendChild(text);
    container.appendChild(icon3);

    
    zaehler++;
    counter();

    
    icon1.addEventListener("click", function(): void {
        icon1.classList.add("isHidden");
        icon2.classList.remove("isHidden");
        text.setAttribute("style", "text-decoration: " + "line-through");
    });

    icon2.addEventListener("click", function(): void {
        icon2.classList.add("isHidden");
        icon1.classList.remove("isHidden");
        text.setAttribute("style", "text-decoration: " + "none");
    });

    icon3.addEventListener("click", function(): void {
        document.body.removeChild(container);
        zaehler--;
        counter();
    });
}

function counter(): void {
    document.querySelector("#counter").innerHTML = zaehler + " tasks are";
}

function clearInput(): void {
    userTask.value = "";
}