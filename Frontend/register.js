async function register() {

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

    try {

        console.log("Register API Calling...");

        const response = await fetch("https://homemind-ai.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                username: username,
                password: password
            })
        });

        console.log("Status:", response.status);

        const result = await response.json();

        console.log(result);

        if (result.success) {

            alert("✅ Registration Successful!");

            window.location.href = "login.html";

        } else {

            document.getElementById("message").innerHTML = result.message;

        }

    } catch (error) {

        console.error(error);

        document.getElementById("message").innerHTML =
            "❌ Cannot connect to Backend";

    }

}