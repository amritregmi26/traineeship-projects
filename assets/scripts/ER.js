let erCard = document.querySelectorAll("#erd .item");

for (let i = 0; i < erCard.length; i++) {
    erCard[i].addEventListener("click", () => {
        const title = erCard[i].children[1].innerHTML;
        window.location.href = `../traineeship-projects/individual-er.html?title=${encodeURIComponent(title)}`;
    });
}

function updateIndividual() {

    // Variable Declaration
    let headerText = document.querySelector("#individual-er .header-text"),
        erDiagram = document.querySelector("#individual-er img"),
        mainContent = document.querySelector("#individual-er .main-content")
        detailsSection = document.querySelector("#individual-er .details"),
        detailItems = document.querySelectorAll("#individual-er .items");

    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    document.title += ` ${title}`;

    headerText.innerHTML = !title.includes("MS") ? title : title.replace("MS", "Management System");

    // Fetch JSON data
    let data = async () => {
        let res = await fetch('../assets/scripts/data.json');
        let jsonData = await res.json();
        elements(jsonData);
    }

    function elements(data) {

        // Create and append Description
        let desc = document.createElement('p');
        desc.classList.add('description');
        for(let i = 0; i < data.length; i++) {
            if(data[i].title === title) {
                desc.innerHTML = data[i].description;
                createEntity(i);
                createRelation(i);
                break;
            }
        }
        mainContent.insertBefore(desc, detailsSection);

        // Create and append Entity
        function createEntity(idx) {
            for(let i = 0; i < data[idx].Entities.length; i++) {
                let entity = document.createElement('li');
                entity.innerHTML = data[idx].Entities[i];
                detailItems[0].appendChild(entity);
            }
        }

        // Create and append relation
        function createRelation(idx) {
            for(let i = 0; i < data[idx].relations.length; i++) {
                let relation = document.createElement('li');
                relation.innerHTML = data[idx].relations[i];
                detailItems[1].appendChild(relation);
            }
        }
    }

    data();
}

if(window.location.href.includes("individual-er.html")) {
    updateIndividual();
}