const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/database');

// GET Asignación
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM asignacion', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET Asignación ID
router.get('/:id', (req, res) => {
    mysqlConnection.query(`SELECT * FROM asignacion  WHERE  codAsig = ${req.params.id}`, (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// INSERT Asignación
router.post('/', (req, res) => {
    try {
        let asignacion = {
            codAlumno: req.body.codAlumno,
            codCurso: req.body.codCurso,
            codAsig: req.body.codAsig
        }
        mysqlConnection.query('INSERT INTO asignacion SET ?', asignacion);
        return res.json({ code: 200, info: 'Asignación agregada!' });
    } catch (error) {
        return res.json({ code: 300, info: 'Error al agragar Asignación' });
    }
});

//PUT Asignación
router.put('/:id', (req, res) => {
    try {
        let asignacion = {
            codAlumno: req.body.codAlumno,
            codCurso: req.body.codCurso
        }
        mysqlConnection.query(`UPDATE asignacion SET ? WHERE codAsig = ${req.params.id}`, asignacion);
        return res.json({ code: 200, info: 'Asignación modificada!!' });
    } catch (error) {
        return res.json({ code: 300, info: 'Error al actualizar Asignación' });
    }
});

// DELETE Asignación
router.delete('/:id', (req, res) => {
    mysqlConnection.query(`DELETE FROM asignacion WHERE codAsig = ${req.params.id}`,  (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Asignación eliminada!'});
        } else {
            console.log(err);
        }
    });
});




module.exports = router;