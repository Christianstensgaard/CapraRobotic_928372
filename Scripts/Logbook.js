fetch('/Files/errormsg.json')
.then((response) => response.json())
.then((errList) => {
    errList.forEach(errObject => {
        createErrorElement(errObject.$id, errObject.description, errObject.level, errObject.hardware_id, errObject.message, errObject.name, errObject.values);
    });
});

function createErrorElement(id, description, level, hardwareid, message, internalname, values) {

// Create the container div
let containerDiv = document.createElement("div");
containerDiv.className = "container mx-auto px-4 mt-6 mb-4";

// Create the inner div
let innerDiv = document.createElement("div");
innerDiv.className = "max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden";

// Create the header div
let headerDiv = document.createElement("div");
headerDiv.className = "text-white px-6 py-2 " + (level.description === 'Critical' ? "bg-red-500" : "bg-yellow-500");

// Create the header h2 element
let headerH2 = document.createElement("h2");
headerH2.className = "text-2xl font-bold";
headerH2.textContent = level.description;

// Append the header h2 element to the header div
headerDiv.appendChild(headerH2);

// Create the content div
let contentDiv = document.createElement("div");
contentDiv.className = "px-6 py-4";

// Create an array of label-text pairs
let labels = [
    { label: "ID", text: id, visible: false },
    { label: "Description", text: description, visible: true },
    { label: "Internal Name", text: internalname.description, visible: false },
    { label: "Descriptive Name", text: message.description, visible: true },
    { label: "Hardware ID", text: hardwareid.description, visible: false },
    { label: "Values", text: values.description, visible: false }
];

// Iterate over the label-text pairs and create the corresponding elements
labels.forEach(function (labelObj) {
    // Create the label element
    let label = document.createElement("label");
    label.className = "block text-gray-700 font-bold mb-2";
    label.textContent = labelObj.label;

    // Create the p element
    let p = document.createElement("p");
    p.className = "text-gray-600 text-xs mt-1";
    p.textContent = labelObj.text;

    // Create the container div for label and p elements
    let labelPContainerDiv = document.createElement("div");
    if (labelObj.visible === false) {
        labelPContainerDiv.className = "mb-4 hidden";
    } else {
        labelPContainerDiv.className = "mb-4";
    }
    
    // Append the label and p elements to the container div
    labelPContainerDiv.appendChild(label);
    labelPContainerDiv.appendChild(p);

    // Append the container div to the content div
    contentDiv.appendChild(labelPContainerDiv);
});

let collapseBtn = document.createElement("button");
collapseBtn.textContent = "Show advanced";
collapseBtn.className = "px-4 py-2 mb-3 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 float-right";

collapseBtn.addEventListener('click', function() {
    let hiddenFields;
    let toggleText;

    if (collapseBtn.textContent === 'Show advanced') {
        hiddenFields = contentDiv.getElementsByClassName('hidden');
        toggleText = 'Show less';
    } else {
        hiddenFields = contentDiv.getElementsByClassName('shown');
        toggleText = 'Show advanced';
    }
    
    hiddenFields = Array.from(hiddenFields);
    
    hiddenFields.forEach(function(field) {
        field.classList.toggle('hidden');
        field.classList.toggle('shown');
    });
    
    collapseBtn.textContent = toggleText;
});


// Append the show more button.
contentDiv.appendChild(collapseBtn);

// Append the header div and content div to the inner div
innerDiv.appendChild(headerDiv);
innerDiv.appendChild(contentDiv);

// Append the inner div to the container div
containerDiv.appendChild(innerDiv);

// Get the div with id "list"
let listDiv = document.getElementById("list");

// Append the container div to the list div
listDiv.appendChild(containerDiv);
}

const settingsImg = document.getElementById('settings');
const overlay = document.getElementById('overlay');
const closeSettings = document.getElementById('close');
const statusDiv = document.getElementById('statusDiv');
const settingsDiv = document.getElementById('settingsDiv');

settingsImg.addEventListener('click', function() {
    overlay.style.display = 'block';
    setTimeout(function() {
        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
    }, 50);
});

closeSettings.addEventListener('click', function() {
    overlay.style.opacity = '0';
    overlay.style.transform = 'translateY(-100%)';

    // Wait for the animation to finish before hiding the overlay
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 300); // Adjust the duration to match your CSS transition duration
});

settingsDiv.addEventListener('click', function() {
    window.location.href = 'settings.html';
});

statusDiv.addEventListener('click', function() {
    window.location.href = 'index.html';
});

