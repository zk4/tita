import { sysConfig } from "../config/system-config";
import db from "../dbConfig";
import moment from 'moment';
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
    console.log(e, "no file");
  }

  return { ...sysConfig, ...userConfig };
}

export function saveConfig(content) {
  fs.writeFile(userDataFilePath, content);
}

export async function getStat() {
  let data = [];
  let from=moment("11/24/2018 02:00", "M/D/YYYY HH:mm").valueOf()
  let to=moment("11/24/2018 02:03", "M/D/YYYY HH:mm").valueOf()
  db.serialize(function() {

    db.all(`SELECT  * FROM stat as s where  s.start>${from} and s.start<${to} `, function(err, row) {
      console.log("getStat---",row);
    });
  });
  return data;
}

export function saveStat(content) {
  // fs.writeFile(statDataFilePath, content);

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

  // db.close();
}
