// Opens the Add Item popup.
function openModal()
{

    // Makes the modal visible.
    document.getElementById("itemModal").style.display = "flex";

}



// Closes the Add Item popup.
function closeModal()
{

    // Hides the modal.
    document.getElementById("itemModal").style.display = "none";

}

// Calculates GST and Grand Total based on the Selling Price.
function calculateGST()
{

    // Gets the Selling Price entered by the user.
    var price =
    Number(document.getElementById("price").value);

    // Checks if the price is empty or invalid.
    if(price <= 0)
    {

        // Displays GST as ₹0.00.
        document.getElementById("gstAmount").innerHTML =
        "GST (18%) : ₹0.00";

        // Displays Grand Total as ₹0.00.
        document.getElementById("grandTotal").innerHTML =
        "Grand Total : ₹0.00";

        // Stops further execution.
        return;

    }

    // Calculates 18% GST.
    var gst = price * 0.18;

    // Calculates Grand Total.
    var total = price + gst;

    // Displays the GST amount.
    document.getElementById("gstAmount").innerHTML =
    "GST (18%) : ₹" + gst.toFixed(2);

    // Displays the Grand Total.
    document.getElementById("grandTotal").innerHTML =
    "Grand Total : ₹" + total.toFixed(2);

}


// Adds a new item after validation.
async function addItem()
{

    // Gets the selected Item Type.
    var itemType =
    document.querySelector('input[name="itemType"]:checked').value;

    // Gets the Description.
    var description =
    document.getElementById("description").value.trim();

    // Gets the Configuration.
    var configuration =
    document.getElementById("configuration").value.trim();

    // Gets the Supplier.
    var supplier =
    document.getElementById("supplier").value;

    // Gets the Cost.
    var cost =
    Number(document.getElementById("cost").value);

    // Gets the Selling Price.
    var sellingPrice =
    Number(document.getElementById("price").value);

    // Validation
    if(
        !validateDescription() ||
        !validateConfiguration() ||
        !validateSupplier() ||
        !validateCost() ||
        !validatePrice()
    )
    {
        return;
    }

    // Create Item Object
    var item =
    {
        itemType:itemType,
        description:description,
        configuration:configuration,
        supplier:supplier,
        cost:cost,
        sellingPrice:sellingPrice
    };

    try
    {

        var response =
        await fetch("https://localhost:7245/api/Item",
        {
            method:"POST",

            headers:
            {
                "Content-Type":"application/json"
            },

            body:JSON.stringify(item)
        });

        if(response.ok)
        {

            alert("Item Added Successfully");

            closeModal();

            loadItems();

        }

        else
        {

            alert("Unable to Add Item");

        }

    }

    catch(error)
    {

        console.log(error);

    }

}
// Loads all items from ASP.NET API.
async function loadItems()
{

    try
    {

        var response =
        await fetch("https://localhost:7245/api/Item");

        var items =
        await response.json();

        var body =
        document.getElementById("itemBody");

        body.innerHTML = "";

        items.forEach(function(item)
        {

            body.innerHTML +=

            "<tr>" +

            "<td>" + item.itemType + "</td>" +

            "<td>" + item.description + "</td>" +

            "<td>" + item.configuration + "</td>" +

            "<td>" + item.supplier + "</td>" +

            "<td>₹" + item.cost + "</td>" +

            "<td>₹" + item.sellingPrice + "</td>" +

            "<td><button onclick='deleteItem(" + item.id + ")'>Delete</button></td>" +

            "</tr>";

        });

    }

    catch(error)
    {

        console.log(error);

    }

}

// Deletes Item From Backend.
async function deleteItem(id)
{

    if(!confirm("Delete this item?"))
    {
        return;
    }

    try
    {

        var response =
        await fetch("https://localhost:7245/api/Item/" + id,
        {
            method:"DELETE"
        });

        if(response.ok)
        {

            loadItems();

        }

        else
        {

            alert("Unable to Delete Item");

        }

    }

    catch(error)
    {

        console.log(error);

    }

}
// Validates the Configuration field.
function validateConfiguration()
{

    // Gets the Configuration value.
    var value =
    document.getElementById("configuration").value.trim();

    // Gets the Configuration error element.
    var error =
    document.getElementById("configurationError");

    // Gets the Configuration input box.
    var box =
    document.getElementById("configuration");

    // Checks whether the Configuration is empty.
    if(value=="")
    {

        // Displays an error message.
        error.innerHTML="Configuration is required.";

        // Applies invalid styling.
        box.className="invalid";

        return false;

    }

    // Clears the error message.
    error.innerHTML="";

    // Applies valid styling.
    box.className="valid";

    return true;

}

// Validates the Supplier selection.
function validateSupplier()
{

    // Gets the selected Supplier.
    var value =
    document.getElementById("supplier").value;

    // Gets the Supplier error element.
    var error =
    document.getElementById("supplierError");

    // Gets the Supplier dropdown.
    var box =
    document.getElementById("supplier");

    // Checks whether a Supplier is selected.
    if(value=="")
    {

        // Displays an error message.
        error.innerHTML="Select Supplier.";

        // Applies invalid styling.
        box.className="invalid";

        return false;

    }

    // Clears the error message.
    error.innerHTML="";

    // Applies valid styling.
    box.className="valid";

    return true;

}

// Validates the Cost field.
function validateCost()
{

    // Gets the Cost value.
    var value =
    Number(document.getElementById("cost").value);

    // Gets the Cost error element.
    var error =
    document.getElementById("costError");

    // Gets the Cost input box.
    var box =
    document.getElementById("cost");

    // Checks whether the Cost is valid.
    if(value<=0)
    {

        // Displays an error message.
        error.innerHTML="Enter valid cost.";

        // Applies invalid styling.
        box.className="invalid";

        return false;

    }

    // Clears the error message.
    error.innerHTML="";

    // Applies valid styling.
    box.className="valid";

    return true;

}

// Validates the Selling Price.
function validatePrice()
{

    // Gets the Cost value.
    var cost =
    Number(document.getElementById("cost").value);

    // Gets the Selling Price value.
    var price =
    Number(document.getElementById("price").value);

    // Gets the Selling Price error element.
    var error =
    document.getElementById("priceError");

    // Gets the Selling Price input box.
    var box =
    document.getElementById("price");

    // Checks whether the Selling Price is entered.
    if(price<=0)
    {

        // Displays an error message.
        error.innerHTML="Enter Selling Price.";

        // Applies invalid styling.
        box.className="invalid";

        return false;

    }

    // Checks whether Selling Price is greater than Cost.
    if(price<=cost)
    {

        // Displays an error message.
        error.innerHTML="Selling Price should be greater than Cost.";

        // Applies invalid styling.
        box.className="invalid";

        return false;

    }

    // Clears the error message.
    error.innerHTML="";

    // Applies valid styling.
    box.className="valid";

    return true;

}
// As soon as the webpage finishes loading up completely in the browser:
window.onload = function()
{
    // Call the function to fetch and show the items.
    loadItems();
};


// Duplicate check block logic: If the server response was successful:
if(response.ok)
{
    // Show a success message popup.
    alert("Item Added Successfully");

    // Fetch the updated list of items to show on the screen.
    loadItems();

    // Reset the description input field to empty.
    document.getElementById("description").value = "";
    // Reset the configuration input field to empty.
    document.getElementById("configuration").value = "";
    // Reset the supplier dropdown selection back to the first item.
    document.getElementById("supplier").selectedIndex = 0;
    // Reset the cost input field to empty.
    document.getElementById("cost").value = "";
    // Reset the price input field to empty.
    document.getElementById("price").value = "";

    // Run the tax calculation function to reset the visual totals.
    calculateGST();

    // Close the popup window.
    closeModal();
}