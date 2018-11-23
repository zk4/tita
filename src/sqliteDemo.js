var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./sqlite3.stat3');

/*
 name,
    processName,
    subTask   : [],
    category  : getCategory(name),
    type      : getType(name),
    start     : timeStamp.format(),
    timeFormat: {
      day  : timeStamp.format("H"),
      week : timeStamp.format("d"),
      month: timeStamp.format("DD"),
      year : timeStamp.format("M"),
    },
    duration: config.intervalSec
*/
db.serialize(function() {
//   db.run(`CREATE TABLE stat 
//             (start DATETIME PRIMARY KEY    NOT NULL,
//              name TEXT,
//              processName TEXT,
//              category TEXT,
//              type TEXT,
//              duration INT)`);

  var stmt = db.prepare("INSERT INTO stat VALUES (?,?,?,?,?,?)");
  for (var i = 0; i < 1; i++) {
      stmt.run(Date.now(),"hello","world","cate","type",3);
  }
  stmt.finalize();

  db.each("SELECT  strftime(%s, s.start) FROM stat as s ", function(err, row) {
    //   console.log(row.id + ": " + row.info);

    console.log(row);

  });
});

db.close();