const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'dbUser.db';

const hostname = '127.0.0.1';
const port = 3061;
const app = express();

/* Servidor aplicação */

app.use(express.static("../frontend/"));


/* Definição dos endpoints */

/******** CRUD ************/



// Retorna todos registros (é o R do CRUD - Read)
app.get('/alunos', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM tbAluno ORDER BY nome COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


app.post('/newAluno', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	let nome = req.body.nome
	let idade = req.body.age
	let turma = req.body.class
	let nota_1 = req.body.grade1
	let nota_2 = req.body.grade2
	var db = new sqlite3.Database(DBPATH)
	sql = "INSERT INTO tbAluno (nome, idade, turma, nota_1, nota_2) VALUES ('" + req.body.nome + "', '" + req.body.age + "', '" + req.body.class + "', '" + req.body.grade1 + "', '" + req.body.grade2 + "')";
    db.run(sql);
    res.end()
});

// // Insere um registro (é o C do CRUD - Create)
// app.post('/userinsert', urlencodedParser, (req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// 	sql = "INSERT INTO tbUser (title, id, completed) VALUES ('" + req.body.title + "', 33, false)";
// 	var db = new sqlite3.Database(DBPATH); // Abre o banco
// 	db.run(sql, [],  err => {
// 		if (err) {
// 		    throw err;
// 		}
// 	});
// 	db.close(); // Fecha o banco
// 	res.end();
// });

// // Atualiza um registro (é o U do CRUD - Update)
// app.post('/userupdate', urlencodedParser, (req, res) => {
// 	res.statusCode = 200;
// 	//res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// 	sql = "UPDATE tbUser SET title = '" + req.body.title + "' WHERE userId = " + req.body.userId;
// 	var db = new sqlite3.Database(DBPATH); // Abre o banco
// 	db.run(sql, [],  err => {
// 		if (err) {
// 		    throw err;
// 		}
// 		res.end();
// 	});
// 	db.close(); // Fecha o banco
// });

// // Exclui um registro (é o D do CRUD - Delete)
// app.post('/userdelete', urlencodedParser, (req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// 	sql = "DELETE FROM tbUser WHERE userId = " + req.body.userId;
// 	var db = new sqlite3.Database(DBPATH); // Abre o banco
// 	db.run(sql, [],  err => {
// 		if (err) {
// 		    throw err;
// 		}
// 		res.end();
// 	});
// 	db.close(); // Fecha o banco
// });

app.listen(port, hostname, () => {
  console.log(`Page server running at http://${hostname}:${port}/`);
});