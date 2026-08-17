// =======================================================
// GBIT WEBSITE
// LOAD HEADER & FOOTER
// =======================================================


// Load Header or Footer
function load(id, file)
{
    fetch(file)
    .then(function(response)
    {
        return response.text();
    })
    .then(function(data)
    {
        document.getElementById(id).innerHTML = data;

        // Update Header After Loading
        if(id == "header")
        {
            updateHeader();
        }
    });
}


// =======================================================
// Load Components
// =======================================================
window.onload = function ()
{
    // Load Header
    load("header", "components/header.html");

    // Load Footer
    load("footer", "components/footer.html");

    // Check Login After 200ms
    setTimeout(function ()
    {
        checkLogin();
    }, 200);
}



// =======================================================
// Update Header
// =======================================================

function updateHeader()
{

    // Get Login Status
    var login = sessionStorage.getItem("login");

    // Get User Name
    var name = sessionStorage.getItem("fname");

    // If User Logged In
    if(login == "yes")
    {

        // Hide Sign In
        document.getElementById("signinLink").style.display = "none";

        // Hide Create Account
        document.getElementById("signupLink").style.display = "none";

        // Show Welcome
        document.getElementById("welcomeUser").style.display = "inline";

        // Display User Name
        document.getElementById("welcomeUser").innerHTML =
        "Welcome " + name;

        // Show Logout
        document.getElementById("logoutLink").style.display = "inline";

    }

}




// =======================================================
// Sign Out
// =======================================================

function signOut()
{

    // Remove Session
    sessionStorage.clear();

    // Open Login Page
    window.location.href = "signin.html";

}




// =======================================================
// Protect Pages
// =======================================================


// ===========================================
// Check Login
// ===========================================

function checkLogin()
{

    // Current Page
    var page = window.location.pathname.split("/").pop();

    // Protect Only Welcome Page
    if(page == "welcome.html")
    {

        if(sessionStorage.getItem("login") != "yes")
        {

            window.location.href = "signin.html";

        }

    }

}