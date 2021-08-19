/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.7.32 : Database - ngendika
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `chats` */

DROP TABLE IF EXISTS `chats`;

CREATE TABLE `chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `friend_id` int(11) NOT NULL DEFAULT '0',
  `message` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `chats` */

insert  into `chats`(`id`,`user_id`,`friend_id`,`message`,`created_at`) values 
(1,1,2,'yo','2021-08-12 00:31:33'),
(2,1,2,'tes','2021-08-12 00:31:59'),
(3,1,2,'gg','2021-08-12 00:32:59'),
(4,1,2,'a','2021-08-12 00:34:00'),
(5,2,1,'tes','2021-08-12 00:35:03'),
(6,1,2,'mantap bos','2021-08-12 00:42:16'),
(7,1,2,'nah','2021-08-12 00:42:25'),
(8,2,1,'oi','2021-08-12 11:26:23'),
(9,1,2,'haha','2021-08-12 11:26:30'),
(10,1,2,'asas','2021-08-14 20:11:43'),
(11,1,2,'coba','2021-08-14 20:14:15'),
(12,1,2,'a','2021-08-14 20:27:53'),
(13,1,2,'a','2021-08-14 20:40:35'),
(14,1,2,'a','2021-08-14 20:41:28');

/*Table structure for table `friends` */

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '0',
  `unread_user` int(11) NOT NULL DEFAULT '0' COMMENT 'unread message dari friend untuk user',
  `unread_friend` int(11) NOT NULL DEFAULT '0' COMMENT 'unread message dari user untuk friend',
  PRIMARY KEY (`user_id`,`friend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `friends` */

insert  into `friends`(`user_id`,`friend_id`,`created_at`,`status`,`unread_user`,`unread_friend`) values 
(1,2,'2021-08-10 10:46:37',1,0,0),
(1,3,'2021-08-10 11:23:51',1,0,0),
(1,4,'2021-08-10 11:23:53',1,0,0),
(1,5,'2021-08-10 11:24:05',1,0,0);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `avatar` varchar(255) DEFAULT NULL,
  `verif_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`password`,`email`,`status`,`avatar`,`verif_token`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'Rizuki','$2a$10$m3dgbbfPBuAfWXtElAM0ceArQ1gmf4NNe584G3PM8F6bAohinjgKO','rizukiichirou@gmail.com',1,'avatar-1628665605302.png',NULL,'2021-08-07 23:13:53','2021-08-19 12:51:55',NULL),
(2,'Uzumaki','$2a$10$YWNHJ.sFtNB5S21.XS2tUu52B7OnMyqN152U.AH6qhNNbKS9uVO3a','uzumaki@mail.com',1,'avatar-1628668302595.png',NULL,'2021-08-09 13:35:19','2021-08-11 14:51:42',NULL),
(3,'Sasuke','$2a$10$pSBbCE5FrfAFEsSYcEB4C.IcPJiYNHJbnXXa4x41GYhQHbL2XM6ea','sasuke@mail.com',1,'avatar-1628668326607.png',NULL,'2021-08-09 20:48:14','2021-08-11 14:52:06',NULL),
(4,'Gaara','$2a$10$C1IeoXVRPt0UMd2qgGRzsOTZ7dTyrK.CjCdEx7xs6ir.X/RiEkX7C','gaara@mail.com',1,NULL,NULL,'2021-08-09 20:49:00',NULL,NULL),
(5,'Sakura','$2a$10$V3PaDxUQ143EwDZauq1BuegBjkdEB1eQauLT29AUpz6bMpZXcpVxe','sakura@mail.com',1,NULL,NULL,'2021-08-09 20:49:17',NULL,NULL),
(6,'Tsunade','$2a$10$h61WEy0r.UmgyaujyXm/wucRpSISstJ1RybhwoH3xwQsr.xI85suq','tsunade@mail.com',1,NULL,NULL,'2021-08-09 20:49:35',NULL,NULL),
(7,'Kakashi','$2a$10$e9QC7hePu2FMFCGSawocuuhNi6IZ9J5tPvgmOGrnG1k7Fvh0Ttc7e','kakashi@mail.com',1,NULL,NULL,'2021-08-09 20:49:59',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
