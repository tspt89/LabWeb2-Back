const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const mysqlConnection = require('../database');
const mysql = require('mysql');
const app = express();


router.post('/addusuario/', (req,res) =>{
    //INSERT INTO `actividadweb2`.`usuarios` (`id`, `nombre`, `correo`, `password`, `rfc`, `domicilio`, `telefono`, `isActive`, `tipo_user`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    console.log(req.body);
    const query = 'INSERT INTO usuarios VALUES (NULL, ?, ?, ?, ?, ?, ?, 1, ?);';
    const {name, email, passwd, rfc, dom, tel, userType} = req.body;
    mysqlConnection.query(query, [name,email, passwd, rfc, dom, tel, userType], (err,rows,fields) => {
        if(!err){
            console.log(rows)
            res.json({Status: 'Employeed Saved', idInserted: rows.insertId});
            add_role(rows.insertId,dept);
        } else {
            console.log(err);
        }
    })

})

//Agrega los departamentos correspondientes del usuario
router.post('/adduserdept/', (req,res) => {
    const {id, dept} = req.body;
    console.log(dept)
    //Primero se eliminan los todos los departamentos
    mysqlConnection.query('DELETE FROM user_depto WHERE id_user = ?;', [id], (err,rows,fields) => {
        if(!err){
            
        } else {
            console.log(err);
        }
    })

    //Se agregan los nuevos departamentos del usuario
    const query = 'INSERT INTO user_depto VALUES (?, ?);';
    for(d in dept){
        console.log("Dept: "+dept[d])
        mysqlConnection.query(query, [id, dept[d]], (err,rows,fields) => {
            if(!err){
                
            } else {
                res.json({Status:"Failure"})
                res.statusCode = 400;
            }
        })
    }

    res.json({Status: "Complete!"})
    res.statusCode = 200;
})


router.post('/login/', (req,res) =>{
    
    console.log(req.body);
    let query = 'SELECT @user_id := usuarios.id id, usuarios.nombre, usuarios.tipo_user FROM usuarios WHERE correo = ? AND password = ? AND isActive = true; ';
    query += 'SELECT department.id_depto, department.department FROM usuarios, user_depto, department where usuarios.id = @user_id AND usuarios.id = user_depto.id_user AND user_depto.id_depto = department.id_depto;';
    const {email, passwd} = req.body;
    mysqlConnection.query(query, [email, passwd], (err,rows,fields) => {
        if(!err){
            console.log(rows);
            if(rows[0].length === 0){
                res.statusCode = 401;
                res.json({Satus: 'Login incorrect, try again'});
            } else {
                console.log("ID: ",rows[0][0].id)
                res.json({id: rows[0][0].id,name: rows[0][0].nombre, type: rows[0][0].tipo_user, dept: rows[1]});
            }
            
        } else {
            console.log(err);
            
        }
    })

})

router.post('/getusers/', (req,res) => {
    console.log("GET USERS",req.body);
    const {id} = req.body;
    mysqlConnection.query('SELECT * FROM usuarios WHERE id != ?;',[id],(err,rows,fields) => {
        if(!err){
            console.log("GET USERS RESPONSE: ",rows)
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.post('/updateuser/', (req,res) =>{
    console.log(req.body);
    let query = 'UPDATE usuarios SET nombre = ?, correo = ?, password = ?, rfc = ?, domicilio = ?, telefono = ?, isActive = ?, tipo_user = ? WHERE (id = ?);';
    const {email, passwd} = req.body;
    mysqlConnection.query(query, [email, passwd], (err,rows,fields) => {
        if(!err){
            console.log(rows);
            if(rows.length === 0){
                res.statusCode = 401;
                res.json({Satus: 'Login incorrect, try again'});
            } else {
                console.log("ID: ",rows[0][0].id)
                res.json({Status: 'Employeed LoggedIn', id: rows[0][0].id,name: rows[0][0].nombre, type: rows[0][0].tipo_user, dept: rows[1]});
            }
            
        } else {
            console.log(err);
            
        }
    })

})

router.get('/getusersdocs/', (req,res) =>{
    
    const query = 'SELECT id, nombre FROM usuarios where tipo_user = 1;';
    
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

router.post('/adddocument/', (req,res) =>{
    console.log(req.body);
    //INSERT INTO `actividadweb2`.`documentos` (
        //`id_documentos`, `nombre_doc`, `ext_archivo`, `fecha_carga`, `periodo_info`, `estado`, `isActive`, `usuario_emisor`, `dept`, `usuario_receptor`) VALUES ('3', 'Nomina enero 2020', 'RAR', '2021-05-16', '2020-01-01', '1', '1', '2', '1', '1');
    const query = 'INSERT INTO documentos  VALUES (NULL, ?,?,?,?,?,?,?,?,?);';
    const {name, ext, fecha, periodo, estado, isActive, usuario_fk,dept, usuario_receptor} = req.body;
    mysqlConnection.query(query, [name, ext, fecha, periodo, estado, isActive, usuario_fk,dept, usuario_receptor], (err,rows,fields) => {
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
    const {filter, date_init, date_limit} = req.body;
    if(filter == true){
        console.log("Entra al if")
        mysqlConnection.query('SELECT * FROM documentos WHERE isActive = true AND periodo_info BETWEEN ? AND ?;',[date_init,date_limit],(err,rows,fields) => {
            if(!err){
                res.json(rows);
            } else {
                console.log(err);
            }
        })
    } else {
        mysqlConnection.query('SELECT * FROM documentos WHERE isActive = true;',(err,rows,fields) => {
            if(!err){
                res.json(rows);
            } else {
                console.log(err);
            }
        })
    }
    
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
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_receptor = ? AND dept = ?;';
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
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_emisor = ? AND dept = 2;';
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
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_emisor = ? AND dept = 1;';
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
    
    const query = 'SELECT * FROM documentos WHERE isActive = true AND usuario_emisor = ? AND dept = 3;';
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