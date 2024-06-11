const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('add-company', (event, companyData) => {
    const companyId = Date.now().toString();
    const companyPath = path.join(app.getPath('userData'), 'companies', `${companyId}.json`);
    fs.writeFileSync(companyPath, JSON.stringify(companyData));
});

ipcMain.on('get-all-companies', (event) => {
    const companiesPath = path.join(app.getPath('userData'), 'companies');
    const companies = fs.readdirSync(companiesPath).map(file => {
        const filePath = path.join(companiesPath, file);
        return JSON.parse(fs.readFileSync(filePath));
    });
    event.sender.send('companies-data', companies);
});

ipcMain.on('get-company', (event, companyId) => {
    const companyPath = path.join(app.getPath('userData'), 'companies', `${companyId}.json`);
    const company = JSON.parse(fs.readFileSync(companyPath));
    event.sender.send('company-data', company);
});

ipcMain.on('update-company', (event, updatedCompanyData) => {
    const companyPath = path.join(app.getPath('userData'), 'companies', `${updatedCompanyData.id}.json`);
    fs.writeFileSync(companyPath, JSON.stringify(updatedCompanyData));
});

ipcMain.on('edit-company', (event, companyId) => {
    mainWindow.loadFile('edit.html');
    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.send('company-data', companyId);
    });
});
