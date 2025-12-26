const express = require('express');
const app = express();
const PORT = 3000;
app.listen(port,()=>console.log(`server is running on port ${port}`))
// Middleware لقراءة JSON
app.use(express.json());

// مصفوفة مؤقتة للبيانات (بدل قاعدة بيانات)
let users = [
  { id: 1, name: 'أحمد', email: 'ahmed@example.com' },
  { id: 2, name: 'محمد', email: 'mohamed@example.com' }
];