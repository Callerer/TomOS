const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function showDate() {


    let d = new Date();
    let monthd = month[d.getMonth()];
    let day = weekday[d.getDay()];
    let hour = d.getHours();
    let minute = d.getMinutes();

    if (minute <= 9) {
        minute = "0" + minute;
    }

    if (hour <= 9) {
        hour = "0" + hour;
    }

    document.querySelector(".datetime").innerHTML = day + " " + d.getDate() + " " + monthd + " " + d.getFullYear() + " | " + hour + ":" + minute
}

showDate();
var t = setInterval(showDate, 1000);

