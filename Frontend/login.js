async function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        document.getElementById("message").innerHTML =
            "⚠️ Please enter Username and Password";
        return;
    }

    try {

        const response = await fetch("https://homemind-ai.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {

            localStorage.setItem("currentUser", JSON.stringify(result));

            alert("✅ Login Successful!");

            window.location.href = "dashboard.html";
        } else {

            document.getElementById("message").innerHTML = result.message;

        }

    } catch (error) {

        console.log(error);

        document.getElementById("message").innerHTML =
            "❌ Cannot connect to Backend";

    }

}