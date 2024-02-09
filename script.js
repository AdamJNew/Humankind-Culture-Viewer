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
    const data = parseCSV(csvText);
    displayData(data);
}

function parseCSV(csvText) {
    const rows = csvText.split('\n').map(row => row.trim()); // Split CSV text into rows
    const headers = rows[0].split(','); // Extract headers from the first row
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(','); // Split each row into columns
        const rowData = {};

        for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = columns[j]; // Assign each column value to its corresponding header
        }

        data.push(rowData);
    }

    return data;
}

function displayData(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content

    data.forEach(row => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${row['Culture Name']}</h3>
            <p><strong>Affinity:</strong> <img src="${row['Affinity Image']}" alt="Affinity" style="height: 20px;"> ${row['Affinity']}</p>
            <p><strong>Trait Effect:</strong> <img src="${row['Trait Effect Image']}" alt="Trait Effect" style="height: 20px;"> ${row['Trait Effect']}</p>
            <p><strong>Emblematic District:</strong> <img src="${row['Emblematic District Image']}" alt="Emblematic District" style="height: 20px;"> ${row['Emblematic District']}</p>
            <p><strong>Emblematic Unit:</strong> <img src="${row['Emblematic Unit Image']}" alt="Emblematic Unit" style="height: 20px;"> ${row['Emblematic Unit']}</p>
        `;
        contentDiv.appendChild(card);
    });
}
