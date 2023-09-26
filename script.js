const genusList = document.getElementById("genus-list");

// Function to fetch data and extract genus names
async function fetchGenusNames(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const genusNames = data.result.map(item => item.name);
        return genusNames;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// URLs to fetch data from
const url1 = "https://api.checklistbank.org/dataset/9916/tree/698/children.json";
const url2 = "https://api.checklistbank.org/dataset/9916/tree/698/children.json";

// Fetch data from the URLs and populate the list
async function populateGenusList() {
    const genusNames1 = await fetchGenusNames(url1);
    const genusNames2 = await fetchGenusNames(url2);

    const allGenusNames = [...genusNames1, ...genusNames2];

    allGenusNames.forEach(genusName => {
        const listItem = document.createElement("li");
        listItem.textContent = genusName;
        genusList.appendChild(listItem);
    });
}

// Call the function to populate the genus list
populateGenusList();