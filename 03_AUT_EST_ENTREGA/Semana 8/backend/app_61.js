
const express = require('express'); 
const app = express();

const hostname = '127.0.0.1';
const port = 3061;
app.use(express.static("../frontend/"));

const sqlite3 = require('sqlite3').verbose(); 
const DBPATH = 'curriculo.db'; 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json());

/* Definição dos endpoints */

/****** CRUD ******************************************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/endereco', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM usuario';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/novoendereco', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql = "INSERT INTO usuario (nome_completo, idade, faculdade, data) VALUES ('" + req.body.nome + "', '" + req.body.age + "', '" + req.body.facul + "', '" + req.body.dt + "')";
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  db.run(sql, [],  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
app.patch('/upendereco', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql = "UPDATE usuario SET nome_completo = '" + req.body.nome + "' WHERE faculdade = '" + req.body.facul +"'";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [],  err => {
      if (err) {
          throw err;
      }
      res.end();
  });
  db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.post('/delregistro', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql = "DELETE FROM usuario WHERE nome_completo = '" + req.body.nome +"'";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [],  err => {
      if (err) {
          throw err;
      }
      res.end();
  });
  db.close(); // Fecha o banco
});


app.post('/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  sql = "INSERT INTO tbUser (title, id, completed) VALUES ('" + req.body.title + "', 33, false)";
  var db = new sqlite3.Database(DBPATH); 
  db.run(sql, [],  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});