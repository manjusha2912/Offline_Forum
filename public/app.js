const express = require('express');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'SQL_Entry2003',
  database: 'offline_forum'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database');
});

app.post('/post', (req, res) => {
  const { title, content, allowedUsers } = req.body;
  const userId = req.cookies.user_id;
  const sql = 'INSERT INTO posts (user_id, title, content, allowed_users) VALUES (?, ?, ?, ?)';
  connection.query(sql, [userId, title, content, allowedUsers], (err, result) => {
    if (err) {
      console.error('Error inserting post:', err.message);
      return res.status(500).send('Error inserting post');
    }
    res.redirect('/dashboard.html');
  });
});

app.get('/posts', (req, res) => {
  const userId = req.cookies.user_id;
  const sql = 'SELECT * FROM posts WHERE FIND_IN_SET(?, allowed_users)';
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving posts:', err.message);
      return res.status(500).send('Error retrieving posts');
    }
    res.json(results);
  });
});

app.post('/publish', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }
  connection.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, result) => {
    if (err) {
      console.error('Error publishing post:', err.message);
      return res.status(500).send('Error publishing post');
    }
    console.log('Post published successfully');
    res.status(200).send('Post published successfully');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
