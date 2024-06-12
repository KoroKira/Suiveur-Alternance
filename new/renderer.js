const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    // Charger les entreprises au démarrage
    const companies = ipcRenderer.sendSync('load-companies');
    companies.forEach(addCompanyToList);
});

document.getElementById('addCompanyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupération des données du formulaire
    const company = {
        name: document.getElementById('name').value,
        sector: document.getElementById('sector').value,
        applicationDate: document.getElementById('applicationDate').value,
        applicationFormat: document.getElementById('applicationFormat').value,
        contactName: document.getElementById('contactName').value,
        position: document.getElementById('position').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        notes: document.getElementById('notes').value
    };

    // Ajouter l'entreprise à la liste
    addCompanyToList(company);

    // Sauvegarder les entreprises
    saveCompanies();

    // Réinitialisation du formulaire
    document.getElementById('addCompanyForm').reset();
});

function addCompanyToList(company) {
    const companyListItem = document.createElement('li');
    companyListItem.classList.add('company');

    const companyDetails = `
        <div class="company-details">
            <strong>Nom:</strong> ${company.name}<br>
            <strong>Secteur:</strong> ${company.sector}<br>
            <strong>Date de candidature:</strong> ${company.applicationDate}<br>
            <strong>Format de candidature:</strong> ${company.applicationFormat}<br>
            <strong>Nom du contact:</strong> ${company.contactName}<br>
            <strong>Poste visé:</strong> ${company.position}<br>
            <strong>Adresse:</strong> ${company.address}<br>
            <strong>Numéro de téléphone:</strong> ${company.phone}<br>
            <strong>Email:</strong> ${company.email}<br>
            <strong>Notes:</strong> ${company.notes}<br>
        </div>
    `;
    companyListItem.innerHTML = companyDetails;

    document.getElementById('companyList').appendChild(companyListItem);
}

function saveCompanies() {
    const companyListItems = document.querySelectorAll('.company');
    const companies = Array.from(companyListItems).map(item => {
        const details = item.querySelector('.company-details').innerHTML.split('<br>');
        return {
            name: details[0].split('</strong> ')[1],
            sector: details[1].split('</strong> ')[1],
            applicationDate: details[2].split('</strong> ')[1],
            applicationFormat: details[3].split('</strong> ')[1],
            contactName: details[4].split('</strong> ')[1],
            position: details[5].split('</strong> ')[1],
            address: details[6].split('</strong> ')[1],
            phone: details[7].split('</strong> ')[1],
            email: details[8].split('</strong> ')[1],
            notes: details[9].split('</strong> ')[1],
        };
    });
    ipcRenderer.send('save-companies', companies);
}
