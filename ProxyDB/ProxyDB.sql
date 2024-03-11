-- MySQL dump 10.13  Distrib 8.1.0, for macos13 (arm64)
--
-- Host: localhost    Database: ProxyDB
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `LinUrl`
--

DROP TABLE IF EXISTS `LinUrl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LinUrl` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `URL` varchar(1300) NOT NULL,
  `User_ID` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `LinUrl_UNIQUE` (`ID`),
  KEY `UserForeignKey_idx` (`User_ID`),
  CONSTRAINT `UserForeignKey1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LinUrl`
--

LOCK TABLES `LinUrl` WRITE;
/*!40000 ALTER TABLE `LinUrl` DISABLE KEYS */;
/*!40000 ALTER TABLE `LinUrl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PhoAcc`
--

DROP TABLE IF EXISTS `PhoAcc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PhoAcc` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int NOT NULL,
  `RefreshToken` varchar(300) NOT NULL,
  `AccessToken` varchar(500) NOT NULL,
  `email` varchar(50) NOT NULL,
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `UserForeignKey_idx` (`User_ID`),
  CONSTRAINT `UserForeignKey` FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PhoAcc`
--

LOCK TABLES `PhoAcc` WRITE;
/*!40000 ALTER TABLE `PhoAcc` DISABLE KEYS */;
INSERT INTO `PhoAcc` VALUES (1,1,'1//0esQVgWap-q_RCgYIARAAGA4SNwF-L9IrZ31gpP0rBHb_nmQT5160HsGl6m2nWGQFi_Uk03JRvE7_Z_V4txZZdhrmSLUkrgdidAw','ya29.a0AfB_byBq1niNez1Zop2dWHbQFgd_95feuraG87KWl3LKpuWARK8vDy2k6ScAKJ3RFLDdBwV0mDcUHs9EjMG4ZMbolLnINr7ObK01IEP_biBNbVnQu9UOEN3LVPxGMgPNzrHXbdki6Zwi-jLMok8tzeIi0p8HXKzNRcRoDAaCgYKAYgSARASFQGOcNnC9zD72iOaBbZboRV0F1m1Cg0173','xemtua@gmail.com');
/*!40000 ALTER TABLE `PhoAcc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PhoUrl`
--

DROP TABLE IF EXISTS `PhoUrl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PhoUrl` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `useID` varchar(45) NOT NULL,
  `ID_Media` varchar(450) NOT NULL,
  `URL` varchar(2300) NOT NULL DEFAULT '',
  `IDPhoAcc` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `useID_UNIQUE` (`useID`),
  KEY `PhoAccKey_idx` (`IDPhoAcc`),
  CONSTRAINT `PhoAccKey` FOREIGN KEY (`IDPhoAcc`) REFERENCES `PhoAcc` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PhoUrl`
--

LOCK TABLES `PhoUrl` WRITE;
/*!40000 ALTER TABLE `PhoUrl` DISABLE KEYS */;
INSERT INTO `PhoUrl` VALUES (39,'umx5mmc4qb485v24k8uj25vidgj58pge','AKlmf7zSzLDP9Q8sbnWTAeQj2HFMJMDHWuiQ83sQVcf_Sgy8Yia-zvWE3wr6YkZ6CEK-h1Ha1YrtpC9NiU078-EkZHfgkg15cw','https://lh3.googleusercontent.com/lr/AAJ1LKe9BnTYQFXXjlbZgb4vgx56iBuLyZkk7LyuPzeLt2K86EJm8XfxyyB3ffd_PJ4MOS0lpbbQE3NBVjB16rFClie0bvZmBPaiyBmH8zdjhKyJZDGj0ootySdthD1C2H7MTQ0XeZWc9qpqXUEBuEhJeYLJdLd5OHDB4o9ZWI58_0kALbVOUDcagRGADCr2QOb6rOMMRPvolYuvmXcUuLcgoBH2E5mVI4pCZ7Uq-BTpKhUdlBbX0LGSW8bANJbl3rP0nRRs8bMnV15tkEiaIlyAgibxwA4lC8N0E86avQxkVK5k8vh0QhSxa9ZhNFFVUBEUHJIOgZySoW4ss64GXHnaqtFL3aoPslxdfWS2HGU5IG3PawLUo8l3yibuES-WhpGxbi-8n3M9ye28Fd1VCoyRd3yIGKwo_VbHF5zl3YJK5w5KjspZmx9Qxw9kPTMNOQ8X-bZAl4gqw6BoNQf10LvcwCdSyW7E_qw8tXUhwSLV6l77R0VV4mMrxYob4ZQ1JcVHbcFvKCUypirkWIP6NimCppy_YDL6L6oOANJc8ynayvibLxxMsDTAENZuH_HtF8NoF0feMVCifXekn-PXs2sTehQOuvhMmQFisThG5127PpwSQu4YvKzrfiFIkmWfrXQq0uCf5aO3N7jZvORVK3SIvM4MQpE12rEWFPCCfQKT3pgP92G1LFXLbltOjgAP3cGjKCAo2EyXZK9eoHEXvLv4GFoGxqh5zGmdBiKOv7ddztVl2szB8VIng4ZjaZkv9riGieud7SSlqfTBFiZwMiaqU0yZnSs-AcXPjqlthgMpukRPIrrrlGnehBLNEa5FctWgRMoCrJ_jzW6LaoQVsyzf67I9VUrae1W70u9TQEZJ3NI3xzoQp157jPohylwEh1wVJRJAGPOWTDQpB5tRbgRmDKezRlTIXweWJREkM495nJDk_CL6QW7uqWLz4sm8Rgn7FlK0yThjBh92rfJYwfSV6wwNN0AyoUSuQB7mbe2iwur8Rmkp309j_EVG_eiB_Hkegs8x4wk1rEnsFifJjEaQGxkBVgE8vSNwA8DMgwbhyR33AwTBCySKXksxvAKpRHMNuCoN3eUk-m6w3zpjzyOzIhq-KnwS-S9YUX-13dtCR_RnPgP9q2zjap6mG1jTo3AWn36xlBX-g0FO_hag3426s4c0Bw=w1920-h1080',1),(40,'u75dz6cc0n6edp3z8nyqyor0pnw3rt8m','AKlmf7z6EUQAAY6KYrKemfN9EIW1ts25C5XQ8vhNS1BInrvXwdwaM4rrtiH4EVdMnZ1ekd214PPCMxW3MA0_o0vcdi-qMurpng','https://lh3.googleusercontent.com/lr/AAJ1LKdt8uOATqrMSd3eAR5NTMee1_Gk-L3GPpYCgBCKN4KIflS68gdeFEBFARR1r6XSMQvlPzu8AQ9S8fbPJJQxTljbZD4sVahHSYURZjb5Pd02ncVGI8sxHuGgggQ0fJ_AP5rYbdZk16F107lxu72jAVxCDLbbMqo5Ali7atoObVzgQu8uPuWYAVweVYY4OuSIJGra09NELsyZcXHy-eYetQCG9FqV6dQdV9iNXNKO1jtivl5HQr4OAMDzFhZo3MvWbMLtg1dxmweK8iUOF9Z0-P2odgyvKV9knfO7U50MdTqpC0Q6n15c2B_R5UVhw_9-DZLkhl8xYpXzaXdDLKRGY5L8tzN139jsUVWUYTjSxfrTvIGBbSAadz6T0hOyhv9yM-ImUAYGsxmXuc6DMjXz3eLtkw35-cKJVGzeThftI48Xvrq4o6-NykT197rntIJDsriFeunVMaQxQ5Ps-wEUnqqqKjduG9Awq3juSkW0GyQmoffe8qVl6OPilx2Ca7lZecKRaMfettyeMLf2nftHCwAd92NzbjJ5x4JUcC2-Weq5J9uHRA9xuGzSxXccgMz_gH5VNTaQeC2mZy9nGACTWtAZwOBcTxgxcDUHvw9mFTGlHLBGy_ZwQ0kZfDTAfNRLX0DKoH2GVHZJOQlRRDEb6NRbdcHqUPIoY3snrBpPTFOBL2RV7NDv9Ay7ZAKQRptyp77M7q88newMhf28XHyWaqPR9AhvdKrW6KuFGhn15Q4t6B7JMHHf0dKoIEKJkfovXfzjhSr26p6FAGu1cwy0wJRXddUQpoH9ZVEzsf0zOTiwVo5w_NAORrHXrXMyeEw_5XHa5DL_E4UEDYiiD14d2obFgh7bnHtMt_Ew9sbXB0kSymxXav7eerctS_5FC20ZQJZLxqLVyHgi2ixqu2nT_smJhr5KqM2l6U4hZj1PZr5dLu7w8eiudbbay0njUpwVCDOUlzi_RioYxe3teNUW0o6LpwkxcGIbj2q_i5Z7jeVHcSipl714pz2wJdccShSFvF7P0YPRRaZLheLDvWFxSmKz37Zx-TA-LDl7g2ZQBrO_qb-es043LKy2t_rddsFQvw-zo-796zsAH9vOYC4A8AqAxxqbLBxMz1RIa7r7M9iaPs6wQx5xLzRkzASyvqvnh_Hk3724hDvxPVX69g1GGGf49Q=w1920-h1080',1),(41,'ukxsxo1a5e8i8ot4k9v048onw9m3kalx','AKlmf7z_U9YrNtpVssqrD1TbToVB3xCtg6dRBDgx27OeDqW6w_TWcRzrkCe1n0G-kKsrnDIPUhhZEVXR8VxkhwHcMNw_P-Xt1Q','https://lh3.googleusercontent.com/lr/AAJ1LKf62MnU6A4hBzX_K0OvgPhAYdXxcsyty7YnWIAz6leI_10lpYDf80IHUW3Quq0pVCrEgdwzwdkrS7NrvMc5Fa5TWT5YIfBkgXLPMgs583ihBFAwwPDHMXBNFNgz64U6_I4jsRE5dZPf_aWTqXVEvapNBKmJxdsQCsJ5s7D7uAI86st93ieitcdpFs48P_hcI-O7JVFVVFDxBd1VcgxG3RMIPotQIxQCjAqAs8ZZZg281qh21HnPq5-juR6xhxTw3OEa3gq0ewfaJnHQi0gZVcPtayl21_6ZbAWbt2xZ5KcBp8wyPoBOfOa1pHY663jKI2d0YIX9BTMH8EuxqZSp4Bda5REX4Iqqz0TTFg7bk2lxuaCrTgmisQdDCibJQjYQJpykErZkM7HPva9orzHiCjPQ5P_tjVX4BKfNx6O79cuGNvFaqhVlZMMg9LqMyJ_ejcaQr1bMqNiKn7N6MwIsHLhGIYXQVqE8n8ETfrzQ_7WDGtciCXuDi8NEl7VVy40VMzlroJ6tr3QR5KzqqTKoOSNVo104htI67BsXI02Abyh3U5nhat3cCxRMAcykB4J_BU3mM6ccXVrMPa3X0WGbth2bATWbG1X_qgZa7MyVQTdv4W3-4k-oxZRYaxkmb7AyHz_2B6aoY19H6UmuC_Qxf07vDRHCgxTSs3rdXRNYxw0IT-rrSoWkE25YU39XyhHBFX2Q2StchXi4XSNyg0hKEwRCrZZBWvwRvVUcfjW0D_E4SOjTy9JAYN00BzA6KyPnI1ubG_GTDDl_F_my1meCTdL6f93kJG2wdtZTR-Ne9pjUVqOlgojjTGYMSpmMHjBGJEpokvU6pxiKSA_s-ZL5qHekgfDwSD6X-uXMeGunuL1YUxh-vCgX6fuyV8O84UTjLz3ISfxeuMbLxOoG0mWO5HxW5Nu9TLXICsBSo9Y7_1HjKo7V-iLgpnRrwhfXcgi7FSi8okNSC8yWy_Lc3QONK77uj1wh8xTcVNoFB6mbLevPdrtRVZPgthuvzEgRALTNfo8g28RzBm0nhi-VvenzDC6m6daspjrfcRo0kxExvYYVhZJ6JZW7eon8iirzLGrGEhHwv7gD53TSUQfVmTa6qmu5oNOU0CEf_q5TtHatbZW8entBPjo__3Oe8pHzaNTBRBg5r3Slkay_mVeO5Ybc_cXr5w=w1920-h1080',1);
/*!40000 ALTER TABLE `PhoUrl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `verify` tinyint(1) NOT NULL DEFAULT '0',
  `grand` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'xemtua@gmail.com','xxxvideosex',0,0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-28  0:28:28
