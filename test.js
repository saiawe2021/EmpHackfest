
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/test.db');
var sql = "select * from users";
db.get(sql, [], (err, row) => {
    if (err) {
        return console.error(err.message);
      }
      return row
        ? console.log(row.username, row.password)
        : console.log(`Nobody found`);
});