-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para nidoagilas
CREATE DATABASE IF NOT EXISTS `nidoagilas` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `nidoagilas`;

-- Volcando estructura para tabla nidoagilas.alumnos
CREATE TABLE IF NOT EXISTS `alumnos` (
  `id_alumno` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `rut` varchar(50) NOT NULL,
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla nidoagilas.alumnos: ~0 rows (aproximadamente)
DELETE FROM `alumnos`;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` (`id_alumno`, `nombre`, `apellido`, `rut`) VALUES
	(1, 'jose', 'perez', '167889086'),
	(2, 'pedro', 'fuentes', '170903335');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `cursos` (
    `id_curso` int(11) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB DEFAULT CHAR SET=latin1;

ALTER TABLE `cursos` DISABLE KEYS;
DELETE FROM `cursos`;

INSERT INTO `cursos` VALUES(1,'Historia');
INSERT INTO `cursos` VALUES(2,'Lenguaje');

-- Volcando estructura para tabla nidoagilas.notas
CREATE TABLE IF NOT EXISTS `notas` (
  `id_notas` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `nota` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  PRIMARY KEY (`id_notas`),
  KEY `FK_notas_alumnos` (`id_alumno`),
  CONSTRAINT `FK_notas_alumnos` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`),
    FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla nidoagilas.notas: ~0 rows (aproximadamente)
DELETE FROM `notas`;
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
INSERT INTO `notas` (`id_notas`, `id_curso`, `nota`, `id_alumno`) VALUES
	(1, 1, 40, 1),
	(2, 2, 65, 1),
	(3, 1, 55, 2);
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
