// IT3240 - Week 07
// Completed JavaScript for Volunteer Management functions.

// Define the findById() function to find an HTML element by id
const findById = function (id) { return document.getElementById(id); };

// Declare an empty array for the names
let volunteerArray = [];


/**
 * Displays the current content of volunteerArray in the textarea
 * as a numbered list (Last Name, First Name).
 */
const displayVolunteers = function () {
    // Use findById() to get the HTML element for the display of the volunteer list
    const listArea = findById("volunteer-list-area");

    // Initialize the output string
    let output = "";

    /* Loop over the array of names and print them out as a numbered list in this format
        1. Jones, Anne
        2. Smith, Jim
       The index (i) starts at 0, so we add 1 for the list number. */
    for (let i = 0; i < volunteerArray.length; i++) {
        // Build the numbered line: (Index + 1). Last, First\n
        output += (i + 1) + ". " + volunteerArray[i] + "\n";
    }

    // Update the textarea with the new list
    listArea.value = output;

    // Debugging output
    console.log("DEBUG: Volunteers list updated. Total count: " + volunteerArray.length);
};

/**
 * Gets the name from input fields, formats it (Last, First),
 * adds it to the array, updates the display, and clears inputs.
 * (This function was largely complete)
 */
const addVolunteer = function () {
    // get the data from the form and format: Last, First
    const firstName = findById("first-name-input").value.trim();
    const lastName = findById("last-name-input").value.trim();

    if (firstName === "" || lastName === "") {
         console.warn("DEBUG: Attempted to add empty name.");
         return; // Prevent adding empty names
    }

    let volunteerString = lastName + ", " + firstName;

    // store the data in an array
    volunteerArray.push(volunteerString);
    console.log("DEBUG: Added new volunteer:", volunteerString);

    // display the volunteers and clear the add form
    displayVolunteers();

    // get the add form ready for next entry by clearing input fields
    findById("first-name-input").value = "";
    findById("last-name-input").value = "";
    findById("first-name-input").focus();
};


/**
 * Gets the name from input fields, finds it in the array using a loop,
 * removes it with splice(), and updates the display.
 */
const deleteVolunteer = function () {
    // get the name data from the form fields (hint: use the same format as from the add function).
    const firstName = findById("first-name-input").value.trim();
    const lastName = findById("last-name-input").value.trim();
    const nameToDelete = lastName + ", " + firstName;

    let deleteIndex = -1;

    // remove the string from the array (hint, loop through the entire list, compare the string with the item in the array).
    for (let i = 0; i < volunteerArray.length; i++) {
        // Compare the search string with the item in the array
        if (volunteerArray[i] === nameToDelete) {
            deleteIndex = i; // Store the index of the matching name
            break; // Stop the loop once the first match is found
        }
    }

    // Use the splice() function to remove the item from the array at the found index
    if (deleteIndex > -1) {
        volunteerArray.splice(deleteIndex, 1);
        console.log("DEBUG: Successfully deleted volunteer:", nameToDelete);
    } else {
        console.warn("DEBUG: Volunteer not found for deletion:", nameToDelete);
    }

    // display the volunteers and clear the add form
    displayVolunteers();

    // get the delete form ready for next entry
    findById("first-name-input").value = "";
    findById("last-name-input").value = "";
    findById("first-name-input").focus();
};

/**
 * Clears all data from the volunteer array and updates the display.
 */
const clearVolunteers = function () {
    // delete the data from the arrays by setting the array length to 0
    volunteerArray.length = 0;
    console.log("DEBUG: All volunteers cleared from the array.");

    // redisplay the empty list
    displayVolunteers();

    // set focus on the first_name input
    findById("first-name-input").focus();
};

/**
 * Sorts the volunteer array alphabetically and updates the display.
 */
const sortVolunteers = function () {
    // sort the volunteers by name (using the native sort, which sorts alphabetically)
    volunteerArray.sort();
    console.log("DEBUG: Volunteers array sorted alphabetically.");

    // display the sorted names
    displayVolunteers();

};

// When the page is fully loaded, the buttons will be mapped to the JavaScript functions
window.onload = function () {
    // Note that only name of function to be called is used - no parentheses after func name
    findById("add-button").onclick = addVolunteer;
    findById("delete-button").onclick = deleteVolunteer;
    findById("clear-button").onclick = clearVolunteers;
    findById("sort-button").onclick = sortVolunteers;
    findById("first-name-input").focus();
    console.log("DEBUG: Event listeners attached and form initialized.");
};
