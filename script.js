// script.js

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            loadTabData(tab.getAttribute('data-era'));
        });
    });
});

async function loadTabData(era) {
    const response = await fetch(`${era}.csv`);
    const csvText = await response.text();
    const data = Papa.parse(csvText, { header: true }).data;
    displayData(data);
}

function displayData(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content

    data.forEach(row => {
        // Check if the row data contains valid information
        if (row['Culture Name'] && row['Affinity'] && row['Trait Effect'] && row['Emblematic District'] && row['Emblematic District Name'] && row['Emblematic Unit'] && row['Emblematic Unit Name']) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${row['Culture Name']}</h3>
                <p><strong>Affinity:</strong> <img src="${row['Affinity Image']}" alt="Affinity" style="height: 20px;"> ${row['Affinity']}</p>
                <p><strong>Trait Effect:</strong> <img src="${row['Trait Effect Image']}" alt="Trait Effect" style="height: 20px;"> ${row['Trait Effect']}</p>
                <p><strong>Emblematic District:</strong> <img src="${row['Emblematic District Image']}" alt="Emblematic District" style="height: 20px;"> ${row['Emblematic District']} (${row['Emblematic District Name']})</p>
                <p><strong>Emblematic Unit:</strong> <img src="${row['Emblematic Unit Image']}" alt="Emblematic Unit" style="height: 20px;"> ${row['Emblematic Unit']} (${row['Emblematic Unit Name']})</p>
            `;
            contentDiv.appendChild(card);
        }
    });
}

