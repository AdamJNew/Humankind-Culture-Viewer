document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            loadTabData(tab.getAttribute('data-era'));
        });
    });
});

async function loadTabData(era) {
    try {
        const response = await fetch(`${era}.csv`);
        const csvText = await response.text();
        const data = parseCSV(csvText); // Make sure you have a parseCSV function defined or use a library for parsing.
        displayData(data, era); // Implement displayData to update the DOM based on the CSV data.
    } catch (error) {
        console.error("Failed to load or parse CSV data:", error);
    }
}

function parseCSV(csvText) {
    // Simple CSV parser - consider using a library like PapaParse for complex CSVs
    return csvText.trim().split('\n').slice(1).map(row => row.split(','));
}

function displayData(data, era) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content

    data.forEach(row => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${row[2]}" alt="Image" style="max-height: 100px; object-fit: cover;">
            <div class="card-content">
                <h3>${row[0]}</h3> <!-- Culture Name -->
                <p><strong>Affinity:</strong> <img src="${row[3]}" alt="Affinity" style="height: 20px;"> ${row[1]}</p>`
	}