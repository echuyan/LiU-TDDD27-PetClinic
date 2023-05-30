var sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const DBSOURCE = "db.sqlite";
const fillsql = fs.readFileSync("./server/DB.sql").toString();
const dataArr = fillsql.toString().split(");");

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("connected to database");
  }
});

db.serialize(() => {
  db.run("PRAGMA foreign_keys=OFF;");
  db.run("BEGIN TRANSACTION;");
  // Loop through the `dataArr` and db.run each query
  dataArr.forEach((query) => {
    query += ");";
    if (query[2] !== ";") {
      db.run(query, (err) => {
        if (err) console.log("err: " + err);
      });
    }
  });
  db.run("COMMIT;");
});

db.allAsync = function (sql, params) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.all(sql, params, function (error, rows) {
      if (error) reject(error);
      else resolve([...rows]);
    });
  });
};

db.getAsync = function (sql, params) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.get(sql, params, function (error, row) {
      if (error) reject(error);
      else resolve(row);
    });
  });
};

db.runAsync = function (sql, params) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.run(sql, params, function (error) {
      if (error) reject(error);
      else resolve(this);
    });
  });
};

db.insertAsync = function (sql, email, password) {
  db.serialize(() => {
    return db.run(sql, [email, password], (err) => {
      if (err) {
        return console.log(err.message);
      }
    });
  });
};

module.exports = db;
