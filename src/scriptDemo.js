let url = require("url");

let osascript = require("node-osascript");

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
async function getCurrentProcss() {
  let cmd =
    'tell application "System Events" to get displayed name of application processes whose frontmost is true and visible is true';
  return await runAppleScript(cmd);
}



getCurrentProcss().then((data)=>{
 console.log(data)   
});

