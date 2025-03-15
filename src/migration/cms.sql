/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 8.0.35 : Database - cms
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `cms`;

/*Table structure for table `admins` */

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `admins` */

insert  into `admins`(`id`,`first_name`,`last_name`,`phone_number`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'Athena','Xiantelle','09162364559','2025-01-20 20:21:41','2025-03-09 00:57:10',NULL);

/*Table structure for table `attendants` */

DROP TABLE IF EXISTS `attendants`;

CREATE TABLE `attendants` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone_number` varchar(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attendants_admin_id_foreign_key` (`admin_id`),
  CONSTRAINT `attendants_admin_id_foreign_key` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `attendants` */

insert  into `attendants`(`id`,`admin_id`,`first_name`,`last_name`,`phone_number`,`created_at`,`updated_at`,`deleted_at`) values 
(3,1,'Athena Xiantelle','Shekinah','987654987','2025-02-03 20:08:13','2025-02-24 21:06:28',NULL);

/*Table structure for table `authentications` */

DROP TABLE IF EXISTS `authentications`;

CREATE TABLE `authentications` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned DEFAULT NULL,
  `doctor_id` int unsigned DEFAULT NULL,
  `attendant_id` int unsigned DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `temp_password` text NOT NULL,
  `access_token` text,
  `status` enum('online','offline') DEFAULT 'offline',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id_foreign` (`admin_id`),
  KEY `doctor_id_foreign` (`doctor_id`),
  KEY `attendant_id_foreign` (`attendant_id`),
  CONSTRAINT `admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`),
  CONSTRAINT `attendant_id_foreign` FOREIGN KEY (`attendant_id`) REFERENCES `attendants` (`id`),
  CONSTRAINT `doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `authentications` */

insert  into `authentications`(`id`,`admin_id`,`doctor_id`,`attendant_id`,`username`,`password`,`temp_password`,`access_token`,`status`,`created_at`,`updated_at`,`deleted_at`) values 
(1,1,NULL,NULL,'admin','$2b$10$v/7fUwKICgH9cW6afnddV.yAEJRUaeRxs37r1AHcNlwB2zmCwiCCu','YWRtaW4=',NULL,'offline','2025-01-20 20:21:42','2025-03-15 13:56:46',NULL),
(8,NULL,13,NULL,'jane03','$2b$10$.YuYfYH.AE14EfSGyqWrGutykm2hkbRjv7x6JL7JqWFBndaXwIYc.','MDAwMA==',NULL,'offline','2025-02-03 20:07:42','2025-03-15 18:45:16',NULL),
(9,NULL,NULL,3,'a_one','$2b$10$N1B/7QhGRBKgvs9NRV1NweXRnK3q1ZMGu4LQrr7.YaROnb8gL.f/q','MDAwMA==','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJhX29uZSIsImFkbWluX2lkIjoxLCJmaXJzdF9uYW1lIjoiQXRoZW5hIFhpYW50ZWxsZSIsImxhc3RfbmFtZSI6IlNoZWtpbmFoIiwicGhvbmVfbnVtYmVyIjoiOTg3NjU0OTg3IiwiY2xpbmljX25hbWUiOiJBdGhlbmEgTWVkaWNhbCBDbGluaWMiLCJjbGluaWNfYWRkcmVzcyI6Ik1vbGF2ZSwgWmFtYm9hbmdhIGRlbCBTdXIiLCJyb2xlIjoiYXR0ZW5kYW50IiwiY3JlYXRlZF9hdCI6IjIwMjUtMDItMDNUMTI6MDg6MTMuMDAwWiIsImF0dGVuZGFudF9pZCI6MywiaWF0IjoxNzQyMDEzNTc0fQ.dR8abm2_6csNrhAaX9_xISaDN2ZNZr8Q8f72T37IOfg','online','2025-02-03 20:08:13','2025-03-15 12:39:34',NULL);

/*Table structure for table `clinic` */

DROP TABLE IF EXISTS `clinic`;

CREATE TABLE `clinic` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `address` varchar(200) NOT NULL,
  `admin_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clinic_foreign_admin_id` (`admin_id`),
  CONSTRAINT `clinic_foreign_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `clinic` */

insert  into `clinic`(`id`,`name`,`address`,`admin_id`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'Athena Medical Clinic','Molave, Zamboanga del Sur',1,'2025-02-18 21:37:39','2025-02-18 21:37:39',NULL);

/*Table structure for table `doctors` */

DROP TABLE IF EXISTS `doctors`;

CREATE TABLE `doctors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone_number` varchar(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctors_admin_id_foreign_key` (`admin_id`),
  CONSTRAINT `doctors_admin_id_foreign_key` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `doctors` */

insert  into `doctors`(`id`,`admin_id`,`first_name`,`last_name`,`phone_number`,`created_at`,`updated_at`,`deleted_at`) values 
(13,1,'Jhane','Obtinario','09686117906','2025-02-03 20:07:42','2025-03-08 23:57:20',NULL);

/*Table structure for table `patients` */

DROP TABLE IF EXISTS `patients`;

CREATE TABLE `patients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `address` text,
  `birth_date` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `patients` */

insert  into `patients`(`id`,`admin_id`,`first_name`,`last_name`,`gender`,`address`,`birth_date`,`created_at`,`updated_at`,`deleted_at`) values 
(1,1,'Mario Jr','Langomez','male','Mabini St., Molave, Zamboanga del Sur','1992-04-14 00:00:00','2025-02-22 15:53:21','2025-03-08 15:38:48',NULL),
(2,1,'Jane','Obtinario','female','202 J Asinas St., Santa Lucia, San Juan City','1999-07-03 00:00:00','2025-02-24 20:45:39','2025-03-08 15:38:33',NULL),
(3,1,'Athena Xiantelle','Shekinah','female','202 J Asinas St., Santa Lucia, San Juan City','2024-02-10 00:00:00','2025-02-24 20:46:18','2025-03-08 15:38:40',NULL);

/*Table structure for table `product_categories` */

DROP TABLE IF EXISTS `product_categories`;

CREATE TABLE `product_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `name` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pc_admin_id_foreign_key` (`admin_id`),
  CONSTRAINT `pc_admin_id_foreign_key` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `product_categories` */

insert  into `product_categories`(`id`,`admin_id`,`name`,`created_at`,`updated_at`,`deleted_at`) values 
(1,1,'Vitamins','2025-02-03 22:28:20','2025-02-03 22:28:20',NULL),
(2,1,'Painkillers','2025-02-03 22:28:33','2025-02-03 23:08:47',NULL),
(3,1,'Antibiotics','2025-02-03 22:28:42','2025-02-03 22:28:42',NULL);

/*Table structure for table `product_items` */

DROP TABLE IF EXISTS `product_items`;

CREATE TABLE `product_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `variant_id` int unsigned DEFAULT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock` int NOT NULL,
  `expired_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_product_id_foreign_key` (`product_id`),
  KEY `item_variant_id+foreign_key` (`variant_id`),
  CONSTRAINT `item_product_id_foreign_key` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `item_variant_id+foreign_key` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `product_items` */

insert  into `product_items`(`id`,`product_id`,`variant_id`,`name`,`price`,`stock`,`expired_at`,`created_at`,`updated_at`,`deleted_at`) values 
(1,4,6,'Single-piece gel encapsulation',35,150,'2026-02-28 00:00:00','2025-02-08 20:35:14','2025-02-12 20:59:28',NULL),
(2,4,7,'120ml',180,60,'2026-01-15 00:00:00','2025-02-08 21:19:00','2025-02-12 20:58:21',NULL),
(3,4,6,'Two-piece gel encapsulation',45,100,'2026-04-18 08:00:00','2025-02-12 21:00:53','2025-02-12 21:00:53',NULL),
(4,5,NULL,'120mg',25,100,'2026-06-12 08:00:00','2025-02-12 23:53:33','2025-02-12 23:53:33',NULL),
(5,5,NULL,'300mg',35,100,'2026-06-12 08:00:00','2025-02-12 23:54:15','2025-02-12 23:54:15',NULL);

/*Table structure for table `product_variants` */

DROP TABLE IF EXISTS `product_variants`;

CREATE TABLE `product_variants` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'def_var',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_variant_product_id_foreign_key` (`product_id`),
  CONSTRAINT `product_variant_product_id_foreign_key` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `product_variants` */

insert  into `product_variants`(`id`,`product_id`,`name`,`created_at`,`updated_at`,`deleted_at`) values 
(1,1,'def_var','2025-02-06 21:24:54','2025-02-06 21:49:00',NULL),
(2,2,'def_var','2025-02-06 21:49:13','2025-02-06 21:49:13',NULL),
(3,4,'def_var','2025-02-06 21:59:11','2025-02-06 21:59:11',NULL),
(4,2,'350ml','2025-02-06 22:03:43','2025-02-12 23:50:07','2025-02-12 23:50:07'),
(5,2,'120mls','2025-02-06 23:15:25','2025-02-12 23:49:32','2025-02-12 23:49:32'),
(6,4,'Capsule','2025-02-06 23:17:43','2025-02-12 23:50:48',NULL),
(7,4,'Bottle','2025-02-06 23:18:04','2025-02-12 21:02:55',NULL),
(8,1,'500mg','2025-02-06 23:18:32','2025-02-12 23:50:40','2025-02-12 23:50:40'),
(9,1,'350mg','2025-02-06 23:18:57','2025-02-12 23:50:25','2025-02-12 23:50:25'),
(10,5,'def_var','2025-02-12 23:51:55','2025-02-12 23:51:55',NULL);

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_admin_id_foreign_key` (`admin_id`),
  KEY `product_category_id_foreign_key` (`category_id`),
  CONSTRAINT `product_admin_id_foreign_key` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`),
  CONSTRAINT `product_category_id_foreign_key` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `products` */

insert  into `products`(`id`,`admin_id`,`category_id`,`name`,`description`,`created_at`,`updated_at`,`deleted_at`) values 
(1,1,2,'Product One','This is a sample product for testing purposes only.','2025-02-03 22:50:38','2025-02-03 23:08:29',NULL),
(2,1,3,'Product Two','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.','2025-02-04 21:39:56','2025-02-04 21:39:56',NULL),
(4,1,1,'Product THree','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','2025-02-06 21:59:11','2025-02-06 21:59:11',NULL),
(5,1,3,'Biogesic','This is a testing biogesic antibiotics','2025-02-12 23:51:55','2025-02-12 23:51:55',NULL);

/*Table structure for table `queues` */

DROP TABLE IF EXISTS `queues`;

CREATE TABLE `queues` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(100) NOT NULL,
  `patient_id` int unsigned NOT NULL,
  `doctor_id` int unsigned DEFAULT NULL,
  `attendant_id` int unsigned DEFAULT NULL,
  `status` enum('waiting','in-progress','for-transaction','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'waiting',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `queue_patient_id_foreign_key` (`patient_id`),
  KEY `queue_doctor_id_foreign_key` (`doctor_id`),
  KEY `queue_attendant_id_foreign_key` (`attendant_id`),
  CONSTRAINT `queue_attendant_id_foreign_key` FOREIGN KEY (`attendant_id`) REFERENCES `attendants` (`id`),
  CONSTRAINT `queue_doctor_id_foreign_key` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `queue_patient_id_foreign_key` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `queues` */

insert  into `queues`(`id`,`number`,`patient_id`,`doctor_id`,`attendant_id`,`status`,`created_at`,`updated_at`,`deleted_at`) values 
(2,'0001',2,13,3,'for-transaction','2025-02-24 21:10:01','2025-02-25 00:44:24',NULL),
(3,'0002',1,13,3,'for-transaction','2025-02-25 00:43:11','2025-02-25 00:49:58',NULL),
(4,'0001',1,13,3,'for-transaction','2025-03-01 14:01:05','2025-03-01 14:09:12',NULL),
(5,'0001',1,13,3,'for-transaction','2025-03-08 15:59:19','2025-03-08 16:58:56',NULL),
(6,'0001',1,13,3,'for-transaction','2025-03-09 21:32:59','2025-03-09 21:37:59',NULL),
(7,'0002',2,13,3,'for-transaction','2025-03-09 21:38:23','2025-03-09 21:39:43',NULL),
(8,'0003',3,13,3,'for-transaction','2025-03-09 21:38:57','2025-03-09 21:40:01',NULL),
(9,'0004',1,13,3,'for-transaction','2025-03-09 21:39:17','2025-03-09 21:40:21',NULL),
(10,'0005',3,13,3,'for-transaction','2025-03-09 21:51:08','2025-03-09 23:31:03',NULL),
(11,'0005',1,13,3,'for-transaction','2025-03-09 23:17:19','2025-03-10 00:07:52',NULL);

/*Table structure for table `records` */

DROP TABLE IF EXISTS `records`;

CREATE TABLE `records` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `doctor_id` int unsigned NOT NULL,
  `patient_id` int unsigned NOT NULL,
  `queue_id` int unsigned DEFAULT NULL,
  `complaints` text,
  `medication` text,
  `diagnosis` text,
  `hpi` text,
  `physical_exam` text,
  `remarks` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `records_doctor_id_foreign_key` (`doctor_id`),
  KEY `records_patient_id_foreign_key` (`patient_id`),
  KEY `records_queue_id_foreign_key` (`queue_id`),
  CONSTRAINT `records_doctor_id_foreign_key` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `records_patient_id_foreign_key` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `records_queue_id_foreign_key` FOREIGN KEY (`queue_id`) REFERENCES `queues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `records` */

insert  into `records`(`id`,`admin_id`,`doctor_id`,`patient_id`,`queue_id`,`complaints`,`medication`,`diagnosis`,`hpi`,`physical_exam`,`remarks`,`created_at`,`updated_at`,`deleted_at`) values 
(2,1,13,2,2,'fall injury- headss\n','Fixcom 4 3 tabs od 1 hour before breakfast, Folex od\n','Food Hypersensitivity; Lumbago\n','weight: 32 kg (+) exposure to PTB nephew\n','laceration frontoparietal area\n','CBC: wbc 14.20 hgb: 11.60 plt ct: 245 U/A: pus cells: 8-10 rbc: 25-30\n','2025-02-24 23:50:30','2025-03-01 16:53:07',NULL),
(3,1,13,1,3,'follow up with repeat U/A result asymptomatic\n\n','Inozar OD, Platz OD, Ezetemibe od Calta BID, Rowatinex tid, Nicoplex od\n','Non Obstructing Nephrolitihasis R; Nephrolithiasis L w/ Mild Hydronephrosis, Renal Cortical Cyst R (USD result); Essential Hypertension, IHD r/o Post MI\n','','','repeat U/A : rbc 12-15 (from 10-12) wbc 3-5 (from 3-5) serum K 4.38\n','2025-02-25 00:49:28','2025-03-01 16:53:07',NULL),
(4,1,13,1,4,'this is complaints updated','this is medication updated','this is diagnosis updated','this i HPI','this is physical exam','this is remark for testing purposes only','2025-03-01 14:04:20','2025-03-04 21:56:09',NULL),
(5,1,13,1,5,'mass, R base of nasal bridge x 1 month\n','Tergecef 200 mg bidx 10 days; Fungikleen soap; increase Losartan 50 mg bid; increase Metformin 500 mg bid; Celecoxib 200mg od x 5 days','Carbuncle R Nasal Bridge Area r/o Lacrimal Duct Obstruction; NIDDM; Essential Hpn\n','mass on R base of nasal bridge x 1 month with yellowish discharge at R eye upon milking; given Azithromycin x 5 days due to Allergy to penicillins\n','updates','','2025-03-08 16:25:03','2025-03-08 16:59:20',NULL),
(6,1,13,1,6,'this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','2025-03-09 21:37:55','2025-03-09 21:37:55',NULL),
(7,1,13,2,7,'this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','2025-03-09 21:39:39','2025-03-09 21:39:39',NULL),
(8,1,13,3,8,'this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','2025-03-09 21:39:56','2025-03-09 21:39:56',NULL),
(9,1,13,1,9,'this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','this is a test for socket','2025-03-09 21:40:13','2025-03-09 21:40:13',NULL),
(10,1,13,3,10,'this is a test','this is a test','this is a test','this is a test','this is a test','this is a test','2025-03-09 23:25:33','2025-03-09 23:25:33',NULL),
(11,1,13,1,11,'this is a socket testing','this is a socket testing','this is a socket testing','this is a socket testing','this is a socket testing','this is a socket testing','2025-03-09 23:43:35','2025-03-09 23:43:35',NULL);

/*Table structure for table `settings` */

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `mode` enum('system','light','dark') NOT NULL DEFAULT 'light',
  `admin_id` int unsigned DEFAULT NULL,
  `doctor_id` int unsigned DEFAULT NULL,
  `attendant_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `settings_admin_id_foreign` (`admin_id`),
  KEY `settings_doctor_id_foreign` (`doctor_id`),
  KEY `settings_attendant_id_foreign` (`attendant_id`),
  CONSTRAINT `settings_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`),
  CONSTRAINT `settings_attendant_id_foreign` FOREIGN KEY (`attendant_id`) REFERENCES `attendants` (`id`),
  CONSTRAINT `settings_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `settings` */

insert  into `settings`(`id`,`mode`,`admin_id`,`doctor_id`,`attendant_id`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'system',1,NULL,NULL,'2025-01-28 23:32:32','2025-03-11 21:08:55',NULL),
(7,'dark',NULL,13,NULL,'2025-02-03 20:07:42','2025-03-08 23:21:02',NULL),
(8,'light',NULL,NULL,3,'2025-02-03 20:08:13','2025-02-03 20:08:13',NULL);

/*Table structure for table `transactions` */

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `record_id` int unsigned NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `transactions` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
