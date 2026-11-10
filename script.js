


let reports = JSON.parse(localStorage.getItem("finditReports")) || [];

let currentFilter = "All";


function openForm(type) {

    document.getElementById("reportModal").style.display = "block";

    document.getElementById("formTitle").innerText =
        "Report " + type + " Item";

    document.getElementById("reportForm").dataset.type = type;
}


function closeForm() {

    document.getElementById("reportModal").style.display = "none";

}


document.getElementById("reportForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const report = {

        id: Date.now(),

        type: this.dataset.type,

        name: document.getElementById("itemName").value,

        category: document.getElementById("category").value,

        location: document.getElementById("location").value,

        description: document.getElementById("description").value,

        contact: document.getElementById("contact").value,

        clue: document.getElementById("clue").value

    };

    reports.push(report);

    localStorage.setItem("finditReports", JSON.stringify(reports));

    this.reset();

    closeForm();

    displayItems();

    alert("Your report was submitted successfully!");

});


function displayItems() {

    const itemList = document.getElementById("itemList");

    const searchText = document.getElementById("searchInput").value.toLowerCase();

    itemList.innerHTML = "";

    const filteredReports = reports.filter(function(item) {

        const matchesSearch =
            item.name.toLowerCase().includes(searchText) ||
            item.category.toLowerCase().includes(searchText) ||
            item.location.toLowerCase().includes(searchText);

        const matchesFilter =
            currentFilter === "All" || item.type === currentFilter;

        return matchesSearch && matchesFilter;

    });

    if (filteredReports.length === 0) {

        itemList.innerHTML = "<p>No reports found. Be the first to report an item!</p>";

    }

    filteredReports.forEach(function(item) {

        const card = document.createElement("div");

        card.className = "item-card";

        const status = document.createElement("span");
        status.className = "status";
        status.textContent = item.type;

        const title = document.createElement("h3");
        title.textContent = item.name;

        const category = document.createElement("p");
        category.textContent = "Category: " + item.category;

        const location = document.createElement("p");
        location.textContent = "Location: " + item.location;

        const description = document.createElement("p");
        description.textContent = item.description;

        const contact = document.createElement("p");
        contact.textContent = "Contact: " + item.contact;

        card.append(status, title, category, location, description, contact);

        itemList.appendChild(card);

    });

    updateStatistics();

}


function filterItems(type) {

    currentFilter = type;

    displayItems();

}


function updateStatistics() {

    document.getElementById("totalItems").innerText = reports.length;

    document.getElementById("lostItems").innerText =
        reports.filter(item => item.type === "Lost").length;

    document.getElementById("foundItems").innerText =
        reports.filter(item => item.type === "Found").length;

}


document.getElementById("searchInput").addEventListener("input", displayItems);

displayItems();
