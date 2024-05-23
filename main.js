const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('main.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('save-company-data', async (event, company) => {
  const companyDir = path.join(__dirname, `Entreprises/${company.name}`);
  
  if (!fs.existsSync(companyDir)) {
    fs.mkdirSync(companyDir, { recursive: true });
  }

  const dataFilePath = path.join(companyDir, 'datas.json');
  fs.writeFileSync(dataFilePath, JSON.stringify(company, null, 2));

  return 'Entreprise créée avec succès!';
});

ipcMain.handle('load-companies', async () => {
  const companiesDir = path.join(__dirname, 'Entreprises');
  const companies = [];

  if (fs.existsSync(companiesDir)) {
    const companyDirs = fs.readdirSync(companiesDir);

    for (const dir of companyDirs) {
      const dataFilePath = path.join(companiesDir, dir, 'datas.json');
      if (fs.existsSync(dataFilePath)) {
        const companyData = fs.readFileSync(dataFilePath);
        companies.push(JSON.parse(companyData));
      }
    }
  }

  return companies;
});
