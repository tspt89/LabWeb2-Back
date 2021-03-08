const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const mysqlConnection = require('../database');

const app = express();


router.get('/', (req,res) => {
    console.log(req.body);
    
    mysqlConnection.query('SELECT * FROM employees',(err,rows,fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.post('/addusuario/', (req,res) =>{
    //INSERT INTO usuario VALUES (NULL, _name, _correo, _passwd, _rfc, _domicilio, _dept, _tel, _isActive, _userType);
    console.log(req.body);
    const query = 'INSERT INTO usuario VALUES (NULL,?,?,?,?,?,?,?,1,?);';
    const {name, email, passwd, rfc, dom, dept, tel, userType} = req.body;
    mysqlConnection.query(query, [name,email, passwd, rfc, dom, dept, tel, userType], (err,rows,fields) => {
        if(!err){
            console.log(rows)
            res.json({Status: 'Employeed Saved', idInserted: rows.insertId});
        } else {
            console.log(err);
        }
    })

})

router.post('/login/', (req,res) =>{
    //INSERT INTO usuario VALUES (NULL, _name, _correo, _passwd, _rfc, _domicilio, _dept, _tel, _isActive, _userType);
    console.log(req.body);
    const query = 'SELECT * FROM usuario WHERE correo = ? AND password = ? AND isActive = 1 LIMIT 1';
    const {email, passwd} = req.body;
    mysqlConnection.query(query, [email, passwd], (err,rows,fields) => {
        if(!err){
            console.log(rows);
            if(rows.length === 0){
                res.statusCode = 401;
                res.json({Satus: 'Login incorrect, try again'});
            } else {
                res.json({Status: 'Employeed LoggedIn', idInserted: rows.insertId});
            }
            
        } else {
            console.log(err);
            
        }
    })

})

router.post('/adddocument/', (req,res) =>{
    //INSERT INTO usuario VALUES (NULL, _name, extension, fecha, periodo, estado, isActive, usuario emisor);
    console.log(req.body);
    const query = 'INSERT INTO documentos VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);';
    const {name, ext, fecha, periodo, estado, isActive, usuario_fk} = req.body;
    mysqlConnection.query(query, [name, ext, fecha, periodo, estado, isActive, usuario_fk], (err,rows,fields) => {
        if(!err){
            console.log(rows)
            res.json({Status: 'Document Saved', idInserted: rows.insertId});
        } else {
            console.log(err);
            res.statusCode = 400;
            res.json({response: 'Query incorrect'});
        }
    })

})

router.get('/getdocs/', (req,res) => {
    console.log(req.body);
    
    mysqlConnection.query('SELECT * FROM documentos',(err,rows,fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.post('/approvedoc/', (req,res) =>{
    //INSERT INTO usuario VALUES (NULL, _name, extension, fecha, periodo, estado, isActive, usuario emisor);
    console.log(req.body);
    const query = 'UPDATE documentos SET estado = ? WHERE id_documentos = ?;';
    const {id,estado} = req.body;
    mysqlConnection.query(query, [id,estado], (err,rows,fields) => {
        if(!err){
            console.log(rows)
            res.json({Status: 'Document Updated'});
        } else {
            console.log(err);
            res.statusCode = 400;
            res.json({response: 'Query incorrect'});
        }
    })

})

router.post('/deletedoc/', (req,res) =>{
    //INSERT INTO usuario VALUES (NULL, _name, extension, fecha, periodo, estado, isActive, usuario emisor);
    console.log(req.body);
    const query = 'UPDATE documentos SET estado = ? WHERE isActive = false;';
    const {id} = req.body;
    mysqlConnection.query(query, [id], (err,rows,fields) => {
        if(!err){
            console.log(rows)
            res.json({Status: 'Document Updated'});
        } else {
            console.log(err);
            res.statusCode = 400;
            res.json({response: 'Query incorrect'});
        }
    })

})

router.get('/getdocsbyuser/', (req,res) => {
    console.log(req.body);
    
    console.log(req.body);
    const query = 'SELECT * FROM documentos WHERE id_documentos = ? and isActive = true;';
    const {id} = req.body;
    mysqlConnection.query(query, [id], (err,rows,fields) => {
        if(!err){
            console.log(rows)
            res.json(rows);
        } else {
            console.log(err);
            res.statusCode = 400;
            res.json({response: 'Query incorrect'});
        }
    })
})



module.exports = router;