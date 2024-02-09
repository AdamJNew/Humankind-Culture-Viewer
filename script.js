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
        if (row['Culture Name'] && row['Affinity'] && row['Trait Effect'] && row['Emblematic District'] && row['Emblematic Unit']) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${row['Culture Name']}</h3>
                <p><strong>Affinity:</strong> <br><img src="${row['Affinity Image']}" alt="Affinity" style="height: 30px;width: 30px"> ${row['Affinity']}</p>
                <p><strong>Trait Effect:</strong> <br><img src="${row['Trait Effect Image']}" alt="Trait Effect" style="height: 20px;"> <br>${row['Trait Effect']}</p>
                <p><strong>Emblematic District:</strong><br><img src="${row['Emblematic District Image']}" alt="Emblematic District" style="height: 30px;width: 30px"><br><strong>${row['Emblematic District Name']}</strong><br>${row['Emblematic District']}</p>
                <p><strong>Emblematic Unit:</strong> <br><img src="${row['Emblematic Unit Image']}" alt="Emblematic Unit" style="height: 20px;"><br><strong>${row['Emblematic Unit Name']}</strong> <br>${row['Emblematic Unit']}</p>
            `;
            contentDiv.appendChild(card);
        }
    });
}
