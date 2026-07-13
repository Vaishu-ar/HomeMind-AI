function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    // Get all registered users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    let user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {

        // Save current logged-in user
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("✅ Login Successful!");

        window.location.href = "index.html";

    } else {

        document.getElementById("message").innerHTML =
            "❌ Invalid Username or Password";

    }
}