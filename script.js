// script.js

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Remove the active class from all tabs and reset their color
            resetTabStyles();

            // Load the data for the clicked tab
            loadTabData(tab.getAttribute('data-era'));

            // Apply the active style to the clicked tab
            tab.style.color = '#32beec';
        });
    });
    // Automatically load data for the "ancient-era" tab.
    loadTabData('ancient');

    // Apply the initial style to the "ancient-era" tab
    applyInitialTabStyle();
});

async function loadTabData(era) {
    const response = await fetch(`/Data/BaseGame/${era}.csv`);
    const csvText = await response.text();
    const data = Papa.parse(csvText, { header: true }).data;
    displayData(data);
}

function displayData(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content

    data.forEach(row => {
        // Check if the row data contains valid information
        if (row['Culture Name'] && row['Affinity'] && row['Trait Effect'] && row['Emblematic District'] && row['Emblematic Unit']) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${row['Culture Name']}</h3>
                <p><strong>Affinity:</strong> <br><img src="${row['Affinity Image']}" alt="Affinity Image" style="height: 30px;width: 30px"> ${row['Affinity']}</p>
                <p><strong>Trait Effect:</strong><br>${row['Trait Effect'].replace(/\n/g, '<br>')}</p>
                <p><strong>Emblematic District:</strong><br><img src="${row['Emblematic District Image']}" alt="Emblematic District Image" style="height: 100px;width: 100px"><br><strong>${row['Emblematic District Name']}</strong><br>${row['Emblematic District'].replace(/\n/g, '<br>')}</p>
                <p><strong>Emblematic Unit:</strong> <br><img src="${row['Emblematic Unit Image']}" alt="Emblematic Unit Image" style="height: 100px;width: 100px"><br><strong>${row['Emblematic Unit Name']}</strong> <br>${row['Emblematic Unit'].replace(/\n/g, '<br>')}</p>
            `;
            contentDiv.appendChild(card);
        }
    });
}

function resetTabStyles() {
    document.querySelectorAll('.tab').forEach(function(tab) {
        tab.style.color = ''; // Reset to default color, you can change this as needed
    });
}

function applyInitialTabStyle() {
    // Find the initial tab, you might need to adjust the selector based on your HTML structure
    const initialTab = document.querySelector('.tab[data-era="ancient"]');
    if (initialTab) {
        initialTab.style.color = '#32beec';
    }
}
