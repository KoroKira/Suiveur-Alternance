const fs = require('fs');
const path = require('path');

const companyFilePath = path.join(__dirname, 'companies.json');
let companies = loadCompanies();

document.addEventListener('DOMContentLoaded', () => {
    const addCompanyForm = document.getElementById('addCompanyForm');

    addCompanyForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const companyData = {
            id: Date.now().toString(),
            name: addCompanyForm.name.value,
            sector: addCompanyForm.sector.value,
            applicationDate: addCompanyForm.applicationDate.value,
            applicationFormat: addCompanyForm.applicationFormat.value,
            contactName: addCompanyForm.contactName.value,
            position: addCompanyForm.position.value,
            address: addCompanyForm.address.value,
            phone: addCompanyForm.phone.value,
            email: addCompanyForm.email.value,
            notes: addCompanyForm.notes.value
        };

        addCompany(companyData);
        renderCompanies();
        addCompanyForm.reset();
    });

    document.getElementById('nav-view-companies').addEventListener('click', () => {
        renderCompanies();
    });

    document.getElementById('nav-edit-company').addEventListener('click', () => {
        const companyId = prompt("Entrez l'identifiant de l'entreprise à éditer :");
        if (companyId) {
            const company = companies.find(c => c.id === companyId);
            if (company) {
                const editCompanyForm = document.getElementById('editCompanyForm');
                editCompanyForm.name.value = company.name;
                editCompanyForm.sector.value = company.sector;
                editCompanyForm.applicationDate.value = company.applicationDate;
                editCompanyForm.applicationFormat.value = company.applicationFormat;
                editCompanyForm.contactName.value = company.contactName;
                editCompanyForm.position.value = company.position;
                editCompanyForm.address.value = company.address;
                editCompanyForm.phone.value = company.phone;
                editCompanyForm.email.value = company.email;
                editCompanyForm.notes.value = company.notes;
            } else {
                alert("L'entreprise avec cet identifiant n'existe pas.");
            }
        }
    });

    const editCompanyForm = document.getElementById('editCompanyForm');
    editCompanyForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const companyId = editCompanyForm.companyId.value;
        const updatedCompanyData = {
            id: companyId,
            name: editCompanyForm.name.value,
            sector: editCompanyForm.sector.value,
            applicationDate: editCompanyForm.applicationDate.value,
            applicationFormat: editCompanyForm.applicationFormat.value,
            contactName: editCompanyForm.contactName.value,
            position: editCompanyForm.position.value,
            address: editCompanyForm.address.value,
            phone: editCompanyForm.phone.value,
            email: editCompanyForm.email.value,
            notes: editCompanyForm.notes.value
        };

        editCompany(companyId, updatedCompanyData);
        renderCompanies();
    });
});

function loadCompanies() {
    if (fs.existsSync(companyFilePath)) {
        return JSON.parse(fs.readFileSync(companyFilePath));
    }
    return [];
}

function saveCompanies() {
    fs.writeFileSync(companyFilePath, JSON.stringify(companies, null, 2));
}

function renderCompanies() {
    const companyList = document.getElementById('companyList');
    companyList.innerHTML = '';
    companies.forEach((company, index) => {
        const companyItem = document.createElement('li');
        companyItem.textContent = company.name;
        companyList.appendChild(companyItem);
    });
}

function addCompany(companyData) {
    companies.push(companyData);
    saveCompanies();
}

function editCompany(companyId, updatedCompanyData) {
    const index = companies.findIndex(c => c.id === companyId);
    if (index !== -1) {
        companies[index] = updatedCompanyData;
        saveCompanies();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const addCompanyNav = document.getElementById('nav-add-company');
    const viewCompaniesNav = document.getElementById('nav-view-companies');
    const editCompanyNav = document.getElementById('nav-edit-company');

    if (addCompanyNav) {
        addCompanyNav.addEventListener('click', () => {
            // Logique pour naviguer vers index.html
            window.location.href = 'index.html';
        });
    }

    if (viewCompaniesNav) {
        viewCompaniesNav.addEventListener('click', () => {
            // Logique pour naviguer vers visualisation.html
            window.location.href = 'visualisation.html';
        });
    }

    if (editCompanyNav) {
        editCompanyNav.addEventListener('click', () => {
            // Logique pour naviguer vers edit.html
            window.location.href = 'edit.html';
        });
    }
});
