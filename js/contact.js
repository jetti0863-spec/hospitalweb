// =======================================================
// GBIT WEBSITE
// CONTACT PAGE
// contact.js
// =======================================================


// ===========================================
// Validate Name
// Checks whether the name contains only
// alphabets and spaces.
// ===========================================

function validateName()
{

    // Get the value entered in the Name field
    var name = document.getElementById("name").value.trim();

    // Get the error message element
    var error = document.getElementById("nameError");

    // Get the input box
    var box = document.getElementById("name");

    // Check if the field is empty
    if(name == "")
    {

        // Display error message
        error.innerHTML = "Name is required.";

        // Apply red border
        box.className = "invalid";

        return false;

    }

    // Check every character entered
    for(var i=0; i<name.length; i++)
    {

        // Get ASCII value of each character
        var ch = name.charCodeAt(i);

        // Allow only A-Z, a-z and space
        if(
            !((ch>=65 && ch<=90) ||
            (ch>=97 && ch<=122) ||
            ch==32)
        )
        {

            // Display error
            error.innerHTML = "Only alphabets are allowed.";

            // Apply red border
            box.className = "invalid";

            return false;

        }

    }

    // Remove error message
    error.innerHTML = "";

    // Apply green border
    box.className = "valid";

    return true;

}



// ===========================================
// Validate Email
// Checks whether the email format is valid.
// ===========================================

function validateEmail()
{

    // Get Email
    var email = document.getElementById("email").value.trim();

    // Error Label
    var error = document.getElementById("emailError");

    // Email Input Box
    var box = document.getElementById("email");

    // Empty Check
    if(email == "")
    {

        error.innerHTML = "Email is required.";

        box.className = "invalid";

        return false;

    }

    // Check @ and .
    if(email.indexOf("@") == -1 ||
       email.lastIndexOf(".") == -1)
    {

        error.innerHTML = "Enter a valid email.";

        box.className = "invalid";

        return false;

    }

    // Email is Valid
    error.innerHTML = "";

    box.className = "valid";

    return true;

}



// ===========================================
// Validate Phone Number
// Accepts 10-digit numbers or +91 followed
// by a 10-digit number.
// ===========================================

function validatePhone()
{

    // Get Phone Number
    var phone = document.getElementById("phone").value.trim();

    // Error Label
    var error = document.getElementById("phoneError");

    // Phone Input Box
    var box = document.getElementById("phone");

    // Remove +91 if entered
    if(phone.startsWith("+91"))
    {

        phone = phone.substring(3);

    }

    // Empty Check
    if(phone == "")
    {

        error.innerHTML = "Phone Number is required.";

        box.className = "invalid";

        return false;

    }

    // Check every character
    for(var i=0; i<phone.length; i++)
    {

        // Allow only numbers
        if(phone[i]<'0' || phone[i]>'9')
        {

            error.innerHTML = "Only numbers are allowed.";

            box.className = "invalid";

            return false;

        }

    }

    // Check phone length
    if(phone.length != 10)
    {

        error.innerHTML = "Phone Number must contain 10 digits.";

        box.className = "invalid";

        return false;

    }

    // First digit should be between 6 and 9
    if(phone[0]<'6' || phone[0]>'9')
    {

        error.innerHTML = "Phone Number should start with 6, 7, 8 or 9.";

        box.className = "invalid";

        return false;

    }

    // Phone is Valid
    error.innerHTML = "";

    box.className = "valid";

    return true;

}



// ===========================================
// Validate Subject
// Checks whether subject contains at least
// 5 characters.
// ===========================================

function validateSubject()
{

    // Get Subject
    var subject = document.getElementById("subject").value.trim();

    // Error Label
    var error = document.getElementById("subjectError");

    // Subject Input
    var box = document.getElementById("subject");

    // Empty Check
    if(subject == "")
    {

        error.innerHTML = "Subject is required.";

        box.className = "invalid";

        return false;

    }

    // Minimum Length
    if(subject.length < 5)
    {

        error.innerHTML = "Subject should contain at least 5 characters.";

        box.className = "invalid";

        return false;

    }

    // Subject is Valid
    error.innerHTML = "";

    box.className = "valid";

    return true;

}



// ===========================================
// Validate Message
// Checks whether message contains at least
// 20 characters.
// ===========================================

function validateMessage()
{

    // Get Message
    var message = document.getElementById("message").value.trim();

    // Error Label
    var error = document.getElementById("messageError");

    // Text Area
    var box = document.getElementById("message");

    // Empty Check
    if(message == "")
    {

        error.innerHTML = "Message is required.";

        box.className = "invalid";

        return false;

    }

    // Minimum Length
    if(message.length < 20)
    {

        error.innerHTML =
        "Message should contain at least 20 characters.";

        box.className = "invalid";

        return false;

    }

    // Message is Valid
    error.innerHTML = "";

    box.className = "valid";

    return true;

}



// ===========================================
// Submit Contact Form
// Validates all fields and prints the data
// in the browser console.
// ===========================================

function sendMessage()
{

    // Validate Name
    var name = validateName();

    // Validate Email
    var email = validateEmail();

    // Validate Phone
    var phone = validatePhone();

    // Validate Subject
    var subject = validateSubject();

    // Validate Message
    var message = validateMessage();

    // Stop form if any validation fails
    if(
        !name ||
        !email ||
        !phone ||
        !subject ||
        !message
    )
    {

        return false;

    }

    // Print submitted data in Console
    console.log("===== CONTACT DETAILS =====");

    console.log("Name : " +
    document.getElementById("name").value);

    console.log("Email : " +
    document.getElementById("email").value);

    console.log("Phone : " +
    document.getElementById("phone").value);

    console.log("Subject : " +
    document.getElementById("subject").value);

    console.log("Message : " +
    document.getElementById("message").value);

    // Show Success Message
    alert("Message Sent Successfully.");

    // Clear Form
    document.querySelector("form").reset();

    return false;

}