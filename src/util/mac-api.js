let exec = window.require("child_process").exec;
let osascript = window.require("node-osascript");


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
  let webTitleCmd =
    'tell application "Google Chrome" to return  name  of front window';
  let url = await getActiveUrl();
  let webTitle = await runAppleScript(webTitleCmd);
  return {webTitle, url};
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

export async function rolling() {
  let current_process = (await getCurrentProcss())[0];
  let timeStamp=new Date()
  if (current_process === "Google Chrome") {
    return {"processName":current_process,...await getActiveNameAndUrl(),timeStamp}
  } else {
    return{"processName":current_process,timeStamp}
  }
}


// demo 
// (async () => {
//   setInterval(async () => {
//     console.log( await rolling());      
//   }, 2000);

// })();
