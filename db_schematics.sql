CREATE SCHEMA IF NOT EXISTS actividadWeb2 DEFAULT CHARACTER SET utf8 ;
USE actividadWeb2 ;

-- -----------------------------------------------------
-- Table mydb.usuario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NULL,
  correo VARCHAR(255) NULL,
  password VARCHAR(255) NULL,
  rfc VARCHAR(45) NULL,
  domicilio VARCHAR(255) NULL,
  departamento INT NULL,
  telefono VARCHAR(13) NULL,
  isActive TINYINT NULL,
  tipo_user INT NULL,
  PRIMARY KEY (id));


-- -----------------------------------------------------
-- Table mydb.documentos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS documentos (
  id_documentos INT NOT NULL AUTO_INCREMENT,
  nombre_doc VARCHAR(64) NULL,
  ext_archivo VARCHAR(45) NULL,
  fecha_carga DATE NULL,
  periodo_info DATE NULL,
  estado INT NULL,
  isActive TINYINT NULL,
  usuario_emisor INT NOT NULL,
  PRIMARY KEY (id_documentos),
	FOREIGN KEY (usuario_emisor)
	REFERENCES usuario (id));


-- -----------------------------------------------------
-- Table mydb.notificaciones
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS notificaciones (
  id INT NOT NULL AUTO_INCREMENT,
  notificacion VARCHAR(255) NULL,
  tipo_usuario INT NULL,
  usuario_emisor INT NOT NULL,
  notificacionescol VARCHAR(45) NULL,
  PRIMARY KEY (id),
	FOREIGN KEY (usuario_emisor)
	REFERENCES usuario (id));


CREATE PROCEDURE addUser(
	IN _name VARCHAR(255),IN _correo VARCHAR(255),IN _passwd VARCHAR(255),IN _rfc VARCHAR(45),IN _domicilio VARCHAR(255),IN _dept VARCHAR(4),IN _tel VARCHAR(13),IN _isActive TINYINT(4),IN _userType INT)
BEGIN
	INSERT INTO usuario VALUES (NULL, _name, _correo, _passwd, _rfc, _domicilio, _dept, _tel, _isActive, _userType);
	
	SET _id = LAST_INSERT_ID();
	
	SELECT _id as id;
END;