const storage = window.require("electron-json-storage");
var sqlite3 = window.require("sqlite3").verbose();
const dp = storage.getDefaultDataPath();
console.log("dp()", dp);
var db = new sqlite3.Database(dp + "/sqlite00000.stat");

db.serialize(function() {
  try {
    db.run(`CREATE TABLE event 
                (name TEXT NOT NULL,
                 target TEXT ,
                 duration INT NOT NULL,
                 start DATETIME NOT NULL )`);
    db.run(`CREATE TABLE "type" (
                  "type_name" TEXT NOT NULL,
                  "event_name" TEXT NOT NULL,
                  PRIMARY KEY ("type_name", "event_name")
                )`);

    db.run(`CREATE TABLE "tag" (
                  "tag_name" TEXT NOT NULL,
                  "event_name" TEXT NOT NULL,
                  PRIMARY KEY ("tag_name", "event_name")
                )`);
  } catch (e) {
    console.log(e);
  }
});

// db.close();
export default db;
