import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { autoUpdater } from "electron-updater";
import { v4 } from "uuid";
// import * as binance from "./binance.js";
let binance = require("./binance.js");
import * as fs from "fs";

const isDevelopment = process.env.NODE_ENV !== "production";

async function Test() {
  while (true) {
    await sleep(2000);
    // app.relaunch();
    // app.exit() // there is also app.quit which attempts to exit but may not in certain cases, see docs. it also has events it fires

    binance.DeleteModule();
    delete require.cache[require.resolve("./binance.js")];
    binance = require("./binance.js");
    console.log(binance.testVar);
  }
}

Test();

binance.mainEmitter.on(`console-log`, function(data) {
  win.webContents.send(`console-log`, data[0]); //forward to frontend
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true
    }
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    win.removeMenu();
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    autoUpdater.checkForUpdatesAndNotify();
  }

  win.on("closed", () => {
    win = null;
  });

  win.on("before-quit", () => {
    console.log("before-quit");
  });

  win.on("will-quit", () => {
    console.log("will-quit");
  });

  win.webContents.on("did-finish-load", () => {
    LoadSettings();
    binance.mainEmitter.emit(`did-finish-load`);
  });
}

function StartBot() {
  binance.StartBot();
  win.webContents.send("bot-start-status", true);
  console.log(`StartBot()`);
}

function StopBot() {
  binance.StopBot();
  win.webContents.send("bot-start-status", false);
  console.log(`StopBot()`);
}

// anything that changes a setting must set this to true, so that it knows settings need auto-saved
let settingsChanged = false;
let settings;

// auto-save settings loop
(async () => {
  while (true) {
    if (settingsChanged) {
      SaveSettings();
    }
    await sleep(1000);
  }
})();

function SaveSettings() {
  fs.writeFileSync(`UserSettings.json`, JSON.stringify(settings, null, 2)); //. extra stringify args are to make it save in human readable instead of crunched
  settingsChanged = false;
  console.log("Settings Saved");
}

function LoadSettings() {
  if (fs.existsSync(`UserSettings.json`)) {
    settings = JSON.parse(fs.readFileSync(`UserSettings.json`));
    win.webContents.send("load-settings", settings);
  }
}

ipcMain.on("settings-changed", (event, data) => {
  console.log("settings-changed");
  settingsChanged = true;
  settings = data;
});

// this is so the app will create an initial UserSettings file upon startup if one does not yet exist, by simply saving the initial default settings of the app
ipcMain.on("send-initial-settings", (event, data) => {
  settings = data;
  if (!fs.existsSync(`UserSettings.json`)) {
    SaveSettings();
    console.log(`created initial starter settings file`);
  }
});

ipcMain.on("api-key-update", (event, data) => {
  binance.setApiKey(data.newValue);
  console.log(`apiKey value changed to: ${binance.apiKey}`);
});

ipcMain.on("api-secret-update", (event, data) => {
  binance.setApiSecret(data.newValue);
  console.log(`apiSecret value changed to: ${binance.apiSecret}`);
});

ipcMain.on(`start-bot`, (event, data) => {
  StartBot();
});

ipcMain.on(`stop-bot`, (event, data) => {
  StopBot();
});

ipcMain.on("asynchronous-message", (event, arg) => {
  console.log(arg);
  event.sender.send("asynchronous-reply", "async pong");
});

ipcMain.on("synchronous-message", (event, arg) => {
  console.log(arg);
  event.returnValue = "sync pong";
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
