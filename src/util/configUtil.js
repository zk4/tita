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

export async function getTag() {
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.all(
        `SELECT
         * from tag`,
        function(err, row) {
          if (err) {
            return reject(err);
          } else {
            console.log(row);
            return resolve(row);
          }
        }
      );
    });
  });
}
export async function getType() {
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.all(
        `SELECT
         * from type`,
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
export async function getCircleData(key = "day") {
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
        `SELECT
        s.name AS name,
        IFNULL(c.type_name,'Neutral') AS type ,
        sum(s.duration) AS duration 
    
    FROM
        event AS s
        LEFT JOIN type AS c ON s.name == c.event_name 
         
    
    WHERE
        s.start > ${from} 
        AND s.start < ${to}
    group by type`,
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
export async function getTopData(key = "day") {
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
        `SELECT
        s.name AS name,
        IFNULL(c.type_name,'Neutral') AS type ,
        sum(s.duration) AS duration 
    
    FROM
        event AS s
        LEFT JOIN type AS c ON s.name == c.event_name 
    WHERE
        s.start > ${from} 
        AND s.start < ${to}
    group by name`,
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
export async function getBarData(key = "day") {
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
        `
        SELECT
            s.name AS name,
            s.start AS start,
            s.target AS target,
            IFNULL(c.type_name,'Neutral') AS type ,
            s.duration AS duration ,
            IFNULL(t.tag_name , 'untag') as tag 
        FROM
            event AS s
            LEFT JOIN type AS c ON s.name == c.event_name 
            left join tag as t  on t.event_name == c.event_name
        
        WHERE
            s.start > ${from} 
            AND s.start < ${to}`,
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

export function getLastContent() {
  return lastContnet;
}
export function saveEvent(content) {
  if (content) {
    if (
      lastContnet &&
      content.name === lastContnet.name &&
      content.target === lastContnet.target &&
      moment(content.start).get("hours") ===
        moment(lastContnet.start).get("hours")
    ) {
      lastContnet.duration += content.duration;
      lastContnet.start = content.start;

      db.run(
        `UPDATE "main"."event" SET "duration" = ${
          lastContnet.duration
        } WHERE rowid = ${lastID}`,
        (a, b) => {
          console.log(a, b);
        }
      );
    } else {
      let sql = "INSERT INTO event VALUES (?,?,?,?)";
      var stmt = db.prepare(sql);
      content.duration = 1;
      stmt.run(
        content.name,
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
  }
  // db.close();
}
