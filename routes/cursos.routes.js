const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/database');

// GET Cursos
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM cursos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET Cursos ID
router.get('/:id', (req, res) => {
    mysqlConnection.query(`SELECT * FROM cursos  WHERE  codCurso = ${req.params.id}`, (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// INSERT Curso
router.post('/', (req, res) => {
    try {
        let curso = {
            nombreCurso: req.body.nombreCurso,
            intensidadHoraria: req.body.intensidadHoraria,
            codCurso: req.body.codCurso
        }
        mysqlConnection.query('INSERT INTO cursos SET ?', curso);
        return res.json({ code: 200, info: 'Curso agregado!' });
    } catch (error) {
        return res.json({ code: 300, info: 'Error al agragar curso' });
    }
});

//PUT alumno
router.put('/:id', (req, res) => {
    try {
        let curso = {
            nombreCurso: req.body.nombreCurso,
            intensidadHoraria: req.body.intensidadHoraria,
        }
        mysqlConnection.query(`UPDATE cursos SET ? WHERE codCurso = ${req.params.id}`, curso);
        return res.json({ code: 200, info: 'Curso modificado!!' });
    } catch (error) {
        return res.json({ code: 300, info: 'Error al actualizar Curso' });
    }
});

// DELETE Curso
router.delete('/:id', (req, res) => {
    mysqlConnection.query(`DELETE FROM cursos WHERE codCurso = ${req.params.id}`,  (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Curso eliminado!'});
        } else {
            console.log(err);
        }
    });
});




module.exports = router;