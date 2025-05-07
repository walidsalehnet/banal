const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// إعداد السيرفر
const app = express();
const port = process.env.PORT || 3000;

// تحميل بيانات Firebase
admin.initializeApp({
  credential: admin.credential.cert(require('./firebaseConfig.json'))
});

const db = admin.firestore();

// استخدام body-parser لتفسير البيانات القادمة من الفورمات
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// صفحة البداية
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// إضافة كارت جديد
app.post('/addCard', async (req, res) => {
  const { number, units } = req.body;

  if (!number || !units) {
    return res.send('❌ بيانات غير مكتملة');
  }

  await db.collection('cards').add({
    number: number,
    units: units,
    addedTime: Date.now()
  });

  res.send(`✅ تم إضافة الكارت بنجاح:\n🔢 رقم الكارت: ${number}\n⚡ الوحدات: ${units}`);
});

// عرض المستخدمين
app.get('/users', async (req, res) => {
  const snapshot = await db.collection('users').get();

  if (snapshot.empty) {
    return res.send('❌ لا يوجد مستخدمون');
  }

  let userList = '📌 قائمة المستخدمين:\n';
  snapshot.forEach(doc => {
    const userData = doc.data();
    userList += `👤 ${userData.email} - 💰 ${userData.wallet} جنيه\n`;
  });

  res.send(userList);
});

// بدء السيرفر
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
