INSERT INTO State VALUES 
(1, 'Alabama'),
(2, 'Alaska'),
(3, 'Arizona'),
(4, 'Arkansas'),
(5, 'California'),
(6, 'Colorado'),
(7, 'Connecticut'),
(8, 'Delaware'),
(9, 'Florida'),
(10, 'Georgia'),
(11, 'Hawaii'),
(12, 'Idaho'),
(13, 'Illinois'),
(14, 'Indiana'),
(15, 'Iowa'),
(16, 'Kansas'),
(17, 'Kentucky'),
(18, 'Louisiana'),
(19, 'Maine'),
(20, 'Maryland'),
(21, 'Massachusetts'),
(22, 'Michigan'),
(23, 'Minnesota'),
(24, 'Mississippi'),
(25, 'Missouri'),
(26, 'Montana'),
(27, 'Nebraska'),
(28, 'Nevada'),
(29, 'New Hampshire'),
(30, 'New Jersey'),
(31, 'New Mexico'),
(32, 'New York'),
(33, 'North Carolina'),
(34, 'North Dakota'),
(35, 'Ohio'),
(36, 'Oklahoma'),
(37, 'Oregon'),
(38, 'Pennsylvania'),
(39, 'Rhode Island'),
(40, 'South Carolina'),
(41, 'South Dakota'),
(42, 'Tennessee'),
(43, 'Texas'),
(44, 'Utah'),
(45, 'Vermont'),
(46, 'Virginia'),
(47, 'Washington'),
(48, 'West Virginia'),
(49, 'Wisconsin'),
(50, 'Wyoming');

INSERT INTO ZipCode VALUES
('79936'),
('90011'),
('60629'),
('90650'),
('90201'),
('77084'),
('92335'),
('78521'),
('77449'),
('78572'),
('90250'),
('90280'),
('11226'),
('90805'),
('91331'),
('08701'),
('90044'),
('92336'),
('87144');

INSERT INTO City VALUES
(1, 'El Paso', 43),
(2, 'Los Angeles', 5),
(3, 'Chicago', 13),
(4, 'Norwalk', 5),
(5, 'Bell Gardens', 5),
(6, 'Houston', 43),
(7, 'Fontana', 5),
(8, 'Brownsville', 43),
(9, 'Katy', 43),
(10, 'Mission', 43),
(11, 'Hawthorne', 5),
(12, 'South Gate', 5),
(13, 'Brooklyn', 32),
(14, 'Long Beach', 5),
(15, 'Pacoima', 5),
(16, 'Lakewood', 30),
(17, 'Rio Rancho', 31);

INSERT INTO PropertyType VALUES
(1, 'House'),
(2, 'Apartment'),
(3, 'Condos/Co-ops'),
(4, 'Townhouses'),
(5, 'Manufactured'),
(6, 'Lots/Land');

INSERT INTO Feature VALUES
(1, 'New Contruction'),
(2, 'Waterfront'),
(3, 'Price Reduced'),
(4, 'Open House Available'),
(5, 'HOA'),
(6, 'Garage'),
(7, 'Pool'),
(8, 'Garden'),
(9, 'Shed');

INSERT INTO Listing VALUES
(1, '1200 Sonora Rd NE', 17, '87144', 1, 0, '2019-05-02', 500000.00, NULL, NULL);

INSERT INTO `ListingFeature` (`Listing`, `Feature`) VALUES
(1, 1);


