-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 20, 2019 at 04:08 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_holtm`
--
CREATE DATABASE IF NOT EXISTS `cs340_holtm` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cs340_holtm`;

-- --------------------------------------------------------

--
-- Table structure for table `City`
--

DROP TABLE IF EXISTS `City`;
CREATE TABLE `City` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `State` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `City`
--

INSERT INTO `City` (`Id`, `Name`, `State`) VALUES
(1, 'Seattle', 1),
(2, 'Olympia', 1),
(3, 'Portland', 2),
(4, 'Los Angeles', 3),
(5, 'San Diego', 3),
(6, 'San Francisco', 3),
(7, 'Boise', 4),
(8, 'Las Vegas', 5),
(9, 'Salt Lake City', 6),
(10, 'Phoenix', 7),
(11, 'Tucson', 7),
(12, 'Corvallis', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Feature`
--

DROP TABLE IF EXISTS `Feature`;
CREATE TABLE `Feature` (
  `Id` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Feature`
--

INSERT INTO `Feature` (`Id`, `Name`) VALUES
(1, 'New Construction'),
(2, 'Waterfront'),
(3, 'Garage'),
(4, 'Pool'),
(5, 'Garden'),
(6, 'Shed'),
(7, 'HOA');

-- --------------------------------------------------------

--
-- Table structure for table `Listing`
--

DROP TABLE IF EXISTS `Listing`;
CREATE TABLE `Listing` (
  `Id` int(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `City` int(11) NOT NULL,
  `ZipCode` varchar(5) NOT NULL,
  `PropertyType` int(11) NOT NULL,
  `ByOwner` tinyint(1) NOT NULL DEFAULT 0,
  `DateListed` date NOT NULL,
  `ListPrice` float NOT NULL,
  `DateSold` date DEFAULT NULL,
  `SellPrice` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Listing`
--

INSERT INTO `Listing` (`Id`, `Address`, `City`, `ZipCode`, `PropertyType`, `ByOwner`, `DateListed`, `ListPrice`, `DateSold`, `SellPrice`) VALUES
(1, '2979 NW Audene Dr', 12, '97330', 1, 0, '2019-04-29', 315000, NULL, NULL),
(2, '8828 Dempsey Ave', 4, '91343', 1, 0, '2019-05-02', 715000, NULL, NULL),
(3, '118 24th Ave', 1, '98122', 1, 0, '2019-05-02', 799000, NULL, NULL),
(4, '1410 Lakeside Ave S', 1, '98144', 1, 0, '2019-02-01', 2300000, NULL, NULL),
(5, '720 Lakeside Ave S APT 201', 1, '98144', 3, 0, '2019-04-03', 329000, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ListingFeature`
--

DROP TABLE IF EXISTS `ListingFeature`;
CREATE TABLE `ListingFeature` (
  `Listing` int(11) NOT NULL,
  `Feature` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `ListingFeature`
--

INSERT INTO `ListingFeature` (`Listing`, `Feature`) VALUES
(2, 3),
(2, 4),
(4, 2),
(4, 3),
(4, 6),
(5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `PropertyType`
--

DROP TABLE IF EXISTS `PropertyType`;
CREATE TABLE `PropertyType` (
  `Id` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `PropertyType`
--

INSERT INTO `PropertyType` (`Id`, `Name`) VALUES
(1, 'House'),
(2, 'Apartment'),
(3, 'Condo');

-- --------------------------------------------------------

--
-- Table structure for table `State`
--

DROP TABLE IF EXISTS `State`;
CREATE TABLE `State` (
  `Id` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `State`
--

INSERT INTO `State` (`Id`, `Name`) VALUES
(1, 'Washington'),
(2, 'Oregon'),
(3, 'California'),
(4, 'Idaho'),
(5, 'Nevada'),
(6, 'Utah'),
(7, 'Arizona');

-- --------------------------------------------------------

--
-- Table structure for table `ZipCode`
--

DROP TABLE IF EXISTS `ZipCode`;
CREATE TABLE `ZipCode` (
  `Code` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `ZipCode`
--

INSERT INTO `ZipCode` (`Code`) VALUES
('84001'),
('84784'),
('85001'),
('86556'),
('90001'),
('90077'),
('91343'),
('96162'),
('97001'),
('97330'),
('97920'),
('98001'),
('98122'),
('98144'),
('99403');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id` (`Id`),
  ADD KEY `State` (`State`);

--
-- Indexes for table `Feature`
--
ALTER TABLE `Feature`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id` (`Id`);

--
-- Indexes for table `Listing`
--
ALTER TABLE `Listing`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `City` (`City`),
  ADD KEY `Property-Type` (`PropertyType`),
  ADD KEY `Zip-Code` (`ZipCode`);

--
-- Indexes for table `ListingFeature`
--
ALTER TABLE `ListingFeature`
  ADD KEY `Listing-Feature_ibfk_1` (`Feature`),
  ADD KEY `Listing` (`Listing`);

--
-- Indexes for table `PropertyType`
--
ALTER TABLE `PropertyType`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id` (`Id`);

--
-- Indexes for table `State`
--
ALTER TABLE `State`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id` (`Id`);

--
-- Indexes for table `ZipCode`
--
ALTER TABLE `ZipCode`
  ADD PRIMARY KEY (`Code`),
  ADD KEY `Code` (`Code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `City`
--
ALTER TABLE `City`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Feature`
--
ALTER TABLE `Feature`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Listing`
--
ALTER TABLE `Listing`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `PropertyType`
--
ALTER TABLE `PropertyType`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `State`
--
ALTER TABLE `State`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `City`
--
ALTER TABLE `City`
  ADD CONSTRAINT `City_ibfk_1` FOREIGN KEY (`State`) REFERENCES `State` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Listing`
--
ALTER TABLE `Listing`
  ADD CONSTRAINT `Listing_ibfk_1` FOREIGN KEY (`City`) REFERENCES `City` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Listing_ibfk_2` FOREIGN KEY (`PropertyType`) REFERENCES `PropertyType` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Listing_ibfk_3` FOREIGN KEY (`ZipCode`) REFERENCES `ZipCode` (`Code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ListingFeature`
--
ALTER TABLE `ListingFeature`
  ADD CONSTRAINT `ListingFeature_ibfk_1` FOREIGN KEY (`Feature`) REFERENCES `Feature` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ListingFeature_ibfk_2` FOREIGN KEY (`Listing`) REFERENCES `Listing` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
