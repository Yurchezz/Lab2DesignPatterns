CREATE DATABASE IF NOT EXISTS `uklon`;

use uklon;
CREATE TABLE `driver` (
  `id_driver` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_driver`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `fuel` (
  `id_fuel_level` int NOT NULL AUTO_INCREMENT,
  `level` double DEFAULT NULL,
  `measure_time` datetime DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  PRIMARY KEY (`id_fuel_level`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `location` (
  `id_location` int NOT NULL,
  `latitude` int DEFAULT NULL,
  `longitude` int DEFAULT NULL,
  PRIMARY KEY (`id_location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `oil` (
  `id_oil_level` int NOT NULL AUTO_INCREMENT,
  `level` int DEFAULT NULL,
  `measure_time` datetime DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  PRIMARY KEY (`id_oil_level`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `passenger` (
  `id_passenger` int NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_passenger`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` char(60) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('Admin','SuperUser') DEFAULT 'SuperUser',
  `age` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `vehicle` (
  `id_vehicle` int NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `id_driver` int DEFAULT NULL,
  `mark` varchar(255) DEFAULT NULL,
  `max_people_capacity` int DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_vehicle`),
  KEY `id_driver_idx` (`id_driver`),
  CONSTRAINT `id_driver` FOREIGN KEY (`id_driver`) REFERENCES `driver` (`id_driver`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `wheel_preasure` (
  `id_wheel_preasure` int NOT NULL AUTO_INCREMENT,
  `left_front` double DEFAULT NULL,
  `right_front` double DEFAULT NULL,
  `left_back` double DEFAULT NULL,
  `right_back` double DEFAULT NULL,
  `measure_time` datetime DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  PRIMARY KEY (`id_wheel_preasure`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `orders` (
  `id_order` int NOT NULL,
  `drive_rate` int DEFAULT NULL,
  `id_final_location` int DEFAULT NULL,
  `id_passenger` int DEFAULT NULL,
  `id_start_location` int DEFAULT NULL,
  `id_vehicle` int DEFAULT NULL,
  `passenger_number` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id_order`),
  KEY `id_start_location` (`id_start_location`) /*!80000 INVISIBLE */,
  KEY `id_final_location` (`id_final_location`),
  KEY `id_vehicle_idx` (`id_vehicle`),
  KEY `id_passenger_idx` (`id_passenger`),
  CONSTRAINT `id_final_location` FOREIGN KEY (`id_final_location`) REFERENCES `location` (`id_location`),
  CONSTRAINT `id_passenger` FOREIGN KEY (`id_passenger`) REFERENCES `passenger` (`id_passenger`),
  CONSTRAINT `id_start_location` FOREIGN KEY (`id_start_location`) REFERENCES `location` (`id_location`),
  CONSTRAINT `id_vehicle` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicle` (`id_vehicle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
