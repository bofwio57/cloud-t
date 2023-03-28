const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "svc.sel3.cloudtype.app",
  user: "root",
  password: "2023",
  connectionLimit: 5,
  database: "memo",
});
module.exports = {
  // 비동기
  async run(query, params) {
    return new Promise((resolve) => {
      pool
        .getConnection()
        .then((conn) => {
          conn
            .query(query, params)
            .then((rows) => {
              resolve(rows);
              conn.end(); // (필수) connection 종료
            })
            .catch((err) => {
              console.log(err);
              conn.end(); // (필수) connection 종료
            });
        })
        .catch((err) => {
          //not connected
        });
    });
  },
};
