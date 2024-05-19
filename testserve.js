const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Chananon:Chananon49@cluster0.antvl0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const Message = mongoose.model('Message', {
  text: String
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const message = new Message({
    text: req.body.message
  });

  message.save()
    .then(() => {
      res.send('บันทึกข้อความเรียบร้อยแล้ว!');
    })
    .catch(err => {
      res.status(400).send('ไม่สามารถบันทึกข้อความได้: ' + err);
    });
});

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:${port}`);
});
