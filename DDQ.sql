CREATE TABLE IF NOT EXISTS `State` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` char(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `ZipCode` (
  `Code` char(5) NOT NULL,
   PRIMARY KEY (`Code`)
);

CREATE TABLE IF NOT EXISTS `City` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `State` int(11),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`State`) REFERENCES `State` (`id`)
);

CREATE TABLE IF NOT EXISTS `PropertyType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Listing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Address` varchar(255) NOT NULL,
  `City` int(11),
  `ZipCode` char(5),
  `PropertyType` int(11) NOT NULL,
  `ByOwner` TINYINT(1) DEFAULT 0,
  `DateListed` DATE NOT NULL,
  `ListPrice` FLOAT(10,2),
  `DateSold` DATE DEFAULT NULL,
  `SellPrice` FLOAT(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`City`) REFERENCES `City` (`id`),
  FOREIGN KEY (`ZipCode`) REFERENCES `ZipCode` (`Code`),
  FOREIGN KEY (`PropertyType`) REFERENCES `PropertyType` (`id`)
);


CREATE TABLE IF NOT EXISTS `Feature` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` char(40) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `ListingFeature` (
  `Listing` int(11) NOT NULL,
  `Feature` int(255) NOT NULL,
  PRIMARY KEY (`Listing`),
  FOREIGN KEY (`Listing`) REFERENCES `Listing` (`id`),
  FOREIGN KEY (`Feature`) REFERENCES `Feature` (`id`)
);


