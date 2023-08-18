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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `is_admin` bit(1) DEFAULT NULL,
  `user_delete_date` datetime(6) DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_join_date` datetime(6) DEFAULT NULL,
  `user_modify_date` datetime(6) DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_profile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo.png',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,_binary '\0','2023-08-15 16:16:45.000000','jyi8714@naver.com','2023-08-14 09:45:36.289106','2023-08-15 15:14:12.243550','wnwnwnnwnwnwnwn','$2a$10$BRMvBsps03a0uzSj/icR4u89wkWIwpgDf6CkpWcrzb9XIm4WxzYYe','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg'),(2,_binary '\0',NULL,'math_star@naver.com','2023-08-14 09:48:30.755425','2023-08-18 01:21:07.856790','John','$2a$10$YGAJICLId0BQVtXc3VYjEeOV/XzSogbwrWC8fXPHp9cLM0xkLr6T2','https://cdn-icons-png.flaticon.com/128/771/771372.png'),(3,_binary '\0',NULL,'hzim0422@gmail.com','2023-08-14 09:49:18.381426','2023-08-16 21:57:23.000118','홍지민','$2a$10$SJOpa7byc943ADN9jlWnuuZxQ4thwREYXj3YA/MqhTwC4HcLvSuRC','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5.png'),(4,_binary '\0','2023-08-18 01:47:27.000000','fsddcx8624@gmail.com','2023-08-14 10:40:40.365622','2023-08-15 16:17:40.252276','Chris','$2a$10$zfuTm9VvBnX1lBwjUat0fuyQbL4KQa3QPGCieIiVcFQokHmXBJAfC','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/chris.jpg'),(5,_binary '\0','2023-08-18 08:32:00.000000','111','2023-08-14 12:58:39.950520','2023-08-16 21:39:07.592546','정의민wjd','$2a$10$9KnjKiFRmUc4Lo3m6Gq9yuYgBv.v.UPTWp3zXn6JkJTdMJB2xKvrq','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png'),(6,_binary '\0','2023-08-17 17:18:17.000000','jyi8714@gmail.com','2023-08-15 15:11:26.166299',NULL,'주영인','$2a$10$Ly8y8CmqzZgDYn4bZjrQFeqi1jkz9wyEclHdK9O5isvGCXIcLk2cu','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png'),(7,_binary '\0',NULL,'jyi8714@naver.com','2023-08-15 16:17:37.967097','2023-08-17 14:39:38.514032','주영인','$2a$10$iZOLj5137TayW7txsjFR3OKpx2Qp2l2FWyAJrxllmnHJXdGsSQkg2','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%B3%A4%EC%8A%B5%EB%8B%88%EA%B9%8C%ED%9C%B4%EB%A8%BC.PNG'),(8,_binary '\0',NULL,'junyoung449@gmail.com','2023-08-16 10:27:36.945965',NULL,'Charlie','$2a$10$Ibg4Sot7kcy7VEozX1gus.gG5iiM.XPjWrjUiupHDAtJkL9VvSBn2','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png'),(9,_binary '\0',NULL,'imin3672@naver.com','2023-08-16 10:34:20.987925','2023-08-17 10:33:18.926988','Fairy','$2a$10$rIdc6duJP8wDu3uae7oAgOltAnQwpMTke5Pzh2Cf3fCxHaQqKuU3u','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/WIN_20230817_10_30_19_Pro.jpg'),(10,_binary '\0',NULL,'godzz733@naver.com','2023-08-16 14:46:11.133456',NULL,'에이든','$2a$10$RYyjy6G4S7ke2OyglDSFMONvlzck.6oU6ndifrX6kUDBDdM.n7FsG','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/72p-1%283%29.jpg'),(11,_binary '\0',NULL,'junyoung449@naver.com','2023-08-16 19:42:05.027902',NULL,'허준영','$2a$10$Ex0yB9jbnDGVVvGVbfYNEObnn8nlJ/Li5XDZutUXHLg9Uk4Hvp/fy','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png'),(12,_binary '\0','2023-08-18 08:32:00.000000','222','2023-08-17 10:32:39.926439',NULL,'Andrew','$2a$10$tfLlemIm0ZGEnlcgNsqZ1eTjRO4gQOE212oqF3op64W12XynM0gT6','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png'),(13,_binary '\0',NULL,'jyi8714@naver.co','2023-08-17 17:07:48.505063',NULL,'qwer','$2a$10$3sl8oGJ13iFY3ReEAP21DuRQaRQKh3kwgYeVICMQS8cRmbp6S8hly','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png'),(14,_binary '\0',NULL,'admin','2023-08-17 17:12:06.331394',NULL,'admin','$2a$10$DDdRIre/tA4Lzj9EaS4A5uihnds0.erZHUBfT9EXzjzSIHolT5Evi','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png'),(15,_binary '\0',NULL,'jyi8714@gmail.com','2023-08-17 17:19:36.985160',NULL,'qwer','$2a$10$UXeuMVFTz8/1hEI/irvo5OZObnny13uWc22/mKchouoriyTi1dLdu','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png'),(16,_binary '\0',NULL,'fsddcx8624@gmail.com','2023-08-18 01:48:20.740025',NULL,'정의민','$2a$10$sVh/WeehaMMpTp1.h.sd5.TXn17r8qpKXzr9m7ssazTzRcKjBF52u','https://b306-brain-full-operating.s3.ap-northeast-2.amazonaws.com/neo2.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  8:53:38
