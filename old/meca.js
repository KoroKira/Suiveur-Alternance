const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('addCompanyForm')) {
        const form = document.getElementById('addCompanyForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const companyData = {
                name: form.name.value,
                sector: form.sector.value,
                applicationDate: form.applicationDate.value,
                applicationFormat: form.applicationFormat.value,
                contactName: form.contactName.value,
                position: form.position.value,
                address: form.address.value,
                phone: form.phone.value,
                email: form.email.value,
                notes: form.notes.value
            };
            ipcRenderer.send('add-company', companyData);
        });
    }

    if (document.getElementById('editCompanyForm')) {
        const form = document.getElementById('editCompanyForm');
        const companyId = form.companyId.value;
        ipcRenderer.send('get-company', companyId);
        ipcRenderer.on('company-data', (event, company) => {
            form.name.value = company.name;
            form.sector.value = company.sector;
            form.applicationDate.value = company.applicationDate;
            form.applicationFormat.value = company.applicationFormat;
            form.contactName.value = company.contactName;
            form.position.value = company.position;
            form.address.value = company.address;
            form.phone.value = company.phone;
            form.email.value = company.email;
            form.notes.value = company.notes;
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const updatedCompanyData = {
                id: companyId,
                name: form.name.value,
                sector: form.sector.value,
                applicationDate: form.applicationDate.value,
                applicationFormat: form.applicationFormat.value,
                contactName: form.contactName.value,
                position: form.position.value,
                address: form.address.value,
                phone: form.phone.value,
                email: form.email.value,
                notes: form.notes.value
            };
            ipcRenderer.send('update-company', updatedCompanyData);
        });
    }

    if (document.getElementById('companiesTable')) {
        ipcRenderer.send('get-all-companies');
        ipcRenderer.on('companies-data', (event, companies) => {
            const tableBody = document.getElementById('companiesTable').getElementsByTagName('tbody')[0];
            companies.forEach(company => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = company.name;
                row.insertCell(1).textContent = company.sector;
                row.insertCell(2).textContent = company.applicationDate;
                row.insertCell(3).textContent = company.applicationFormat;

                const actionsCell = row.insertCell(4);
                const editButton = document.createElement('button');
                editButton.textContent = 'Éditer';
                editButton.addEventListener('click', () => {
                    ipcRenderer.send('edit-company', company.id);
                });
                actionsCell.appendChild(editButton);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const addCompanyNav = document.getElementById('nav-add-company');
    const viewCompaniesNav = document.getElementById('nav-view-companies');
    const editCompanyNav = document.getElementById('nav-edit-company');

    if (addCompanyNav) {
        addCompanyNav.addEventListener('click', () => {
            ipcRenderer.send('navigate', 'main.html');
        });
    }

    if (viewCompaniesNav) {
        viewCompaniesNav.addEventListener('click', () => {
            ipcRenderer.send('navigate', 'visualisation.html');
        });
    }

    if (editCompanyNav) {
        editCompanyNav.addEventListener('click', () => {
            ipcRenderer.send('navigate', 'edit.html');
        });
    }
});
