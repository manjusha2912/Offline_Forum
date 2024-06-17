const bcrypt = require('bcryptjs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) throw err;
    res.redirect('/login.html');
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0 && bcrypt.compareSync(password, results[0].password)) {
      res.cookie('user_id', results[0].id);
      res.redirect('/dashboard.html');
    } else {
      res.send('Invalid credentials');
    }
  });
});

app.post('/post', (req, res) => {
  const { title, content, allowedUsers } = req.body;
  const userId = req.cookies.user_id;
  const sql = 'INSERT INTO posts (user_id, title, content, allowed_users) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, title, content, allowedUsers], (err, result) => {
    if (err) throw err;
    res.redirect('/dashboard.html');
  });
});

app.get('/posts', (req, res) => {
  const userId = req.cookies.user_id;
  const sql = 'SELECT * FROM posts WHERE FIND_IN_SET(?, allowed_users)';
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
