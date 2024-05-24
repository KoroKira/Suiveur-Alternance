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
