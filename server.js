var express = require('express');

const mysql = require('mysql');

var bodyParser = require('body-parser');

var app = express();


//verifica se o formato do arquivo é JSON
app.use(bodyParser.json());
app.use(function(error, req, res, next) {
	if (error instanceof SyntaxError) {
		res.send('Formato do arquivo inválido\n');
	} else {
		next();
	}
});

// Resposta do servidor
function Resposta(codigo, texto) {
	this.codigo = codigo;
	this.texto = texto;
}

// rota para identificar a requisição
app.post('/cadastroUsuario', function(req, res) {
	console.log('Novo usuario');
	//imprime header e body
	console.log(req.headers);
	console.log(req.body);
	// se o campo do Json tiver algum problema retorna a mensagem
	if (req.body.uid === undefined) {
		var resposta = JSON.stringify(new Resposta('-1', 'JSON UID inválido'));
		console.log(resposta);
		res.send(`${resposta}\n`);
	} else {
		// abre a conexão com o banco
		var connection = mysql.createConnection({
			host: '127.0.0.1',
			user: 'usuariodobanco',
			password: 'senhadobanco',
			database: 'nomedobanco',
			port: 'portadobanco'
		});

		//query a ser executada
		connection.query(`INSERT INTO cad_usuario (uid_usuario) VALUES ('${req.body.uid}');`, function(error, result) {
			connection.end();
			if (!error) {
				//se sucesse retorna o resultado.
				var resposta = JSON.stringify(new Resposta('1', `${result.insertId}`));
				console.log(resposta);
				res.send(`${resposta}\n`);
			} else {
				// se tiver algum problema, retorna o erro.
				var resposta = JSON.stringify(new Resposta('-1', `${error}`));
				console.log(resposta);
				res.send(`${resposta}\n`);
			}
		});
	}
});

// rota para identificar a requisição
app.post('/cadastroEstacionamento', function(req, res) {
	console.log('Novo Estacionamento');
	//imprime header e body
	console.log(req.body);
	console.log(req.headers);
	if (req.body.placeid === undefined) {
		var resposta = JSON.stringify(new Resposta('-1', 'JSON placeid inválido'));
		console.log(resposta);
		res.send(`${resposta}\n`);
	} else {
		var connection = mysql.createConnection({
			host: '127.0.0.1',
			user: 'usuariodobanco',
			password: 'senhadobanco',
			database: 'nomedobanco',
			port: 'portadobanco'
		});
		connection.query(`INSERT INTO cad_estacionamento(placeid_estacionamento) VALUES ('${req.body.placeid}');`, function(error, result) {
					connection.end();
			if (!error) {
				var resposta = JSON.stringify(new Resposta('1', `${result.insertId}`));
				console.log(resposta);
				res.send(`${resposta}\n`);
			} else {
				var resposta = JSON.stringify(new Resposta('-1', `${error}`));
				console.log(resposta);
				res.send(`${resposta}\n`);
			}
		});
	}
});

// rota para identificar a requisição
app.post('/cadastroAvaliacao', function(req, res) {
	console.log('Novo Estacionamento');
	//imprime header e body
	console.log(req.body);
	console.log(req.headers);
	if (req.body.placeid === undefined) {
		var resposta = JSON.stringify(new Resposta('-1', 'JSON placeid inválido'));
		console.log(resposta);
		res.send(`${resposta}\n`);
	} else if (req.body.uid === undefined) {
		var resposta = JSON.stringify(new Resposta('-1', 'JSON uid inválido'));
		console.log(resposta);
		res.send(`${resposta}\n`);
	} else if (req.body.rating === undefined) {
		var resposta = JSON.stringify(new Resposta('-1', 'JSON rating inválido'));
		console.log(resposta);
		res.send(`${resposta}\n`);
	} else if (req.body.comment === undefined) {
		var resposta = JSON.stringify(new Resposta('-1', 'JSON comment inválido'));
		console.log(resposta);
		res.send(`${resposta}\n`);
	}
	else {
		var connection = mysql.createConnection({
			host: '127.0.0.1',
			user: 'usuariodobanco',
			password: 'senhadobanco',
			database: 'nomedobanco',
			port: 'portadobanco'
		});
		connection.query(`INSERT INTO cad_avaliacao(placeid_av, uid_av, rating_av, comment_av) VALUES ('${req.body.placeid}', '${req.body.uid}', '${req.body.rating}', '${req.body.comment}');`, function(error, result) {
					connection.end();
			if (!error) {
				var resposta = JSON.stringify(new Resposta('1', `${result.insertId}`));
				console.log(resposta);
				res.send(`${resposta}\n`);
			} else {
				var resposta = JSON.stringify(new Resposta('-1', `${error}`));
				console.log(resposta);
				res.send(`${resposta}\n`);
			}
		});
	}
});


function RespostaComments(codigo, texto, rating, comment) {
	this.codigo = codigo;
	this.texto = texto;
	this.rating = rating;
	this.comment = comment;
}

// rota para identificar a requisição
app.post('/consultarComments', function(req, res) {
	console.log('Consultar Comentários');
	//imprime header e body
	console.log(req.body);
	console.log(req.headers);
	if (req.body.placeid === undefined) {
		var resposta = JSON.stringify(new Resposta('-1', 'JSON placeid inválido'));
		res.send(`${resposta}\n`);
	} else {
		var connection = mysql.createConnection({
			host: '127.0.0.1',
			user: 'usuariodobanco',
			password: 'senhadobanco',
			database: 'nomedobanco',
			port: 'portadobanco'
		});
		connection.query(`
			SELECT rating_av,
			       comment_av
			FROM cad_avaliacao
			WHERE placeid_av = ${req.body.placeid};`, function(error, result) {
			connection.end();
			if (!error) {
				if (result.length === 0) {
					var resposta = JSON.stringify(new Resposta('0', 'Nenhum comentário foi encontrado.'));
					console.log(resposta);
					res.send(`${resposta}\n`);
				} else {
					var resposta = [];
					for (var i = 0, len = result.length; i < len; i++) {
						resposta.push((new RespostaComments('1', `${result[i].rating_av}`, `${result[i].comment_av}`)));
					}
					console.log(`{"comentarios" :${JSON.stringify(resposta)}}`);
					res.send(`{"comentarios" :${JSON.stringify(resposta)}}\n`);
				}
			} else {
				var resposta = JSON.stringify(new Resposta('-1', `${error}`));
				console.log(resposta);
				res.send(`${resposta}\n`);
			}
		});
	}
});


// identificação da porta.
app.listen(5157, function() {
	console.log('Servidor rodando na porta: 5157')
});
