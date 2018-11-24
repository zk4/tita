import { sysConfig } from "../config/system-config";
import db from "../dbConfig";
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

export async function getTypes() {
  //todo
  let from = moment("11/24/2018 00:00", "M/D/YYYY HH:mm").valueOf();
  let to = moment("11/25/2018 00:00", "M/D/YYYY HH:mm").valueOf();
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.all(
        `SELECT  type,sum(duration) as duration FROM  stat  where  start>${from} and start<${to} group by type`,
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
export async function getTop() {
  //todo
  let from = moment("11/24/2018 00:00", "M/D/YYYY HH:mm").valueOf();
  let to = moment("11/25/2018 00:00", "M/D/YYYY HH:mm").valueOf();
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.all(
        `SELECT  name,type,sum(duration) as duration FROM  stat  where  start>${from} and start<${to} group by name`,
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
export async function getStat() {
  //todo
  let from = moment("11/24/2018 00:00", "M/D/YYYY HH:mm").valueOf();
  let to = moment("11/25/2018 00:00", "M/D/YYYY HH:mm").valueOf();
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.all(
        `SELECT  * FROM stat as s where  s.start>${from} and s.start<${to} `,
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

export function saveStat(content) {
  // fs.writeFile(statDataFilePath, content);
  if (content) {
    db.serialize(function() {
      var stmt = db.prepare("INSERT INTO stat VALUES (?,?,?,?,?)");

      stmt.run(
        content.name,
        content.category,
        content.type,
        content.duration,
        content.start
      );
      stmt.finalize();

      // db.each("SELECT  * FROM stat as s ", function(err, row) {
      //   console.log(row);
      // });
    });
  }
  // db.close();
}

