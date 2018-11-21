let exec = window.require("child_process").exec;
let osascript = window.require("node-osascript");

// export class Api {
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

async function getActiveNameAndUrl() {
  let cmd_name =
    'tell application "Google Chrome" to return  name  of front window';
  let url = await getActiveUrl();
  let name = await runAppleScript(cmd_name);
  return [name, url];
}

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
// }
export async function rolling() {
  let current_process = (await getCurrentProcss())[0];

  if (current_process === "Google Chrome") {
    return [current_process,await getActiveUrl()]
  } else {
    return [current_process,""]
  }
}


// demo 
// (async () => {
//   setInterval(async () => {
//     console.log( await rolling());      
//   }, 2000);

// })();
