const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
});

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 780 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.on("minimize", function(e) {
    //   <---- Catch close event

    // The dialog box below will open, instead of your app closing.
    // require("dialog").showMessageBox({
    //   message: "Close button has been pressed!",
    //   buttons: ["OK"]
    // });
    mainWindow.webContents.send("ipc", "minimize");
  });
  mainWindow.on("move", e => {
    mainWindow.webContents.send("ipc", "move");
  });
  mainWindow.on("focus", e => {
    mainWindow.webContents.send("ipc", "focus");
  });
  mainWindow.on("blur", e => {
    mainWindow.webContents.send("ipc", "blur");
  });
  mainWindow.on("maximize", e => {
    mainWindow.webContents.send("ipc", "maximize");
  });
  mainWindow.on("restore", e => {
    mainWindow.webContents.send("ipc", "restore");
  });
  mainWindow.on("before-quit", function(e) {
    // Handle menu-item or keyboard shortcut quit here
    if (!force_quit) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
