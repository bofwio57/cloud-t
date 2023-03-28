const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const database = require("./database");

app.use(bodyParser.json());
app.use(express.static("dist"));

//데이터를 가져옴
app.get("/api/memos", async (req, res) => {
  //비동기 메소드라 await 붙임
  //모든 데이터를 가져옴
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
});

//데이터 등록
app.post("/api/memos", async (req, res) => {
  await database.run(`INSERT INTO memos (content) VALUES (?)`, [
    req.body.content,
  ]);
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
});

//데이터 수정(업데이트)
app.put("/api/memos/:id", async (req, res) => {
  await database.run(`UPDATE memos SET content = ? WHERE id = ?`, [
    req.body.content,
    req.params.id,
  ]);
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
