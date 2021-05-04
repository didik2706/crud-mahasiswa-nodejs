const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/mahasiswa', require('./routes/mahasiswa'));
app.use('/prodi', require('./routes/prodi'));

app.listen(3000, () => console.log('Server running at port 3000'));

