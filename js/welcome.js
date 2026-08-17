// ==========================================
// AVINASH NURSING HOME & HOSPITAL
// Medicine Purchase JavaScript
// ==========================================


// ==========================================
// Check User Login
// ==========================================

function checkUser()
{
    // Get Login Status
    var login = sessionStorage.getItem("login");

    // If User Is Not Logged In
    if(login != "yes")
    {
        window.location.href = "signin.html";
        return;
    }

    // Get Logged In User
    var userData = sessionStorage.getItem("user");

    // If User Data Not Found
    if(userData == null)
    {
        window.location.href = "signin.html";
        return;
    }

    // Convert JSON String To Object
    var user = JSON.parse(userData);

    // Display Logged In User
    document.getElementById("userName").innerHTML =
        "Welcome " + user.firstName;
}


// ==========================================
// Load Medicines
// ==========================================

function loadMedicines()
{
    // Get Medicines From Session Storage
    var medicines =
        JSON.parse(sessionStorage.getItem("medicines")) || [];


    // Get Table Body
    var body =
        document.getElementById("medicineBody");


    // If Table Doesn't Exist
    if(body == null)
    {
        return;
    }


    // Clear Existing Rows
    body.innerHTML = "";


    // Display Medicines
    for(var i = 0; i < medicines.length; i++)
    {
        var row =
            document.createElement("tr");


        row.innerHTML =

            "<td>" +
            medicines[i].medicineType +
            "</td>" +

            "<td>" +
            medicines[i].medicineName +
            "</td>" +

            "<td>" +
            medicines[i].batchNumber +
            "</td>" +

            "<td>" +
            medicines[i].expiryDate +
            "</td>" +

            "<td>" +
            medicines[i].quantity +
            "</td>" +

            "<td>" +
            medicines[i].supplier +
            "</td>" +

            "<td>₹" +
            Number(medicines[i].cost).toFixed(2) +
            "</td>" +

            "<td>₹" +
            Number(medicines[i].price).toFixed(2) +
            "</td>" +

            "<td>₹" +
            Number(medicines[i].totalAmount).toFixed(2) +
            "</td>" +

            "<td>" +

            "<button " +
            "type='button' " +
            "onclick='deleteMedicine(" +
            i +
            ")'>" +

            "Delete" +

            "</button>" +

            "</td>";


        body.appendChild(row);
    }
}


// ==========================================
// Add Medicine
// ==========================================

function addMedicine()
{
    // Get Medicine Type
    var medicineTypeElement =
        document.querySelector(
            'input[name="medicineType"]:checked'
        );


    // Get Input Values
    var medicineName =
        document.getElementById("medicineName").value.trim();


    var medicineDetails =
        document.getElementById("medicineDetails").value.trim();


    var batchNumber =
        document.getElementById("batchNumber").value.trim();


    var expiryDate =
        document.getElementById("expiryDate").value;


    var quantity =
        Number(document.getElementById("quantity").value);


    var supplier =
        document.getElementById("supplier").value;


    var cost =
        Number(document.getElementById("cost").value);


    var price =
        Number(document.getElementById("price").value);


    // Validate Medicine Type
    if(medicineTypeElement == null)
    {
        alert("Please select medicine type.");
        return;
    }


    // Validate Medicine Name
    if(medicineName == "")
    {
        alert("Please enter medicine name.");
        return;
    }


    // Validate Medicine Details
    if(medicineDetails == "")
    {
        alert("Please enter medicine details.");
        return;
    }


    // Validate Batch Number
    if(batchNumber == "")
    {
        alert("Please enter batch number.");
        return;
    }


    // Validate Expiry Date
    if(expiryDate == "")
    {
        alert("Please select expiry date.");
        return;
    }


    // Validate Quantity
    if(quantity <= 0)
    {
        alert("Quantity must be greater than 0.");
        return;
    }


    // Validate Supplier
    if(supplier == "")
    {
        alert("Please select supplier.");
        return;
    }


    // Validate Purchase Cost
    if(cost <= 0)
    {
        alert("Purchase cost must be greater than 0.");
        return;
    }


    // Validate Selling Price
    if(price <= 0)
    {
        alert("Selling price must be greater than 0.");
        return;
    }


    // Calculate Total Purchase Amount
    var totalPurchase =
        quantity * cost;


    // Calculate Total Selling Amount
    var totalSelling =
        quantity * price;


    // Create Medicine Object
    var medicine =
    {
        medicineType:
            medicineTypeElement.value,

        medicineName:
            medicineName,

        medicineDetails:
            medicineDetails,

        batchNumber:
            batchNumber,

        expiryDate:
            expiryDate,

        quantity:
            quantity,

        supplier:
            supplier,

        cost:
            cost,

        price:
            price,

        totalAmount:
            totalSelling,

        totalPurchase:
            totalPurchase
    };


    // Get Existing Medicines
    var medicines =
        JSON.parse(
            sessionStorage.getItem("medicines")
        ) || [];


    // Add New Medicine
    medicines.push(medicine);


    // Save Medicines
    sessionStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );


    // Refresh Table
    loadMedicines();


    // Close Modal
    closeModal();


    // Clear Form
    clearMedicineForm();
}


// ==========================================
// Delete Medicine
// ==========================================

function deleteMedicine(index)
{
    // Get Medicines
    var medicines =
        JSON.parse(
            sessionStorage.getItem("medicines")
        ) || [];


    // Confirm Before Delete
    var confirmDelete =
        confirm(
            "Are you sure you want to delete this medicine?"
        );


    if(confirmDelete == false)
    {
        return;
    }


    // Remove Medicine
    medicines.splice(index, 1);


    // Save Updated Medicines
    sessionStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );


    // Reload Table
    loadMedicines();
}


// ==========================================
// Calculate Total
// ==========================================

function calculateTotal()
{
    // Get Quantity
    var quantity =
        Number(
            document.getElementById("quantity").value
        );


    // Get Purchase Cost
    var cost =
        Number(
            document.getElementById("cost").value
        );


    // Get Selling Price
    var price =
        Number(
            document.getElementById("price").value
        );


    // Calculate Purchase Total
    var purchaseTotal =
        quantity * cost;


    // Calculate Selling Total
    var sellingTotal =
        quantity * price;


    // Display Purchase Total
    document.getElementById(
        "purchaseTotal"
    ).innerHTML =

        "Total Purchase Amount : ₹" +
        purchaseTotal.toFixed(2);


    // Display Selling Total
    document.getElementById(
        "sellingTotal"
    ).innerHTML =

        "Total Selling Amount : ₹" +
        sellingTotal.toFixed(2);
}


// ==========================================
// Validate Medicine Name
// ==========================================

function validateMedicineName()
{
    var value =
        document.getElementById(
            "medicineName"
        ).value.trim();


    var error =
        document.getElementById(
            "medicineNameError"
        );


    if(value == "")
    {
        error.innerHTML =
            "Medicine name is required.";

        return false;
    }


    error.innerHTML = "";

    return true;
}


// ==========================================
// Validate Medicine Details
// ==========================================

function validateMedicineDetails()
{
    var value =
        document.getElementById(
            "medicineDetails"
        ).value.trim();


    var error =
        document.getElementById(
            "medicineDetailsError"
        );


    if(value == "")
    {
        error.innerHTML =
            "Medicine details are required.";

        return false;
    }


    error.innerHTML = "";

    return true;
}


// ==========================================
// Validate Batch Number
// ==========================================

function validateBatchNumber()
{
    var value =
        document.getElementById(
            "batchNumber"
        ).value.trim();


    var error =
        document.getElementById(
            "batchNumberError"
        );


    if(value == "")
    {
        error.innerHTML =
            "Batch number is required.";

        return false;
    }


    error.innerHTML = "";

    return true;
}


// ==========================================
// Validate Expiry Date
// ==========================================

function validateExpiryDate()
{
    var value =
        document.getElementById(
            "expiryDate"
        ).value;


    var error =
        document.getElementById(
            "expiryDateError"
        );


    if(value == "")
    {
        error.innerHTML =
            "Expiry date is required.";

        return false;
    }


    var selectedDate =
        new Date(value);


    var today =
        new Date();


    today.setHours(0, 0, 0, 0);


    if(selectedDate <= today)
    {
        error.innerHTML =
            "Medicine must have a future expiry date.";

        return false;
    }


    error.innerHTML = "";

    return true;
}


// ==========================================
// Validate Supplier
// ==========================================

function validateSupplier()
{
    var value =
        document.getElementById(
            "supplier"
        ).value;


    var error =
        document.getElementById(
            "supplierError"
        );


    if(value == "")
    {
        error.innerHTML =
            "Please select a supplier.";

        return false;
    }


    error.innerHTML = "";

    return true;
}


// ==========================================
// Clear Medicine Form
// ==========================================

function clearMedicineForm()
{
    document.getElementById(
        "medicineName"
    ).value = "";


    document.getElementById(
        "medicineDetails"
    ).value = "";


    document.getElementById(
        "batchNumber"
    ).value = "";


    document.getElementById(
        "expiryDate"
    ).value = "";


    document.getElementById(
        "quantity"
    ).value = "";


    document.getElementById(
        "supplier"
    ).value = "";


    document.getElementById(
        "cost"
    ).value = "";


    document.getElementById(
        "price"
    ).value = "";


    document.getElementById(
        "purchaseTotal"
    ).innerHTML =
        "Total Purchase Amount : ₹0.00";


    document.getElementById(
        "sellingTotal"
    ).innerHTML =
        "Total Selling Amount : ₹0.00";


    document.getElementById(
        "medicineNameError"
    ).innerHTML = "";


    document.getElementById(
        "medicineDetailsError"
    ).innerHTML = "";


    document.getElementById(
        "batchNumberError"
    ).innerHTML = "";


    document.getElementById(
        "expiryDateError"
    ).innerHTML = "";


    document.getElementById(
        "supplierError"
    ).innerHTML = "";
}


// ==========================================
// Open Modal
// ==========================================

function openModal()
{
    document.getElementById(
        "itemModal"
    ).style.display = "flex";
}


// ==========================================
// Close Modal
// ==========================================

function closeModal()
{
    document.getElementById(
        "itemModal"
    ).style.display = "none";
}


// ==========================================
// Sign Out
// ==========================================

function signOut()
{
    sessionStorage.clear();

    window.location.href =
        "signin.html";
}


// ==========================================
// Page Load
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function()
    {
        checkUser();

        loadMedicines();
    }
);