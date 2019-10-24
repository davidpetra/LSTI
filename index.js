// Tugas 3 LSTI
// David Petra Natanael - 18217011


const express = require('express')
const app = express()

var pgp = require('pg-promise')()
var dbPromise = pgp('postgres://lasti@103.122.5.98:51751/lastidb')


function getPegawai(callback){
    dbPromise.any('SELECT * FROM pegawai')
        .then(data => {
            callback(null, data)
        })
        .catch(err => {
            callback(err)
        })
}


function getPegawaiByID(callback, id){
    dbPromise.any('SELECT * FROM pegawai WHERE id = $1', id)
        .then(data => {
            callback(null, data)
        })
        .catch(err => {
            callback(err)
        })
}



app.route('/pegawai')
    .get(function (req, res) {
        getPegawai(function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
        })
    })
    .post(function (req, res) {
        tambahPegawai = {
            nama: req.query.nama,
            alamat: req.query.alamat,
            kontak: req.query.kontak,
            email: req.query.email,
            jabatan: req.query.jabatan,
            gaji: req.query.gaji,
            status: req.query.status
        }
        dbPromise.any('INSERT INTO PEGAWAI(nama, alamat, kontak, email, jabatan, gaji, status) VALUES(${nama},${alamat},${kontak},${email},${jabatan},${gaji},${status})', tambahPegawai)
            .then(function() {
                res.send()
                console.log("Success")
            })
            .catch(function(err) {
                res.send(err)
            })
    })


app.get('/pegawai/:id', function (req, res) {
    getPegawaiByID(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    }, req.params.id)
})



app.listen(8000)