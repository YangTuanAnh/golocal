const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

// Initialize the SQLite database
const db = new sqlite3.Database('./golocal.db', (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create database tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        contactInfo TEXT,
        type TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL,
        operatorId INTEGER,
        FOREIGN KEY (operatorId) REFERENCES users (id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        serviceId INTEGER,
        date TEXT,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (serviceId) REFERENCES services (id)
    )`);
});

// Routes
// Create a new user
app.post('/users', (req, res) => {
    const { email, password, name, contactInfo, type } = req.body;
    db.run(
        `INSERT INTO users (email, password, name, contactInfo, type) VALUES (?, ?, ?, ?, ?)`,
        [email, password, name, contactInfo, type],
        function (err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({ id: this.lastID });
            }
        }
    );
});

// Get all users
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

// Create a new service
app.post('/services', (req, res) => {
    const { name, description, price, operatorId } = req.body;
    db.run(
        `INSERT INTO services (name, description, price, operatorId) VALUES (?, ?, ?, ?)`,
        [name, description, price, operatorId],
        function (err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({ id: this.lastID });
            }
        }
    );
});

// Get all services
app.get('/services', (req, res) => {
    db.all(`SELECT * FROM services`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

// Create a booking
app.post('/bookings', (req, res) => {
    const { userId, serviceId, date } = req.body;
    db.run(
        `INSERT INTO bookings (userId, serviceId, date) VALUES (?, ?, ?)`,
        [userId, serviceId, date],
        function (err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({ id: this.lastID });
            }
        }
    );
});

// Get all bookings
app.get('/bookings', (req, res) => {
    db.all(`SELECT * FROM bookings`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
