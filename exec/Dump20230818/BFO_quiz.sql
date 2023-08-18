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
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `quiz_id` bigint NOT NULL AUTO_INCREMENT,
  `quiz_answer` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quiz_create_date` datetime(6) DEFAULT NULL,
  `quiz_delete_date` datetime(6) DEFAULT NULL,
  `quiz_modify_date` datetime(6) DEFAULT NULL,
  `quiz_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quizbook_id` bigint DEFAULT NULL,
  `template_id` bigint DEFAULT NULL,
  PRIMARY KEY (`quiz_id`),
  KEY `FKk2x6fa3lbbgqgk7o2n3a1a4tj` (`quizbook_id`),
  KEY `FK5moo14nvnnxfenn5r6esd0r4m` (`template_id`),
  CONSTRAINT `FK5moo14nvnnxfenn5r6esd0r4m` FOREIGN KEY (`template_id`) REFERENCES `template` (`template_id`),
  CONSTRAINT `FKk2x6fa3lbbgqgk7o2n3a1a4tj` FOREIGN KEY (`quizbook_id`) REFERENCES `quizbook` (`quizbook_id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (7,'0','2023-08-16 22:23:45.969868',NULL,NULL,'Q1. 이미지 안으로 들어가세요!',3,12),(8,'0','2023-08-16 22:23:45.980109',NULL,NULL,'Q2. 이미지 안으로 들어가세요!',3,13),(9,'0','2023-08-16 22:23:45.984395',NULL,NULL,'Q3. 이미지 안으로 들어가세요!',3,14),(10,'0','2023-08-16 22:23:45.988783',NULL,NULL,'Q4. 멋진 포즈를 취해보세요!',3,15),(11,'0','2023-08-16 22:23:45.994677',NULL,NULL,'Q5. 홍지민',3,35),(12,'0','2023-08-16 22:23:45.999103',NULL,NULL,'Q6. 게가 되세요!',3,17),(13,'0','2023-08-16 22:23:46.003488',NULL,NULL,'Q7. SSAFY 2학기 과정은 공통-특화-자율 총 3번의 프로젝트로 구성되어 있다. \n Red)O   Green)X',3,18),(14,'0','2023-08-16 22:23:46.008418',NULL,NULL,'Q8. 두 개 이상의 프로세스나 스레드가 서로 자원을 얻지 못해서 다음 처리를 하지 못하고 무한히 다음 자원을 기다리게 되는 상태는 \n Red)데드락   Green)오버헤드',3,19),(15,'1','2023-08-16 22:23:46.013740',NULL,NULL,'Q9. 대한민국 임시정부수립일은? \n Red)1917년 4월 13일   Green)1919년 4월 13일',3,20),(16,'0','2023-08-16 22:23:46.018299',NULL,NULL,'Q10. 대머리',3,45),(17,'1','2023-08-16 22:23:46.023042',NULL,NULL,'Q11. 최초로 세로로 된 삼색기를 국기로 한 국가는 \n Red)벨기에   Green)프랑스   Blue)이탈리아',3,22),(18,'1','2023-08-16 22:23:46.028102',NULL,NULL,'Q12. A: 난 거짓말 안해 \n B: A는 거짓말쟁이야 나는 정직해 \n C: B는 거짓말쟁이야 이건 참말이야 \n 한 명만 진실을 말한다. 누구일까?',3,23),(19,'2','2023-08-16 22:23:46.032967',NULL,NULL,'Q13. 빨간색 노란색 파란색 신호등에 없는 색은?',3,24),(20,'1','2023-08-16 22:23:46.037602',NULL,NULL,'Q14. 재즈의 핵심이 되는 리듬을 뜻하는 말은? \n Red)비트   Green)스윙   Blue)붐뱁',3,25),(21,'2','2023-08-16 22:23:46.042114',NULL,NULL,'Q15. SSAFY 대전캠퍼스 교육이 실시되는 장소는? \n Red)삼청교육대   Green)피라미드   Blue)삼성화재연수원',3,26),(22,'0','2023-08-17 17:47:03.000000',NULL,NULL,'Q1. 보디빌딩 규정 포즈 1번 라인업',4,27),(23,'0','2023-08-17 17:47:22.000000',NULL,NULL,'Q2. 보디빌딩 규정 포즈 2번 프론트 더블 바이셉스',4,28),(24,'0','2023-08-17 17:47:28.000000',NULL,NULL,'Q3. 보디빌딩 규정 포즈 3번 프론트 랫 스프레드',4,29),(25,'0','2023-08-17 17:48:01.000000',NULL,NULL,'Q4. 보디빌딩 규정 포즈 4번 사이드 체스트',4,30),(26,'0','2023-08-17 17:52:30.000000',NULL,NULL,'Q5. 아라베스크 동작을 취하세요',4,31),(27,'0','2023-08-17 17:52:34.000000',NULL,NULL,'Q6. 클래식 피지크의 전설을 따라 잡아보세요',4,32),(28,'0','2023-08-17 17:52:39.000000',NULL,NULL,'Q7. -메-',4,33),(29,'0','2023-08-17 17:52:49.000000',NULL,NULL,'Q8. 렛잇 고~',4,34),(30,'0','2023-08-17 17:52:55.000000',NULL,NULL,'Q9. 홍지민',4,35),(31,'0','2023-08-17 17:52:58.000000',NULL,NULL,'Q10. 내가 그린 기린 그림',4,36),(32,'0','2023-08-17 17:53:08.000000',NULL,NULL,'Q11. 카메라를 바닥으로 돌리면 쉽습니다.',4,37),(33,'0','2023-08-17 17:53:13.000000',NULL,NULL,'Q12. 피카?',4,38),(34,'0','2023-08-17 17:53:17.000000',NULL,NULL,'Q13. 스파이더맨 처럼 벽을 타보세요!',4,39),(35,'0','2023-08-17 17:53:45.000000',NULL,NULL,'Q14. 슈퍼맨 ~',4,40),(36,'0','2023-08-17 17:53:56.000000',NULL,NULL,'Q15. 반댓말은 스푼써니예요~',4,41),(52,'0','2023-08-18 00:10:15.000000',NULL,NULL,'Q1. 요즘 사람들!',5,42),(67,'0','2023-08-18 00:11:11.000000',NULL,NULL,'Q2. 싸피 사람들!',5,43),(68,'0','2023-08-18 00:11:31.000000',NULL,NULL,'Q3. 우리의 미래!',5,44),(71,'0','2023-08-18 00:11:59.000000',NULL,NULL,'Q4. 귀여운 곰!',5,46),(83,'0','2023-08-18 00:12:44.000000',NULL,NULL,'Q5. 빠밤 빠밤!',5,47),(84,'0','2023-08-18 00:12:44.000000',NULL,NULL,'Q6. 얘 왜 이렇게 앉아 있나요?!',5,48),(85,'0','2023-08-18 00:12:57.000000',NULL,NULL,'Q7. 우우우우우!',5,49),(86,'0','2023-08-18 00:12:57.000000',NULL,NULL,'Q8. 뚱이!',5,50),(87,'0','2023-08-18 00:13:10.000000',NULL,NULL,'Q9. 옛 동물의 왕!',5,51),(88,'0','2023-08-18 00:13:10.000000',NULL,NULL,'Q10. 현 동물의 왕!',5,52),(93,'0','2023-08-18 00:13:37.000000',NULL,NULL,'Q11. 할 수 있으면 따라해봐!',5,53),(94,'0','2023-08-18 00:13:37.000000',NULL,NULL,'Q12. 할 수 있으면 따라해봐2!',5,54),(95,'0','2023-08-18 00:20:10.000000',NULL,NULL,'Q13. 시곗바늘의 시침과 분침이 일직선이 되는 시간은?',5,55),(96,'1','2023-08-18 00:20:10.000000',NULL,NULL,'Q14. 정의민의 3대 중량 중 틀린 것은?',5,56),(97,'0','2023-08-18 00:42:09.000000',NULL,NULL,'Q15. 이미지 안으로 들어가세요!',5,45);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
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
