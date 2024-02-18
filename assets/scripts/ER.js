// Function to handle ERD page
function handleErd() {
    // Select item container for appending each item
    let itemContainer = document.querySelector('#erd .item-container');

    // Fetch JSON data
    let data = async () => {
        let res = await fetch('/traineeship-projects/assets/scripts/data.json');
        let jsonData = await res.json();
        updateUI(jsonData);
    }

    // Function to update the User Interface dynamically using the JSON data
    function updateUI(data) {
        for (let i = 0; i < data.length; i++) {

            // Add item section
            let item = document.createElement("section");
            item.classList.add('item');
            itemContainer.appendChild(item);
            
            // Add img
            let img = document.createElement("img");
            img.src = data[i].img;
            item.appendChild(img);
            
            // Add title in item
            let title = document.createElement("h1");
            title.innerHTML = data[i].title;
            item.appendChild(title);
        }

        // Set URL for dynamic rendering
        let erCard = document.querySelectorAll("#erd .item");
        for (let i = 0; i < erCard.length; i++) {
            erCard[i].addEventListener("click", () => {
                const title = erCard[i].children[1].innerHTML;
                window.location.href = `/traineeship-projects/individual-er.html?title=${encodeURIComponent(title)}`;
            });
        }
    }


    data();
}

// Function to handle individual ERD page
function updateIndividual() {

    // Variable Declaration
    let headerText = document.querySelector("#individual-er .header-text"),
        erDiagram = document.querySelector("#individual-er img"),
        mainContent = document.querySelector("#individual-er .main-content"),
        detailsSection = document.querySelector("#individual-er .details"),
        detailItems = document.querySelectorAll("#individual-er .items");

    // Setting the title of the html page using param passed in url 
    // for dynamic content rendering
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    document.title += ` ${title}`;

    // Updating header text in the body element 
    // Replacing MS by Management System
    headerText.innerHTML = !title.includes("MS") ? title : title.replace("MS", "Management System");

    // Fetch JSON data
    let data = async () => {
        let res = await fetch('/traineeship-projects/assets/scripts/data.json');
        let jsonData = await res.json();
        elements(jsonData);
    }

    // Create Each component to be rendered dynamically
    // in the individual er page
    function elements(data) {

        // Create and append Description
        let desc = document.createElement('p');
        desc.classList.add('description');
        for (let i = 0; i < data.length; i++) {
            if (data[i].title === title) {
                desc.innerHTML = data[i].description;
                updateImage(i);
                createEntity(i);
                createRelation(i);
                break;
            }
        }
        mainContent.insertBefore(desc, detailsSection);

        function updateImage(idx) {
            erDiagram.src = data[idx].img
        }

        // Create and append Entity
        function createEntity(idx) {
            for (let i = 0; i < data[idx].Entities.length; i++) {
                let entity = document.createElement('li');
                entity.innerHTML = data[idx].Entities[i];
                detailItems[0].appendChild(entity);
            }
        }

        // Create and append relation
        function createRelation(idx) {
            for (let i = 0; i < data[idx].relations.length; i++) {
                let relation = document.createElement('li');
                relation.innerHTML = data[idx].relations[i];
                detailItems[1].appendChild(relation);
            }
        }
    }

    data();
}

// Call functions only for required pages
// to avoid element not found error in the console.
if (window.location.href.includes("individual-er.html")) {
    updateIndividual();
}


if (window.location.href.includes("erd.html")) {
    handleErd();
}