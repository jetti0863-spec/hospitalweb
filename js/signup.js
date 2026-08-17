/*
   signup.js
   Every line is explained with comments
 */


/*
  Function: showPassword()
  Purpose : Show/Hide password when checkbox is clicked
*/
function showPassword(){

    // Get the password textbox using its id
    var p = document.getElementById('pwd');

    // If input type is password change to text,
    // otherwise change it back to password
    p.type = p.type == 'password' ? 'text' : 'password';
}


/*
  Function: validateFirstName()
  Purpose : Validate First Name
*/
function validateFirstName(){

    // Get first name value and remove spaces from beginning/end
    var v = fname.value.trim(),

        // Store error label
        e = fnameError,

        // Store textbox reference
        b = fname;

    // Check if textbox is empty
    if(v == ''){

        // Display error message
        e.innerHTML = 'First Name is required.';

        // Apply invalid CSS class
        b.className = 'invalid';

        // Validation failed
        return false;
    }

    // Loop through every character
    for(var i = 0; i < v.length; i++){

        // Get ASCII value of current character
        var c = v.charCodeAt(i);

        // Allow only A-Z or a-z
        if(!((c >= 65 && c <= 90) || (c >= 97 && c <= 122))){

            // Show error
            e.innerHTML = 'Only alphabets are allowed.';

            // Apply invalid style
            b.className = 'invalid';

            // Stop validation
            return false;
        }
    }

    // Clear error message
    e.innerHTML = '';

    // Apply valid style
    b.className = 'valid';

    // Validation successful
    return true;
}


/*
  Function: validateLastName()
  Purpose : Validate Last Name
*/
function validateLastName(){

    // Get last name value
    var v = lname.value.trim(),

        // Error label
        e = lnameError,

        // Textbox
        b = lname;

    // Check empty value
    if(v == ''){

        // Show error
        e.innerHTML = 'Last Name is required.';

        // Invalid style
        b.className = 'invalid';

        // Validation failed
        return false;
    }

    // Check each character
    for(var i = 0; i < v.length; i++){

        // ASCII value
        var c = v.charCodeAt(i);

        // Allow alphabets only
        if(!((c >= 65 && c <= 90) || (c >= 97 && c <= 122))){

            // Error message
            e.innerHTML = 'Only alphabets are allowed.';

            // Invalid style
            b.className = 'invalid';

            // Stop
            return false;
        }
    }

    // Remove error
    e.innerHTML = '';

    // Valid style
    b.className = 'valid';

    // Success
    return true;
}


/*
  Function: validateEmail()
  Purpose : Validate Email
*/
function validateEmail(){

    // Read email value
    var v = email.value.trim(),

        // Error label
        e = emailError,

        // Textbox
        b = email;

    // Check email validity
    if(
        v == '' ||                      // Empty
        v.indexOf('@') == -1 ||         // No @
        v.lastIndexOf('.') == -1 ||     // No .
        v.indexOf('@') > v.lastIndexOf('.') // Dot before @
    ){

        // Show error
        e.innerHTML = 'Enter a valid email.';

        // Invalid style
        b.className = 'invalid';

        // Failed
        return false;
    }

    // Remove error
    e.innerHTML = '';

    // Valid style
    b.className = 'valid';

    // Success
    return true;
}


/*
  Function: validatePassword()
  Purpose : Check password rules
*/
function validatePassword(){

    // Read password
    var p = pwd.value,

        // Uppercase flag
        U = 0,

        // Lowercase flag
        L = 0,

        // Number flag
        N = 0,

        // Special character flag
        S = 0;

    // Check every character
    for(var i = 0; i < p.length; i++){

        // Current character
        var c = p[i];

        // Uppercase
        if(c >= 'A' && c <= 'Z')
            U = 1;

        // Lowercase
        else if(c >= 'a' && c <= 'z')
            L = 1;

        // Number
        else if(c >= '0' && c <= '9')
            N = 1;

        // Otherwise special character
        else
            S = 1;
    }

    // Update rule 1
    rule1.innerHTML =
        (p.length >= 8 ? '' : '*') +
        ' Minimum 8 Characters';

    // Update rule 2
    rule2.innerHTML =
        (U ? '' : '*') +
        ' One Uppercase Letter';

    // Update rule 3
    rule3.innerHTML =
        (L ? '' : '*') +
        ' One Lowercase Letter';

    // Update rule 4
    rule4.innerHTML =
        (N ? '' : '*') +
        ' One Number';

    // Update rule 5
    rule5.innerHTML =
        (S ? '' : '*') +
        ' One Special Character';

    // Check whether all rules passed
    if(
        p.length >= 8 &&
        U &&
        L &&
        N &&
        S
    ){

        // Clear error
        pwdError.innerHTML = '';

        // Valid style
        pwd.className = 'valid';

        // Success
        return true;
    }

    // Password failed
    pwdError.innerHTML =
        'Password does not meet all requirements.';

    // Invalid style
    pwd.className = 'invalid';

    // Failed
    return false;
}


/*
  Function: validatePhone()
  Purpose : Validate Indian mobile number
*/
function validatePhone(){

    // Read phone number
    var v = phone.value.trim();

    // Remove +91 if user entered it
    if(v.startsWith('+91'))

        // Remove first 3 characters (+91)
        v = v.substring(3);

    // Validation
    if(
        v == '' ||                 // Empty
        !/^[0-9]{10}$/.test(v) ||  // Not exactly 10 digits
        v[0] < '6'                 // First digit should be 6-9
    ){

        // Error message
        phoneError.innerHTML =
            'Enter valid phone number.';

        // Invalid style
        phone.className = 'invalid';

        // Failed
        return false;
    }

    // Remove error
    phoneError.innerHTML = '';

    // Valid style
    phone.className = 'valid';

    // Success
    return true;
}


/*
  Function: validateDOB()
  Purpose : Check date after 01-01-1995
*/
function validateDOB(){

    // Check empty or before 1995
    if(
        dob.value == '' ||
        new Date(dob.value) <
        new Date('1995-01-01')
    ){

        // Show error
        dobError.innerHTML =
            'Date should be after 01-01-1995.';

        // Invalid style
        dob.className = 'invalid';

        // Failed
        return false;
    }

    // Clear error
    dobError.innerHTML = '';

    // Valid style
    dob.className = 'valid';

    // Success
    return true;
}
/*
  Function: register()
  Purpose : Validate form and call Signup API
*/
// ==========================================
// Register
// ==========================================

async function register(event)
{
    // Prevent Form Submission
    event.preventDefault();

    // Validate All Fields
    if(
        !(
            validateFirstName() &&
            validateLastName() &&
            validateEmail() &&
            validatePassword() &&
            validatePhone() &&
            validateDOB()
        )
    )
    {
        return false;
    }

    // Call Signup API
    await signup();

    return false;
}


/*
  Function: signup()
  Purpose : Send user data to ASP.NET Core Web API
*/
// ==========================================
// Signup API
// ==========================================

async function signup()
{
    // Create User Object
    var user =
    {
        firstName: document.getElementById("fname").value.trim(),
        lastName: document.getElementById("lname").value.trim(),
        email: document.getElementById("email").value.trim(),
        phoneNumber: document.getElementById("phone").value.trim(),
        password: document.getElementById("pwd").value.trim()
    };

    console.log("Signup User :", user);

    try
    {
        // Call Signup API
        var response = await fetch("https://localhost:7245/api/Auth/signup",
        {
            method: "POST",

            headers:
            {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)
        });

        console.log("Signup Status :", response.status);

        if(response.ok)
        {
            // Read User Returned From API
            var newUser = await response.json();

            console.log(newUser);

            alert("Registration Successful");

            // Redirect To Login Page
            window.location.replace("signin.html");
        }
        else
        {
            var message = await response.text();

            alert(message);
        }
    }
    catch(error)
    {
        console.error(error);

        alert("Unable to connect to server.");
    }
}