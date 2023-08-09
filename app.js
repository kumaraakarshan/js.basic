const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node-complete'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// API endpoint to get all users
app.get('/api/get-users', (req, res) => {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users: ' + err.message);
      res.status(500).json({ error: 'An error occurred while fetching users.' });
      return;
    }

    res.json(results); // Send the retrieved users as a JSON response
  });
});

// API endpoint to save form data
app.post('/api/save-data', (req, res) => {
  const { name, email, phone, date, timeForCall } = req.body;

  const sql = 'INSERT INTO user (name, email, phone, date, timeForCall) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, date, timeForCall], (err, result) => {
    if (err) {
      console.error('Error saving data: ' + err.message);
      res.status(500).json({ error: 'An error occurred while saving data.' });
      return;
    }
    res.json({ message: 'Data saved successfully.' });
  });
});

// API endpoint to delete a user by ID
app.delete('/api/delete-user/:id', (req, res) => {
  const userId = req.params.id;

  const sql = 'DELETE FROM user WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user: ' + err.message);
      res.status(500).json({ error: 'An error occurred while deleting user.' });
      return;
    }

    res.json({ message: 'User deleted successfully.' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
