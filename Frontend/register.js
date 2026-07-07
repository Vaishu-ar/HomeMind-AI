function register() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (name === "" || email === "" || username === "" || password === "" || confirmPassword === "") {
        document.getElementById("message").innerHTML = "⚠️ Please fill all fields.";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("message").innerHTML = "❌ Passwords do not match.";
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate username
    let userExists = users.find(user => user.username === username);

    if (userExists) {
        document.getElementById("message").innerHTML = "❌ Username already exists.";
        return;
    }

    // Add new user
    users.push({
        name: name,
        email: email,
        username: username,
        password: password
    });

    // Save users
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registration Successful!");

    window.location.href = "login.html";
}