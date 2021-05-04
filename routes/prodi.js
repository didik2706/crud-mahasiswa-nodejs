const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'dbmahasiswa'
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM tb_prodi', (error, result) => {
    if (error) {
      res.render('prodi', {
        title: 'halaman prodi',
        error: null
      });
    } 
    
    res.render('prodi', {
      title: 'halaman prodi',
      data: result,
      error: null
    });
    
  })
});

router.post('/tambah', (req, res) => {
  const prodi = req.body.prodi;
  const id_prodi = 'PRD' + Date.now();
  db.query("INSERT INTO tb_prodi VALUES ('', ?, ?)", [id_prodi, prodi], (error, result) => {
    if (error) {
      res.render('prodi', {
        title: 'halaman prodi',
        error
      });
    } else {
      res.redirect(301, '/prodi');
    }
  });
})

module.exports = router;