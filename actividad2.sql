-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: actividadweb2
-- ------------------------------------------------------
-- Server version	10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentos` (
  `id_documentos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_doc` varchar(64) DEFAULT NULL,
  `ext_archivo` varchar(45) DEFAULT NULL,
  `fecha_carga` date DEFAULT NULL,
  `periodo_info` date DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `usuario_emisor` int(11) NOT NULL,
  PRIMARY KEY (`id_documentos`),
  KEY `usuario_emisor` (`usuario_emisor`),
  CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`usuario_emisor`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
INSERT INTO `documentos` VALUES (1,'doc_1.txt','.txt','0000-00-00','2021-02-02',1,1,1),(2,'doc_1.txt','.txt','0000-00-00','2021-02-02',0,1,1);
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notificacion` varchar(255) DEFAULT NULL,
  `tipo_usuario` varchar(3) DEFAULT NULL,
  `usuario_emisor` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_emisor` (`usuario_emisor`),
  CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`usuario_emisor`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
INSERT INTO `notificaciones` VALUES (1,'Probando notificacio','111',1),(2,'Notificación 1','101',2);
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rfc` varchar(45) DEFAULT NULL,
  `domicilio` varchar(255) DEFAULT NULL,
  `departamento` varchar(4) DEFAULT NULL,
  `telefono` varchar(13) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `tipo_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Usuario_1','usuario@company.com','12345678','PPPP1122334W2','Domicilio del usuario 1','000','2222222222',0,0),(2,'Usuario_2','usuario2@company.com','12345678','PPPP1122334W2','Domicilio del usuario 2','000','2222222222',1,0),(3,'Usuario_3','usuario3@company.com','12345678','PPPP1122334W2','Domicilio del usuario 3','000','2222222222',1,0),(4,'Usuario_4','usuario4@company.com','12345678','PPPP1122334W2','Domicilio del usuario 4','000','2222222222',0,0),(5,'Test - Theo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(6,'Test - Theo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(7,'Test - Theo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(8,'ASD','Test - Theo','Test - Theo','Test - Theo',NULL,'Test',NULL,1,2),(9,'ASD','Test - Theo','1234','Test - Theo',NULL,'Test',NULL,1,2),(10,'ASD','Test - Theo','qwerty','Test - Theo',NULL,'Test',NULL,1,2),(11,'ASD','Test - Theo','!qwerty','Test - Theo',NULL,'Test',NULL,1,3),(12,'ASD','Test - Theo','4321','Test - Theo',NULL,'Test',NULL,1,3);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-08 14:26:38
