let express = require("express"),
    morgan = require('morgan'),
    cors = require("cors"),
    compression = require("compression"),
    bodyParser = require("body-parser");


//import routes
const alumno = require("../Backend/routes/alumnos.routes");
const curso = require("../Backend/routes/cursos.routes");
const asignacion = require("../Backend/routes/asignacion.routes");
const app = express();


//MIDELWARES
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

//Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//RUTAS
app.use('/api/alumnos', alumno);
app.use('/api/cursos', curso);
app.use('/api/asignacion', asignacion);


//PUERTO
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
    console.log('Server started on port: ' + app.get('puerto'));
});
