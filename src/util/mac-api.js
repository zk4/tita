
import { getConfig,getType,getTag } from "./configUtil";

let url = window.require("url");

let osascript = window.require("node-osascript");
let config = getConfig();

async function getCurrentProcss() {
  let cmd =
    'tell application "System Events" to get displayed name of application processes whose frontmost is true and visible is true';
  return await runAppleScript(cmd);
}

async function getActiveUrl() {
  let cmd =
    'tell application "Google Chrome" to return URL of active tab of front window';
  return await runAppleScript(cmd);
}

async function getWebName() {
  let cmd = 'tell application "Google Chrome" to return  name  of front window';
  return await runAppleScript(cmd);
}
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
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

let finalTypes={}
let finalTags={}

async function getTypeByName(name) {
  if(isEmpty(finalTypes)){
    let types=await getType() 
    types.forEach(v=>{
       if(finalTypes[v.type_name]===undefined){
         finalTypes[v.type_name]=[]
       }
       finalTypes[v.type_name].push(v.event_name)
     })   
  }

  for (let key of Object.keys(finalTypes)) {
    if (finalTypes[key].indexOf(name) !== -1) return key;
  }

  return "Neutral";
}
async function getTagByName(name) {
  if(isEmpty(finalTags)){
    let tags=await getTag() 
    tags.forEach(v=>{
       if(finalTags[v.tag_name]===undefined){
         finalTags[v.tag_name]=[]
       }
       finalTags[v.tag_name].push(v.event_name)
     })   
  }

  for (let key of Object.keys(finalTags)) {
    if (finalTags[key].indexOf(name) !== -1) return key;
  }
  return "untag";
}

export async function rolling() {
  let processName = (await getCurrentProcss())[0];
  let name = processName;
  let target="";
  // let timeStamp = moment();
  if (processName === "Google Chrome") {
    let oldName=name;
    name = await getActiveUrl();
    name = url.parse(name).hostname;
    if(name===null || name.trim()===""){
      name=oldName;
    }
    target =await getWebName();
  }
  return {
    name,
    target:target,
    tag: await getTagByName(name),
    type: await getTypeByName(name),
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

(async ()=>getCurrentProcss())()