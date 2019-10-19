-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: mysql-letsmeet.alwaysdata.net
-- Generation Time: Oct 19, 2019 at 06:04 PM
-- Server version: 10.3.17-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `letsmeet_letsmeet_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `EVENEMENT`
--

CREATE TABLE `EVENEMENT` (
  `Id` bigint(20) NOT NULL,
  `Titre` varchar(100) DEFAULT NULL,
  `Resume` text DEFAULT NULL,
  `DateEvenement` datetime DEFAULT NULL,
  `Adresse` varchar(200) DEFAULT NULL,
  `Longitude` float DEFAULT NULL,
  `Latitude` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `EVENEMENT`
--

INSERT INTO `EVENEMENT` (`Id`, `Titre`, `Resume`, `DateEvenement`, `Adresse`, `Longitude`, `Latitude`) VALUES
(1, 'Répétition de basse', 'J\'ai répétition de musique (basse). Si quelqu\'un veut venir ...', '2019-10-24 00:00:00', 'Morsang-sur-Orges', 48.6634, 2.35132),
(2, 'Rediff ZEvent', 'Je regarderai la rediff du ZEvent dans la salle TV. Venez c\'est peace.', '2019-02-15 00:00:00', 'Argenteuil', 48.9494, 2.23835),
(3, 'Billard', 'Billard à Indiana Club 100% compet les pélos !', '2019-09-24 00:00:00', 'Ivry-sur-Seine', 48.8282, 2.37934),
(4, 'Sultan à Ivry', 'Wesh Sultan demain midi ça vous dit ?', '2020-12-03 00:00:00', 'Ivry-sur-Seine', 48.8114, 2.38505),
(5, 'Visite Loch Ness', 'On pourrai visiter le Loch Ness ce week-end non ?', '2020-02-17 00:00:00', 'Edimbourgh', 55.9521, -3.18899);

-- --------------------------------------------------------

--
-- Table structure for table `PARTICIPE`
--

CREATE TABLE `PARTICIPE` (
  `Id` bigint(20) NOT NULL,
  `Id_UTILISATEUR` bigint(20) NOT NULL,
  `Id_EVENEMENT` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PARTICIPE`
--

INSERT INTO `PARTICIPE` (`Id`, `Id_UTILISATEUR`, `Id_EVENEMENT`) VALUES
(1, 4, 3),
(2, 4, 2),
(3, 5, 4),
(4, 1, 1),
(5, 2, 3),
(6, 3, 1),
(7, 1, 4),
(8, 5, 4),
(9, 5, 5),
(10, 2, 5),
(11, 1, 2),
(13, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `POST`
--

CREATE TABLE `POST` (
  `Id` bigint(20) NOT NULL,
  `Id_UTILISATEUR` bigint(20) NOT NULL,
  `Id_EVENEMENT` bigint(20) NOT NULL,
  `DateCreation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `POST`
--

INSERT INTO `POST` (`Id`, `Id_UTILISATEUR`, `Id_EVENEMENT`, `DateCreation`) VALUES
(1, 1, 3, '2019-01-02 00:00:00'),
(2, 4, 4, '2019-03-01 00:00:00'),
(3, 2, 1, '2019-04-01 00:00:00'),
(4, 3, 2, '2019-03-02 00:00:00'),
(5, 5, 5, '2019-03-16 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `UTILISATEUR`
--

CREATE TABLE `UTILISATEUR` (
  `Id` bigint(20) NOT NULL,
  `Nom` varchar(30) DEFAULT NULL,
  `Prenom` varchar(30) NOT NULL,
  `Password` varchar(30) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `ImageProfil` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `UTILISATEUR`
--

INSERT INTO `UTILISATEUR` (`Id`, `Nom`, `Prenom`, `Password`, `Email`, `ImageProfil`) VALUES
(1, 'Sakovitch', 'Stephen', NULL, 'stephen.sakovitch@orange.fr', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/44258687_341554849913535_4498742182567477248_n.jpg?_nc_cat=108&_nc_oc=AQkYgwlDf-uDtsbRicIP0YDW-nHLfYqLueVLdCXao4tP6jHzaCy3qekwC3DLtqBqctm8Onj-xOIa0pYvwsOlIlCa&_nc_ht=scontent-cdg2-1.xx&oh=8173cc53a8b415127c0f9dafad04e0cd&oe=5E33E917'),
(2, 'Machon', 'Théo', 'musiquebasse', 'machon@et.esiea.fr', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/26195607_112740102887757_2314119618193327834_n.jpg?_nc_cat=102&_nc_oc=AQlosCGgyTaRpg7SXbSLEwL5Alpj5ZUUH6IKqUYJgViFjUD452Ksy_p6L-FqyKDv3G5OEba0S3PWpDbDiEIR0KOO&_nc_ht=scontent-cdg2-1.xx&oh=d5fab06d66503cedcaa72adb724f1587&oe=5DF39453'),
(3, 'Pinsard', 'Florian', 'zevent', 'pinsard@et.esiea.fr', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/1441480_1493698737576427_6631517073958365519_n.jpg?_nc_cat=102&_nc_oc=AQmhqY_LannUDZXSg7_ImT284Gs58LsDBT_rKEXj3pg5jYG3gFfpU2ZPyt9Of1xngR46doYHlQ4FKsdXeSin3t34&_nc_ht=scontent-cdg2-1.xx&oh=01bcbc4b7e3d7feabd2dcf67ccba648d&oe=5DF25824'),
(4, 'Griffault', 'Emilie', 'efreisup', 'griffault@et.esiea.fr', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/69755472_555993814939654_862110411455987712_n.jpg?_nc_cat=109&_nc_oc=AQmD3QBYOox7dERhnhoq1s4AX6rbPAJznXRjDoW2ryiXL44Xpq3qnJkmsXIdykd1osEpRNMWuulDTFbfry2FkDHC&_nc_ht=scontent-cdg2-1.xx&oh=bf19a3919653cefe224c5262886a8565&oe=5DFCF513'),
(5, 'Outemzabet', 'Nesrine', 'ecosse', 'outemzabet@et.esiea.fr', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/11902572_535238106631394_4671378484779443631_n.jpg?_nc_cat=101&_nc_oc=AQnGOZOkIwe0KZ14GszoMsgrAATeU_E9UY0WFnuvpArbAzYnT764XqkUW7hlqC-lIBl42cyHpGZykKYp75HriVtL&_nc_ht=scontent-cdg2-1.xx&oh=5cfa37715d09617ef148724d695f48cc&oe=5E04A379');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `EVENEMENT`
--
ALTER TABLE `EVENEMENT`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `PARTICIPE`
--
ALTER TABLE `PARTICIPE`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_UTILISATEUR_PARTICIPE_Fk` (`Id_UTILISATEUR`),
  ADD KEY `Id_EVENEMENT_PARTICIPE_Fk` (`Id_EVENEMENT`);

--
-- Indexes for table `POST`
--
ALTER TABLE `POST`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_UTILISATEUR_POST_Fk` (`Id_UTILISATEUR`),
  ADD KEY `Id_EVENEMENT_POST_Fk` (`Id_EVENEMENT`);

--
-- Indexes for table `UTILISATEUR`
--
ALTER TABLE `UTILISATEUR`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `EVENEMENT`
--
ALTER TABLE `EVENEMENT`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `PARTICIPE`
--
ALTER TABLE `PARTICIPE`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `POST`
--
ALTER TABLE `POST`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `UTILISATEUR`
--
ALTER TABLE `UTILISATEUR`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `PARTICIPE`
--
ALTER TABLE `PARTICIPE`
  ADD CONSTRAINT `Id_EVENEMENT_PARTICIPE_Fk` FOREIGN KEY (`Id_EVENEMENT`) REFERENCES `EVENEMENT` (`Id`),
  ADD CONSTRAINT `Id_UTILISATEUR_PARTICIPE_Fk` FOREIGN KEY (`Id_UTILISATEUR`) REFERENCES `UTILISATEUR` (`Id`);

--
-- Constraints for table `POST`
--
ALTER TABLE `POST`
  ADD CONSTRAINT `Id_EVENEMENT_POST_Fk` FOREIGN KEY (`Id_EVENEMENT`) REFERENCES `EVENEMENT` (`Id`),
  ADD CONSTRAINT `Id_UTILISATEUR_POST_Fk` FOREIGN KEY (`Id_UTILISATEUR`) REFERENCES `UTILISATEUR` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
