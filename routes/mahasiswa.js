const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',  
  database: 'dbmahasiswa'
});

router.get('/', (req, res) => {
  db.query('SELECT nama, nim, tb_prodi.prodi FROM tb_mahasiswa INNER JOIN tb_prodi ON tb_mahasiswa.id_prodi = tb_prodi.id_prodi', (error, results) => {
    if (error) {
      res.render('index', {
        title: 'aplikasi mahasiswa | unuja',
        error
      });
    } else {
      res.render('index', {
        title: 'aplikasi mahasiswa | unuja',
        data: results
      });
    }
  });
});

router.get('/tambah', (req, res) => {
  db.query('SELECT * FROM tb_prodi', (error, results) => {
    res.render('tambah', {
      title: 'tambah mahasiswa | unuja',
      prodi: results
    });
  });
});

router.post('/tambah', (req, res) => {
  const { nama, nim, prodi } = req.body;
  db.query('INSERT INTO tb_mahasiswa VALUES ("", ?, ?, ?)', [nama, nim, prodi], (error, result) => {
    if (error) {
      res.render('tambah', {
        title: 'tambah data | unuja',
        error
      });
    } else {
      res.redirect(301, '/mahasiswa/');
    }
  });
});

router.get('/edit/:nim', (req, res) => {
  db.query("SELECT tb_mahasiswa.id, nama, nim, tb_prodi.prodi FROM tb_mahasiswa INNER JOIN tb_prodi ON tb_mahasiswa.id_prodi = tb_prodi.id_prodi WHERE nim = ?", [req.params.nim], (error, result) => {
    if (error) {
      res.render('edit', {
        title: 'edit mahasiswa',
        error
      });
    } else {
      db.query('SELECT * FROM tb_prodi', (error, prodi) => {
        res.render('edit', {
          title: 'edit mahasiswa',
          error: null,
          data: result[0],
          prodi
        });
      });
    }
  });
});

router.post('/edit', (req, res) => {
  const { nama, nim, prodi, id } = req.body;
  // return res.json({nama, nim, prodi, id})
  db.query('UPDATE tb_mahasiswa SET nama = ?, nim = ?, id_prodi = ? WHERE id = ?', [nama, nim, prodi, id], (error, result) => {
    if (error) {
      res.redirect('/mahasiswa/edit/' + nim)
    } else {
      res.redirect(301, '/mahasiswa');
    }
  });
});

router.get('/delete/:nim', (req, res) => {
  db.query('DELETE FROM tb_mahasiswa WHERE nim = ?', [req.params.nim], (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/mahasiswa');
    }
  });
});

module.exports = router;