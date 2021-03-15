const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const mysqlConnection = require('../database');

const app = express();


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
    const query = 'SELECT * FROM usuario WHERE correo = ? AND password = ?';
    const {email, passwd} = req.body;
    mysqlConnection.query(query, [email, passwd], (err,rows,fields) => {
        if(!err){
            console.log(rows);
            if(rows.length === 0){
                res.statusCode = 401;
                res.json({Satus: 'Login incorrect, try again'});
            } else {
                console.log(rows[0].nombre);
                res.json({Status: 'Employeed LoggedIn', id: rows[0].id,name: rows[0].nombre,dept: rows[0].tipo_user});
            }
            
        } else {
            console.log(err);
            
        }
    })

})

router.post('/adddocument/', (req,res) =>{
    console.log(req.body);
    //INSERT INTO `actividadweb2`.`documentos` (`nombre_doc`, `ext_archivo`, `fecha_carga`, `periodo_info`, `estado`, `isActive`, `usuario_emisor`, `dept`) VALUES ('asdasd', 'sds', '2021-03-08', '2021-03-08', '0', '1', '1', '100');
    const query = 'INSERT INTO documentos VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);';
    const {name, ext, fecha, periodo, estado, isActive, usuario_fk,dept} = req.body;
    mysqlConnection.query(query, [name, ext, fecha, periodo, estado, isActive, usuario_fk,dept], (err,rows,fields) => {
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

router.get('/getdocsadmin/', (req,res) => {
    console.log(req.body);
    
    mysqlConnection.query('SELECT * FROM documentos WHERE isActive = true;',(err,rows,fields) => {
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

router.post('/getdocsbyuser/', (req,res) => {
    console.log(req.body);
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_emisor = ?;';
    const {id, dept} = req.body;
    mysqlConnection.query(query, [id,dept], (err,rows,fields) => {
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

router.post('/addnotif/', (req,res) => {
    console.log(req.body);
    
    console.log(req.body);
    //INSERT INTO `actividadweb2`.`notificaciones` (`notificacion`, `tipo_usuario`, `usuario_emisor`) VALUES ('Notificación 1', '101', '2');
    const query = 'INSERT INTO notificaciones VALUES (NULL,?,?,?)';
    const {notificacion,tipo_usuario, usuario_emisor} = req.body;
    mysqlConnection.query(query, [notificacion,tipo_usuario,usuario_emisor], (err,rows,fields) => {
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

router.get('/getnotif/', (req,res) => {
    console.log(req.body);
    
    console.log(req.body);
    //INSERT INTO `actividadweb2`.`notificaciones` (`notificacion`, `tipo_usuario`, `usuario_emisor`) VALUES ('Notificación 1', '101', '2');
    const query = 'SELECT * FROM notificaciones';
    
    mysqlConnection.query(query, (err,rows,fields) => {
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

//Get nominas
router.post('/getnomina/', (req,res) => {
    console.log(req.body);
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_emisor = ? AND dept = 000;';
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

//Get contabilidad por usuario
router.post('/getcontabilidad/', (req,res) => {
    console.log(req.body);
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_emisor = ? AND dept = 001;';
    const {id, dept} = req.body;
    mysqlConnection.query(query, [id,dept], (err,rows,fields) => {
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

//Get RH por usuario
router.post('/getrh/', (req,res) => {
    console.log(req.body);
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_emisor = ? AND dept = 010;';
    const {id, dept} = req.body;
    mysqlConnection.query(query, [id,dept], (err,rows,fields) => {
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

//Get documentacion por usuario
router.post('/getdoc/', (req,res) => {
    console.log(req.body);
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_emisor = ? AND dept = 100;';
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