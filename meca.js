document.addEventListener('DOMContentLoaded', function() {
    const companyForm = document.getElementById('companyForm');
    const companiesTableBody = document.getElementById('companiesTableBody');
  
    if (companyForm) {
      companyForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        await addCompany();
      });
    }
  
    if (companiesTableBody) {
      loadCompanies();
    }
  
    async function addCompany() {
      const company = {
        name: document.getElementById('companyName').value,
        sector: document.getElementById('sector').value,
        applicationDate: document.getElementById('applicationDate').value,
        applicationMethod: document.getElementById('applicationMethod').value,
        // Add other fields here
      };
  
      const message = await window.electron.saveCompanyData(company);
      alert(message);
  
      if (companyForm) {
        companyForm.reset();
      }
    }
  
    async function loadCompanies() {
      companiesTableBody.innerHTML = '';
      const companies = await window.electron.loadCompanies();
  
      companies.forEach(function(company, index) {
        const row = companiesTableBody.insertRow();
        row.insertCell(0).textContent = company.name;
        row.insertCell(1).textContent = company.sector;
        row.insertCell(2).textContent = company.applicationDate;
        row.insertCell(3).textContent = company.applicationMethod;
        // Add other fields here
        const actionsCell = row.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.className = 'btn btn-danger';
        deleteButton.addEventListener('click', function() {
          // Implement delete functionality here
        });
        actionsCell.appendChild(deleteButton);
      });
    }
  });
  