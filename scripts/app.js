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
        case "aboutWorkstation":
            document.querySelector(".aboutWorkstation").style.display = "flex"
            break;
        case "internet":
            document.querySelector(".internet").style.display = "flex"
            break;
        case "filesystem":
            document.querySelector(".filesystem").style.display = "flex"
            break;
        case "snake":
            document.querySelector(".snake").style.display = "flex"
            break;
        case "tictactoe":
            document.querySelector(".tictactoe").style.display = "flex"
            break;
        case "settings":
            document.querySelector(".settings").style.display = "flex"
            break;
        default:
            break;
    }


}

function typeCalc(that) {
    let calcArea = document.querySelector(".calcArea")
    calcArea.innerHTML += that;
}

function calculate() {
    let calcArea = document.querySelector(".calcArea")
    let calculation = eval(calcArea.innerHTML);
    calcArea.innerHTML = calculation;
}

function resizeMenu() {
    let mainMenu = document.querySelector(".mainMenu")
    let extralist = document.querySelector(".extraMenuList")

    if (mainMenu.className == "mainMenu") {
        mainMenu.className = "mainMenu expanded"
        extralist.style.display = "block";
    } else {
        mainMenu.className = "mainMenu"
        extralist.style.display = "none";
    }
}

function changeImage(source) {
    let main = document.querySelector(".main")
    main.style = `
    min-height: 100vh;
    width: 100%;
    background-color: rgb(122, 41, 122);
    background-image: url("${source}");
    background-size: cover;
    background-position: center;
`
}

function changeColor(that) {

    let colorclass = that.dataset.color;
    console.log("function activated color: " + colorclass)
    let main = document.querySelector(".main")
    main.style = `
    min-height: 100vh;
    width: 100%;
    background-image: none;
    background-size: cover;
    background-position: center;
`
    main.className = `main ${colorclass}`
}

function openSetting(that) {
    console.log(that);

    switch (that) {
        case "Background":
            document.querySelector(".settingStartMenu").style.display = "none";
            document.querySelector(".settingBackgroundMenuContainer").style.display = "block";
            break;
        case "Logo":
            document.querySelector(".settingStartMenu").style.display = "none";
            document.querySelector(".settingLogoMenuContainer").style.display = "block";
            break;
        default:
            break;
    }
}

function changeLogo(source){
document.querySelector(".homeButton").src = source;
}

function settingMainMenu(parent){
parent.style.display = "none"
document.querySelector(".settingStartMenu").style.display = "flex"
}

function changeCSS(csstext){
    document.querySelector("#customCSS").innerHTML = document.querySelector("#csstext").innerHTML
}
