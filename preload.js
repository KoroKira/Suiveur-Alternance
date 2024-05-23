const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  saveCompanyData: async (company) => {
    try {
      const message = await ipcRenderer.invoke('save-company-data', company);
      return message;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données de l\'entreprise:', error);
      return 'Une erreur est survenue lors de la sauvegarde des données de l\'entreprise.';
    }
  },

  loadCompanies: async () => {
    try {
      const companies = await ipcRenderer.invoke('load-companies');
      return companies;
    } catch (error) {
      console.error('Erreur lors du chargement des entreprises:', error);
      return [];
    }
  }
});
