// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 3000;

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_calificaciones',
});


db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

app.use(bodyParser.json());

// Rutas para las operaciones CRUD de usuarios
app.get('/api/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            res.status(500).json({ error: 'Error al obtener los usuarios' });
            return;
        }
        res.json(result);
    });
});

app.post('/api/usuarios', (req, res) => {
    const { nombre, apellido, cedula, contrasena } = req.body;
    const query = 'INSERT INTO usuarios (nombre, apellido, cedula, contrasena) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, apellido, cedula, contrasena], (err, result) => {
        if (err) {
            console.error('Error al agregar el usuario:', err);
            res.status(500).json({ error: 'Error al agregar el usuario' });
            return;
        }
        res.json({ id: result.insertId, nombre, apellido, cedula });
    });
});

// Agregar rutas para actualizar y eliminar usuarios

app.post('/api/login', (req, res) => {
    const { cedula, contrasena } = req.body;
    const query = 'SELECT * FROM usuarios WHERE cedula = ? AND contrasena = ?';
    db.query(query, [cedula, contrasena], (err, result) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).json({ error: 'Error al obtener el usuario' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(result[0]);
    });
});

// Rutas para las operaciones CRUD de cursos
app.get('/api/cursos/:id', (req, res) => {
    const query = 'SELECT * FROM cursos WHERE profesor_id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error al obtener los cursos:', err);
            res.status(500).json({ error: 'Error al obtener los cursos' });
            return;
        }
        res.json(result);
    })
});


app.post('/api/cursos', (req, res) => {
    const { facultad, carrera, asignatura, periodo, nivel, paralelo, profesor_id } = req.body;
    const query = 'INSERT INTO cursos (facultad, carrera, asignatura, periodo, nivel, paralelo, profesor_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [facultad, carrera, asignatura, periodo, nivel, paralelo, profesor_id], (err, result) => {
        if (err) {
            console.error('Error al agregar el curso:', err);
            res.status(500).json({ error: 'Error al agregar el curso' });
            return;
        }
        res.json({ id: result.insertId, facultad, carrera, asignatura, periodo, nivel, paralelo, profesor_id });
    });
});

// Agregar rutas para consultar estudiantes por curso
app.get('/api/notas/:id', (req, res) => {
    const query = 'SELECT * FROM estudiantes WHERE curso_id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error al obtener los estudiantes:', err);
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
            return;
        }
        res.json(result);
    });
})

app.post('/api/notas', (req, res) => {
    const { cedula, nombres, nota1, nota2, nota3, recuperacion, curso_id} = req.body;
    const query = 'INSERT INTO estudiantes (cedula, nombres, nota1, nota2, nota3, recuperacion, curso_id) VALUE (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [cedula, nombres, nota1, nota2, nota3, recuperacion, curso_id], (err, result) => {
        if (err) {
            console.error('Error al agregar la nota:', err);
            res.status(500).json({ error: 'Error al agregar la nota' });
            return;
        }
        res.json({ id: result.insertId, cedula, nombres, nota1, nota2, nota3, recuperacion, curso_id });
    }
    );
});


app.use(cors());

app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en http://localhost:${port}`);
});
