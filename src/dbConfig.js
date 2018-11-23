var sqlite3 = window.require("sqlite3").verbose();
var db = new sqlite3.Database("./sqlite00000.stat");

db.serialize(function() {
  db.run(`CREATE TABLE stat 
                (name TEXT,
                 category TEXT,
                 type TEXT,
                 duration INT,
                 start DATETIME)`);
});

// db.close();
export default db;
