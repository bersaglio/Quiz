// Modelos ORM
var path = require('path');


var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;


var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(DB_name, user, pwd, 
                       {dialect: protocol,
                       protocol: protocol,
                       port: port,
                       host: host,
                       storage: storage,
                       omitNull: true
                     }
                    );

// Importar la definicion de la clase Quiz desde quiz.js
var quiz_pth = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(path.join(__dirname,'quiz'));


var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;


// sequelize.sync() crea las tablas de datos definidas en el modelo
sequelize.sync().then(function() {
  // success(..) ejecuta el manejador una vez creadas las tabas de la DB
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({ pregunta: '¿Cual es la capital de Italia?',
      	            respuesta: 'Roma'
      	         });
      Quiz.create({ pregunta: '¿Cuántas manos tiene un caballo?',
                    respuesta: 'Dos'
                 });
      Quiz.create({ pregunta: '¿Qué instrumento musical tiene nombre y forma geométricos?',
                    respuesta: 'Triángulo'
                 });
      Quiz.create({ pregunta: '¿Cuáles son las dos primeras palabras de la Biblia?',
                    respuesta: 'Al principio'
                 });
      Quiz.create({ pregunta: '¿Quién escribió "El Diario de Ana Frank"?',
                    respuesta: 'Ana Frank'
                 });
      Quiz.create({ pregunta: '¿Cómo se llaman las crías de la mula?',
                    respuesta: 'No tiene'
                 });
      Quiz.create({ pregunta: '¿Qué isla del Caribe tiene nombre de flor?',
                    respuesta: 'Margarita'
                 });
      Quiz.create({ pregunta: '¿Con qué nombre firmaba Pablo Picasso sus Pinturas?',
                    respuesta: 'Picasso'
                 });
      Quiz.create({ pregunta: '¿Cuál es el fruto del roble?',
                    respuesta: 'Bellota'
                 });
      Quiz.create({ pregunta: '¿En que provincia se encuentra el lago mas grande de origen gracial?',
                    respuesta: 'Zamora'
                 });
      Quiz.create({ pregunta: '¿Cual es la capital de Portugal?',
                    respuesta: 'Lisboa'
                 })
       
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});