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

