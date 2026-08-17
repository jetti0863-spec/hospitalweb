// ==========================================
// GBIT WEBSITE
// Sign In JavaScript
// ==========================================

// ==========================================
// Show / Hide Password
// ==========================================

function showPassword()
{
    var pwd = document.getElementById("pwd");

    if(pwd.type === "password")
    {
        pwd.type = "text";
    }
    else
    {
        pwd.type = "password";
    }
}

// ==========================================
// Validate Email
// ==========================================

function validateLoginEmail()
{
    var email = document.getElementById("email").value.trim();

    var error = document.getElementById("emailError");

    var box = document.getElementById("email");

    if(email === "")
    {
        error.innerHTML = "Email is required.";
        box.className = "invalid";
        return false;
    }

    if(email.indexOf("@") === -1 ||
       email.lastIndexOf(".") === -1)
    {
        error.innerHTML = "Enter a valid email.";
        box.className = "invalid";
        return false;
    }

    error.innerHTML = "";
    box.className = "valid";

    return true;
}

// ==========================================
// Validate Password
// ==========================================

function validateLoginPassword()
{
    var pwd = document.getElementById("pwd").value.trim();

    var error = document.getElementById("pwdError");

    var box = document.getElementById("pwd");

    if(pwd === "")
    {
        error.innerHTML = "Password is required.";
        box.className = "invalid";
        return false;
    }

    if(pwd.length < 8)
    {
        error.innerHTML = "Minimum 8 characters required.";
        box.className = "invalid";
        return false;
    }

    error.innerHTML = "";
    box.className = "valid";

    return true;
}
// ==========================================
// Login
// ==========================================

async function login(event)
{
    // Prevent form submission
    event.preventDefault();

    // Validate Email
    if(!validateLoginEmail())
    {
        return false;
    }

    // Validate Password
    if(!validateLoginPassword())
    {
        return false;
    }

    // Create Login Object
    var loginUser =
    {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("pwd").value.trim()
    };

    console.log("Login User :", loginUser);

    try
    {
        // Call Login API
        var response = await fetch("https://localhost:7245/api/Auth/login",
        {
            method: "POST",

            headers:
            {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginUser)
        });

        console.log("Response Status :", response.status);

        if(response.ok)
        {
            // Read User
            var user = await response.json();

            console.log("Logged User :", user);

            // Store Login Details
            sessionStorage.setItem("login", "yes");
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("fname", user.firstName);
            sessionStorage.setItem("lname", user.lastName);
            sessionStorage.setItem("email", user.email);

            console.log("Session Created");

            // Success Message
            alert("Login Successful");

            // Redirect
            window.location.replace("welcome.html");
        }
        else
        {
            var message = await response.text();

            document.getElementById("pwdError").innerHTML = message;
            document.getElementById("pwd").className = "invalid";
        }
    }
    catch(error)
    {
        console.error(error);

        alert("Unable to connect to server.");
    }

    return false;
}
