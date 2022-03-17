const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/database');

// GET Alumnos
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM alumnos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET Alumno ID
router.get('/:id', (req, res) => {
    mysqlConnection.query(`SELECT * FROM alumnos  WHERE  codAlum = ${req.params.id}`, (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// INSERT Alumno
router.post('/', (req, res) => {
    try {
        let alumno = {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            password: req.body.password,
            codAlum: req.body.codAlum
        }
        mysqlConnection.query('INSERT INTO alumnos SET ?', alumno);
        return res.json({ code: 200, info: 'Alumno agregado!' });
    } catch (error) {
        return res.json({ code: 300, info: 'Error al agragar alumno' });
    }
});

//PUT alumno
router.put('/:id', (req, res) => {
    try {
        let alumno = {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            password: req.body.password
        }
        mysqlConnection.query(`UPDATE alumnos SET ? WHERE codAlum = ${req.params.id}`, alumno);
        return res.json({ code: 200, info: 'Alumno modificado!!' });
    } catch (error) {
        return res.json({ code: 300, info: 'Error al actualizar Alumno' });
    }
});

// DELETE Alumno
router.delete('/:id', (req, res) => {
    mysqlConnection.query(`DELETE FROM alumnos WHERE codAlum = ${req.params.id}`,  (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Alumno eliminado!'});
        } else {
            console.log(err);
        }
    });
});




module.exports = router;