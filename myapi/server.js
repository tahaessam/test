const express = require('express');
const app = express();
const port = 5000;
app.listen(port,()=>console.log(`server is running on port ${port}`))

// Middleware لقراءة JSON
app.use(express.json());
// قاعدة بيانات مؤقتة (Array)
let users = [
  { id: 1, name: 'أحمد', email: 'ahmed@example.com', age: 25 },
  { id: 2, name: 'محمد', email: 'mohamed@example.com', age: 30 },
  { id: 3, name: 'فاطمة', email: 'fatma@example.com', age: 22 }
];



// ========== GET /users - finds all users ==========
app.get('/users', (req, res) => {
  res.json({ success: true, data: users });
});


// ========== POST /users - creates a user ==========
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);
//   res.status(201).json({ success: true, data: newUser });
});
// ========== GET /users/:id - finds user details ==========
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (user) {
    res.json({ success: true, data: user });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});


