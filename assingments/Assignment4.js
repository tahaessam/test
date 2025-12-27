const express = require('express');
const fs = require('fs');
const port = 5000;
const app = express();
app.use(express.json());

// Q1
app.post('/user', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const { name, email, age } = req.body;

  if (!name || !email || !age) return res.status(400).json({ success: false });
  if (users.find(u => u.email === email))
    return res.status(409).json({ success: false });

  users.push({
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    age
  });

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  res.json({ success: true });
});

// Q2
app.patch('/user/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const user = users.find(u => u.id == req.params.id);

  if (!user) return res.status(404).json({ success: false });

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.age) user.age = req.body.age;

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  res.json({ success: true });
});

// Q3
app.delete('/user/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const id = req.params.id;
  const index = users.findIndex(u => u.id == id);

  if (index === -1) return res.status(404).json({ success: false });

  users.splice(index, 1);
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  res.json({ success: true });
});

// Q3 
app.delete('/user', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const id = req.body.id;
  const index = users.findIndex(u => u.id == id);

  if (index === -1) return res.status(404).json({ success: false });

  users.splice(index, 1);
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  res.json({ success: true });
});

// Q4
app.get('/user/getByName', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const name = req.query.name;

  const result = users.filter(u => u.name === name);
  res.json(result);
});

// Q5
app.get('/user', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  res.json(users);
});

// Q6
app.get('/user/filter', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const minAge = req.query.minAge;

  const result = users.filter(u => u.age >= minAge);
  res.json(result);
});

// Q7
app.get('/user/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const user = users.find(u => u.id == req.params.id);

  if (!user) return res.status(404).json({ success: false });
  res.json(user);
});

app.listen(5000);
console.log('Server is running on port 5000');
