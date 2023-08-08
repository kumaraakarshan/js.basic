const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));



// API endpoint to save form data
app.get('/api/get-users', async (req, res) => {
    try {
      const connection = await db.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM user');
      connection.release(); // Release the connection back to the pool
      
      res.json(rows); // Send the retrieved users as a JSON response
    } catch (err) {
      console.error('Error fetching users: ' + err.message);
      res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
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
  
app.post('/api/save-data', (req, res) => {
  const { name, email, phone, date, timeForCall } = req.body;
console.log(date);

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

app.listen(3000)
