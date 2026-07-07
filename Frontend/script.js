alert("Welcome to HomeMind AI!");

// =============================
// Show Logged-in User
// =============================
window.onload = function () {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        document.getElementById("welcomeUser").innerHTML =
            "👋 Welcome, " + currentUser.name;
    }

    updateClock();
};

// =============================
// Command History
// =============================
function addHistory(command) {

    let history = document.getElementById("history");

    let now = new Date();

    let time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    history.innerHTML =
        time + " - " + command + "<br>" + history.innerHTML;

}
// =============================
// Live Clock
// =============================
function updateClock() {

    let now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleString();

}

setInterval(updateClock, 1000);

// =============================
// Light Functions
// =============================
function lightOn() {

    let light = document.getElementById("lightStatus");

    if (light.innerHTML.includes("ON")) {
        alert("⚠️ Light is already ON");
        return;
    }

    light.innerHTML = "💡 Light : ON";
    light.style.color = "green";

    addHistory("💡 Light ON");

    alert("Light Turned ON");
}

function lightOff() {

    let light = document.getElementById("lightStatus");

    if (light.innerHTML.includes("OFF")) {
        alert("⚠️ Light is already OFF");
        return;
    }

    light.innerHTML = "💡 Light : OFF";
    light.style.color = "red";

    addHistory("💡 Light OFF");

    alert("Light Turned OFF");
}

// =============================
// Fan Functions
// =============================
function fanOn() {

    let fan = document.getElementById("fanStatus");

    if (fan.innerHTML.includes("ON")) {
        alert("⚠️ Fan is already ON");
        return;
    }

    fan.innerHTML = "🌀 Fan : ON";
    fan.style.color = "green";

    addHistory("🌀 Fan ON");

    alert("Fan Turned ON");
}

function fanOff() {

    let fan = document.getElementById("fanStatus");

    if (fan.innerHTML.includes("OFF")) {
        alert("⚠️ Fan is already OFF");
        return;
    }

    fan.innerHTML = "🌀 Fan : OFF";
    fan.style.color = "red";

    addHistory("🌀 Fan OFF");

    alert("Fan Turned OFF");
}

// =============================
// AC Functions
// =============================
function acOn() {

    let ac = document.getElementById("acStatus");

    if (ac.innerHTML.includes("ON")) {
        alert("⚠️ AC is already ON");
        return;
    }

    ac.innerHTML = "❄️ AC : ON";
    ac.style.color = "green";

    addHistory("❄️ AC ON");

    alert("AC Turned ON");
}

function acOff() {

    let ac = document.getElementById("acStatus");

    if (ac.innerHTML.includes("OFF")) {
        alert("⚠️ AC is already OFF");
        return;
    }

    ac.innerHTML = "❄️ AC : OFF";
    ac.style.color = "red";

    addHistory("❄️ AC OFF");

    alert("AC Turned OFF");
}

// =============================
// Voice Recognition
// =============================
function startVoice() {

    alert("Voice Started");

    const recognition =
        new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.start();

    recognition.onresult = function (event) {

        let command =
            event.results[0][0].transcript.toLowerCase();

        alert("You said: " + command);

        if (command.includes("light on")) lightOn();
        if (command.includes("light off")) lightOff();

        if (command.includes("fan on")) fanOn();
        if (command.includes("fan off")) fanOff();

        if (command.includes("ac on")) acOn();
        if (command.includes("ac off")) acOff();

    };

    recognition.onerror = function (event) {

        alert("Error: " + event.error);

    };

}

// =============================
// Logout
// =============================
function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";

}

// =============================
// CRUD - Add Device
// =============================
function addDevice() {

    let deviceName = document.getElementById("deviceName").value.trim();
    let deviceStatus = document.getElementById("deviceStatus").value;

    if (deviceName === "") {
        alert("Please enter a device name.");
        return;
    }

    // Add to table
    let table = document.getElementById("deviceTable");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = deviceName;
    row.insertCell(1).innerHTML =
        '<span class="tableStatus">' + deviceStatus + '</span>';

    row.insertCell(2).innerHTML =
        '<button onclick="editDevice(this)">✏️ Edit</button> ' +
        '<button onclick="deleteDevice(this)">🗑️ Delete</button>';

    

    container.appendChild(card);

    document.getElementById("deviceName").value = "";
    document.getElementById("deviceStatus").value = "ON";
}

// =============================
// CRUD - Delete Device
// =============================
function deleteDevice(button) {

    let row = button.parentNode.parentNode;

    row.remove();

}

// =============================
// CRUD - Edit Device
// =============================
function editDevice(button) {

    let row = button.parentNode.parentNode;

    let deviceName = row.cells[0].innerHTML;
    let deviceStatus = row.cells[1].innerHTML;

    let newName = prompt("Edit Device Name", deviceName);

    if (newName !== null && newName.trim() !== "") {

        row.cells[0].innerHTML = newName;

    }

    let newStatus = prompt("Edit Status (ON/OFF)", deviceStatus);

    if (newStatus === "ON" || newStatus === "OFF") {

        row.cells[1].innerHTML = newStatus;

    }

}