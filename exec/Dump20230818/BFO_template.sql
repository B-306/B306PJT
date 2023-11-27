-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: i9b306.q.ssafy.io    Database: BFO
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `template`
--

DROP TABLE IF EXISTS `template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `template` (
  `template_id` bigint NOT NULL AUTO_INCREMENT,
  `template_create_date` datetime(6) DEFAULT NULL,
  `template_delete_date` datetime(6) DEFAULT NULL,
  `template_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `template_modify_date` datetime(6) DEFAULT NULL,
  `template_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template_type` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`template_id`),
  KEY `FKb6vyut9pfy3injob2ir7xgd3o` (`user_id`),
  CONSTRAINT `FKb6vyut9pfy3injob2ir7xgd3o` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template`
--

LOCK TABLES `template` WRITE;
/*!40000 ALTER TABLE `template` DISABLE KEYS */;
INSERT INTO `template` VALUES (12,'2023-08-16 21:56:06.665837',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template1.png',NULL,'template1.png','\0',2),(13,'2023-08-16 21:58:00.254606',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template2.png',NULL,'template2.png','\0',2),(14,'2023-08-16 21:58:05.272995',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template3.png',NULL,'template3.png','\0',2),(15,'2023-08-16 21:58:10.336235',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template4.png',NULL,'template4.png','\0',2),(16,'2023-08-16 21:58:15.286824',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template5.png',NULL,'template5.png','\0',2),(17,'2023-08-16 21:58:21.050643',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template6.png',NULL,'template6.png','\0',2),(18,'2023-08-16 21:58:27.217129',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template7.png',NULL,'template7.png','\0',2),(19,'2023-08-16 21:58:32.396880',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template8.png',NULL,'template8.png','\0',2),(20,'2023-08-16 21:58:37.557516',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template9.png',NULL,'template9.png','\0',2),(21,'2023-08-16 21:58:44.458476',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template10.png',NULL,'template10.png','\0',2),(22,'2023-08-16 21:58:50.389531',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template11.png',NULL,'template11.png','\0',2),(23,'2023-08-16 21:58:55.531132',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template12.png',NULL,'template12.png','\0',2),(24,'2023-08-16 21:58:59.667088',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template13.png',NULL,'template13.png','\0',2),(25,'2023-08-16 21:59:04.648138',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template14.png',NULL,'template14.png','\0',2),(26,'2023-08-16 21:59:10.521173',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/template15.png',NULL,'template15.png','\0',2),(27,'2023-08-17 17:24:54.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/1LineUp.png',NULL,'1LineUp.png','1',14),(28,'2023-08-17 17:24:54.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/2frontDoubleBiceps.png',NULL,'2frontDoubleBiceps.png','1',14),(29,'2023-08-17 17:25:40.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/3frontRatSpread.png',NULL,'3frontRatSpread.png','1',14),(30,'2023-08-17 17:26:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/4sideChest.png',NULL,'4sideChest.png','1',14),(31,'2023-08-17 17:26:51.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/arabesque.png',NULL,'arabesque.png','1',14),(32,'2023-08-17 17:27:06.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/chris.png',NULL,'chris.png','1',14),(33,'2023-08-17 17:27:27.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/dualblade.png',NULL,'dualblade.png','1',14),(34,'2023-08-17 17:27:32.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/elsa.png',NULL,'elsa.png','1',14),(35,'2023-08-17 17:27:38.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/fairy.png',NULL,'fairy.png','1',14),(36,'2023-08-17 17:27:48.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/giraffe.png',NULL,'giraffe.png','1',14),(37,'2023-08-17 17:29:05.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/lazy.png',NULL,'lazy.png','1',14),(38,'2023-08-17 17:29:10.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/pika.png',NULL,'pika.png','1',14),(39,'2023-08-17 17:29:25.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/spiderman.png',NULL,'spiderman.png','1',14),(40,'2023-08-17 17:29:31.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/super.png',NULL,'super.png','1',14),(41,'2023-08-17 17:30:03.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/excavtor.png',NULL,'excavtor.png','1',14),(42,'2023-08-17 17:31:19.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/tutleneck.png',NULL,'tutleneck.png','1',14),(43,'2023-08-17 17:31:26.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/tutleneck2.png',NULL,'tutleneck2.png','1',14),(44,'2023-08-17 21:57:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/tutleneck3.png',NULL,'tutleneck3.png','1',14),(45,'2023-08-17 22:00:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/octopus.png',NULL,'octopus.png','1',14),(46,'2023-08-17 22:01:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/bear.png',NULL,'bear.png','1',14),(47,'2023-08-17 22:02:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/shark.png',NULL,'shark.png','1',14),(48,'2023-08-17 22:03:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/cat.png',NULL,'cat.png','1',14),(49,'2023-08-17 22:04:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/kingKong.png',NULL,'kingKong.png','1',14),(50,'2023-08-17 22:05:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/statfish.png',NULL,'statfish.png','1',14),(51,'2023-08-17 22:06:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/tirano.png',NULL,'tirano.png','1',14),(52,'2023-08-17 22:07:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/lion.png',NULL,'lion.png','1',14),(53,'2023-08-17 22:08:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/bboy2.png',NULL,'bboy2.png','1',14),(54,'2023-08-17 22:09:11.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/bboy1.png',NULL,'bboy1.png','1',14),(55,'2023-08-18 00:18:40.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/timequiz.png',NULL,'timequiz.png','1',14),(56,'2023-08-18 00:18:40.000000',NULL,'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/three.png',NULL,'three.png','1',14);
/*!40000 ALTER TABLE `template` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  8:53:37
