const storage = window.require("electron-json-storage");
const fs = window.require("fs");
const dp = storage.getDefaultDataPath();
if (!fs.existsSync(dp)) {
  fs.mkdirSync(dp);
}
const statDataFilePath = dp + "/stat.json";

export function addEvent(e) {
  console.log("addvent", e);
  // fs.writeFile(statDataFilePath, e);
}

export function getAllEvent() {}
return { addEvent, getAllEvent };
