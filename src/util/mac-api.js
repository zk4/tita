import moment from "moment";
import { getConfig } from "./configUtil";

let url = window.require("url");

let osascript = window.require("node-osascript");
let config = getConfig();

async function getCurrentProcss() {
  let cmd =
    'tell application "System Events" to get name of application processes whose frontmost is true and visible is true';
  return await runAppleScript(cmd);
}

async function getActiveUrl() {
  let cmd =
    'tell application "Google Chrome" to return URL of active tab of front window';
  return await runAppleScript(cmd);
}

// async function getWebName() {
//   let cmd = 'tell application "Google Chrome" to return  name  of front window';
//   return await runAppleScript(cmd);
// }
// async function getActiveNameAndUrl() {
//   let url = await getActiveUrl();
//   let name = await getWebName();
//   return { name, url };
// }

function runAppleScript(script) {
  return new Promise((resolve, reject) => {
    osascript.execute(script, function(err, result, raw) {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
}
function getType(name) {
  if (config.typeNameMaps.productive.indexOf(name) !== -1) {
    return "Productive";
  }

  if (config.typeNameMaps.distracting.indexOf(name) !== -1) {
    return "Distracting";
  }

  return "Neutral";
}
function getCategory(name) {
  for (let key of Object.keys(config.categoryNameMaps)) {
    if (config.categoryNameMaps[key].indexOf(name) !== -1) return key;
  }
  return "uncategory";
}
export async function rolling() {
  let processName = (await getCurrentProcss())[0];
  let name = processName;
  // let timeStamp = moment();
  if (processName === "Google Chrome") {
    name = await getActiveUrl();
    name = url.parse(name).hostname;
  }
  return {
    name,
    category: getCategory(name),
    type: getType(name),
    start: Date.now(),
    duration: config.intervalSec
  };
}

// demo
// (async () => {
//   setInterval(async () => {
//     console.log(await rolling());
//   }, 2000);
// })();
