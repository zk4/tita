var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./sqlite3.stat3");
 
db.serialize(function() {
  db.run(`CREATE TABLE stat 
            (name TEXT,
             category TEXT,
             type TEXT,
             duration INT,
             start DATETIME)`);

  var stmt = db.prepare("INSERT INTO stat VALUES (?,?,?,?,?)");
  for (var i = 0; i < 1; i++) {
    stmt.run("hello", "world", "cate", "type", Date.now());
  }
  stmt.finalize();

  db.each("SELECT  * FROM stat as s ", function(err, row) {
    console.log(row);
  });
});

db.close();
