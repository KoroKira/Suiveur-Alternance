const { ipcRenderer } = require('electron');

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
