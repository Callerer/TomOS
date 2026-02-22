function mainMenu() {
    let homeButton = document.querySelector(".homeButton");
    let mainMenu = document.querySelector(".mainMenu");

    if (homeButton.className.includes("selected") == true) {
        homeButton.className = "homeButton";
        mainMenu.style.display = "none"
    } else {
        homeButton.className = "homeButton selected";
        mainMenu.style.display = "flex"

    }

}

function closethis(that) {
    that.parentNode.parentNode.style = "display: none;";
}

function closethisapp(that) {
    that.parentNode.style.display = "none"
}

function openApp(variable) {

    switch (variable) {
        case "terminal":
            document.querySelector(".terminal").style.display = "flex"
            break;
        case "texteditor":
            document.querySelector(".texteditor").style.display = "flex"
            break;
        case "calc":
            document.querySelector(".calc").style.display = "flex"
            break;
        default:
            break;
    }


}

function typeCalc(that){
    let calcArea = document.querySelector(".calcArea")
    calcArea.innerHTML += that;
}

function calculate(){
    let calcArea = document.querySelector(".calcArea")
    let calculation = eval(calcArea.innerHTML);
    calcArea.innerHTML = calculation;
}