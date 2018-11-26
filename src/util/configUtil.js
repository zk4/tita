import { sysConfig } from "../config/system-config";
import db from "../config/dbConfig";
import moment from "moment";
import { message } from "antd";

const storage = window.require("electron-json-storage");
const fs = window.require("fs");
const dp = storage.getDefaultDataPath();
if (!fs.existsSync(dp)) {
  fs.mkdirSync(dp);
}
const userDataFilePath = dp + "/user_config.json";

export function getDefaultResourcePath() {
  return storage.getDefaultDataPath();
}

export function getConfig() {
  let userConfig = {};
  try {
    userConfig = JSON.parse(fs.readFileSync(userDataFilePath, "utf8"));
  } catch (e) {
    console.log(e, "no file");
  }

  return { ...sysConfig, ...userConfig };
}

export function saveConfig(content) {
  fs.writeFile(userDataFilePath, content, err => {
    if (!err) {
      message.info("save successful");
    } else {
      message.info("save failed");
    }
  });
}

export async function getTypes(key = "day") {
  //todo
  if (key === "week") key = "isoWeek";
  let from = moment()
    .startOf(key)
    .valueOf();
  let to = moment()
    .endOf(key)
    .valueOf();
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.all(
        `SELECT  type,sum(duration) as duration FROM  event  where  start>${from} and start<${to} group by type`,
        function(err, row) {
          if (err) {
            return reject(err);
          } else {
            return resolve(row);
          }
        }
      );
    });
  });
}
export async function getTop(key = "day") {
  //todo
  if (key === "week") key = "isoWeek";
  let from = moment()
    .startOf(key)
    .valueOf();
  let to = moment()
    .endOf(key)
    .valueOf();
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.all(
        `SELECT  name,type,sum(duration) as duration FROM  event  where  start>${from} and start<${to} group by name`,
        function(err, row) {
          if (err) {
            return reject(err);
          } else {
            return resolve(row);
          }
        }
      );
    });
  });
}
export async function getStat(key = "day") {
  //todo
  if (key === "week") key = "isoWeek";
  let from = moment()
    .startOf(key)
    .valueOf();
  let to = moment()
    .endOf(key)
    .valueOf();
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.all(
        `SELECT  * FROM event as s where  s.start>${from} and s.start<${to} `,
        function(err, row) {
          if (err) {
            return reject(err);
          } else {
            return resolve(row);
          }
        }
      );
    });
  });
}

let lastContnet = null;
let lastID = null;
export function saveEvent(content) {
  // fs.writeFile(statDataFilePath, content);
  if (content) {
    if (lastContnet) {
   
      if (
        content.name === lastContnet.name &&
        content.target === lastContnet.target &&
        moment(content.start).get("hours") ===
          moment(lastContnet.start).get("hours")
      ) {
        lastContnet.duration += content.duration;
        lastContnet.start = content.start;
        console.log("same",lastID);
        db.run(
          `UPDATE "main"."event" SET "duration" = ${
            lastContnet.duration
          } WHERE rowid = ${lastID}`
        );

        return;
      }
    }
    console.log("hit");
    let sql = "INSERT INTO event VALUES (?,?,?,?,?,?)";
    var stmt = db.prepare(sql);
    stmt.run(
      content.name,
      content.tag,
      content.type,
      content.duration,
      content.start,
      content.target,
      (s, err) => {
        lastID = stmt.lastID;
      }
    );
    stmt.finalize();
    lastContnet = content;
  
  }
  // db.close();
}
