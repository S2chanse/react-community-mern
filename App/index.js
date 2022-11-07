const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const config = require('./server/config/key');

app.use(express.static(path.join(__dirname, './client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static('./server/image'));

//Controller Mapping 최상단
app.use('/api/post', require('./server/Router/PostRouter'));
app.use('/api/user', require('./server/Router/UserRouter'));
app.use('/api/reple', require('./server/Router/RepleRouter'));
app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.error(`${err}`);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});
/*
  1.post MongoDB 모델
  2.Client css(Bootstrap,Emotion)
*/
