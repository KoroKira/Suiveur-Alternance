const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const companyData = {
      name: document.getElementById('companyName').value,
      sector: document.getElementById('sector').value,
      applicationDate: document.getElementById('applicationDate').value,
      applicationFormat: [
        document.getElementById('mail').checked ? 'Mail' : null,
        document.getElementById('website').checked ? 'Site' : null,
        document.getElementById('inPerson').checked ? 'En personne' : null
      ].filter(Boolean),
      contactName: document.getElementById('contactName').value,
      targetPosition: document.getElementById('targetPosition').value,
      address: document.getElementById('address').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      contactEmail: document.getElementById('contactEmail').value,
      additionalNotes: document.getElementById('additionalNotes').value
    };

    try {
      const result = await ipcRenderer.invoke('save-company-data', companyData);
      alert(result);
    } catch (error) {
      console.error('Failed to save company data:', error);
      alert('Erreur lors de la sauvegarde des données.');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const currentUrl = window.location.href;

  if (currentUrl.includes('visualisation.html')) {
    loadCompanies();
  } else if (currentUrl.includes('edit.html')) {
    loadCompanyDataForEdit();
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      updateCompanyData();
    });
  } else {
    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      saveCompanyData();
    });
  }
});

async function saveCompanyData() {
  const companyData = getFormData();
  try {
    const result = await ipcRenderer.invoke('save-company-data', companyData);
    alert(result);
  } catch (error) {
    console.error('Failed to save company data:', error);
    alert('Erreur lors de la sauvegarde des données.');
  }
}

async function loadCompanies() {
  try {
    const companies = await ipcRenderer.invoke('load-companies');
    const tableBody = document.getElementById('companiesTableBody');
    tableBody.innerHTML = ''; // Clear existing content
    companies.forEach(company => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${company.name}</td>
        <td>${company.sector}</td>
        <td>${company.applicationDate}</td>
        <td>${company.applicationFormat.join(', ')}</td>
        <td>
          <button class="btn btn-primary" onclick="editCompany('${company.name}')">Éditer</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Failed to load companies:', error);
  }
}

function editCompany(companyName) {
  window.location.href = `edit.html?name=${encodeURIComponent(companyName)}`;
}

async function loadCompanyDataForEdit() {
  const urlParams = new URLSearchParams(window.location.search);
  const companyName = urlParams.get('name');

  if (companyName) {
    try {
      const companies = await ipcRenderer.invoke('load-companies');
      const company = companies.find(c => c.name === companyName);

      if (company) {
        populateEditForm(company);
      } else {
        alert('Entreprise non trouvée.');
      }
    } catch (error) {
      console.error('Failed to load company data:', error);
    }
  }
}

function populateEditForm(company) {
  document.getElementById('companyName').value = company.name;
  document.getElementById('sector').value = company.sector;
  document.getElementById('applicationDate').value = company.applicationDate;
  document.getElementById('mail').checked = company.applicationFormat.includes('Mail');
  document.getElementById('website').checked = company.applicationFormat.includes('Site');
  document.getElementById('inPerson').checked = company.applicationFormat.includes('En personne');
  document.getElementById('contactName').value = company.contactName;
  document.getElementById('targetPosition').value = company.targetPosition;
  document.getElementById('address').value = company.address;
  document.getElementById('phoneNumber').value = company.phoneNumber;
  document.getElementById('contactEmail').value = company.contactEmail;
  document.getElementById('additionalNotes').value = company.additionalNotes;
}

async function updateCompanyData() {
  const companyData = getFormData();
  try {
    const result = await ipcRenderer.invoke('save-company-data', companyData);
    alert(result);
    window.location.href = 'visualisation.html';
  } catch (error) {
    console.error('Failed to update company data:', error);
    alert('Erreur lors de la mise à jour des données.');
  }
}

function getFormData() {
  return {
    name: document.getElementById('companyName').value,
    sector: document.getElementById('sector').value,
    applicationDate: document.getElementById('applicationDate').value,
    applicationFormat: [
      document.getElementById('mail').checked ? 'Mail' : null,
      document.getElementById('website').checked ? 'Site' : null,
      document.getElementById('inPerson').checked ? 'En personne' : null
    ].filter(Boolean),
    contactName: document.getElementById('contactName').value,
    targetPosition: document.getElementById('targetPosition').value,
    address: document.getElementById('address').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    contactEmail: document.getElementById('contactEmail').value,
    additionalNotes: document.getElementById('additionalNotes').value
  };
}