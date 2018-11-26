const storage = window.require("electron-json-storage");
var sqlite3 = window.require("sqlite3").verbose();
const dp = storage.getDefaultDataPath();
console.log("dp()", dp);
var db = new sqlite3.Database(dp + "/sqlite00000.stat");

db.serialize(function() {
  try {
    db.run(`CREATE TABLE stat 
                (name TEXT,
                 tag TEXT,
                 type TEXT,
                 duration INT,
                 start DATETIME)`);
  } catch (e) {
    console.log(e)
  }
});

// db.close();
export default db;
