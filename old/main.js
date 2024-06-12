const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('navigate', (event, page) => {
    mainWindow.loadFile(page);
});

const getCompaniesFilePath = () => {
    return path.join(app.getPath('userData'), 'infos.json');
};

const readCompaniesFile = () => {
    const filePath = getCompaniesFilePath();
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } else {
        return [];
    }
};

const writeCompaniesFile = (data) => {
    const filePath = getCompaniesFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

ipcMain.on('add-company', (event, companyData) => {
    const companies = readCompaniesFile();
    const companyId = Date.now().toString();
    companyData.id = companyId;
    companies.push(companyData);
    writeCompaniesFile(companies);
});

ipcMain.on('get-all-companies', (event) => {
    const companies = readCompaniesFile();
    event.sender.send('companies-data', companies);
});

ipcMain.on('get-company', (event, companyId) => {
    const companies = readCompaniesFile();
    const company = companies.find(c => c.id === companyId);
    event.sender.send('company-data', company || null);
});

ipcMain.on('update-company', (event, updatedCompanyData) => {
    const companies = readCompaniesFile();
    const index = companies.findIndex(c => c.id === updatedCompanyData.id);
    if (index !== -1) {
        companies[index] = updatedCompanyData;
        writeCompaniesFile(companies);
    }
});

ipcMain.on('edit-company', (event, companyId) => {
    mainWindow.loadFile('edit.html');
    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.send('company-data', companyId);
    });
});
