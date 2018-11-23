import { sysConfig } from "../config/system-config";
const storage = window.require("electron-json-storage");
const fs = window.require("fs");
const dp = storage.getDefaultDataPath();
if (!fs.existsSync(dp)) {
  fs.mkdirSync(dp);
}
const userDataFilePath = dp + "/user_config.json";
const statDataFilePath = dp + "/stat.json";

export function getConfig() {
  let userConfig = {};
  try {
    console.log("userDataFilePath", userDataFilePath);
    userConfig = JSON.parse(fs.readFileSync(userDataFilePath, "utf8"));
  } catch (e) {
    console.log(e,"no file");
  }

  return { ...sysConfig, ...userConfig };
}

export function saveConfig(content) {
  // fs.writeFile(userDataFilePath, content);
}

export function getStat() {
  let data = [];
  // try {
  //   data = JSON.parse(fs.readFileSync(statDataFilePath, "utf8"));
  // } catch (e) {
  //   console.log("no file");
  // }

  return data;
}

export function saveStat(content) {
  // fs.writeFile(statDataFilePath, content);
}
