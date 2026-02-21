const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function showDate() {


    let d = new Date();
    let monthd = month[d.getMonth()];
    let day = weekday[d.getDay()];
    document.querySelector(".datetime").innerHTML = day + " " + d.getDay() + " " + monthd + " " + d.getFullYear() + " | " + d.getHours() + ":" + d.getMinutes()
}

showDate();
var t = setInterval(showDate, 1000);