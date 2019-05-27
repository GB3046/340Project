-- These are some Database Manipulation queries for our real estate listings website

-- get all Cities and State Ids and Names to populate dropdowns when creating or editing a listing
-- Using select all for now.
SELECT *
--SELECT City.Name, City.Id, State.Name as State 

FROM City 
INNER JOIN State ON State.Id = City.State 

-- get all listings for the browse listings 
-- Using select all for now.
SELECT * 

--SELECT Listing.Address, City.Name, State.Name, `PropertyType`.Name, Listing.`ZipCode`, Listing.`ByOwner`, Listing.`DateListed`, Listing.`ListPrice`, Listing.`DateSold`, Listing.`SellPrice` 
FROM Listing 
INNER JOIN City ON City.Id = Listing.City 
INNER JOIN State ON State.Id = City.State 
INNER JOIN `PropertyType` ON `PropertyType`.Id = Listing.`PropertyType`  


-- get a single listing's data for the Update Listing form or view a specific listing page
-- Using select all for now.
SELECT *
--SELECT Listing.Address, City.Name, State.Name, `PropertyType`.Name, Listing.`ZipCode`, Listing.`ByOwner`, Listing.`DateListed`, Listing.`ListPrice`, Listing.`DateSold`, Listing.`SellPrice` 
FROM Listing 
INNER JOIN City ON City.Id = Listing.City 
INNER JOIN State ON State.Id = City.State 
INNER JOIN `PropertyType` ON `PropertyType`.Id = Listing.`PropertyType`  
WHERE Listing.Id = :listing_ID_selected_from_browse_character_page


-- get all features to populate a dropdown for associating with listing
SELECT Id, Name FROM Feature

-- get a specific listing with its current associated features to list or modify
-- Using select all for now.
SELECT *
--SELECT Feature.Name 

FROM Feature 
INNER JOIN `ListingFeature` ON Feature.Id = `ListingFeature`.Feature 
INNER JOIN Listing on Listing.Id = `ListingFeature`.Listing 
WHERE Listing.Id = :Listing_ID_selected_from_browse_listing_page

-- add a new State
INSERT INTO State (name) VALUES (:stateNameInput)

-- add a new City
INSERT INTO City (name, state) VALUES (:cityNameInput, :state_id_from_dropdown)

-- add a new ZipCode
INSERT INTO `ZipCode` (code) VALUES (:zipCodeInput)

-- add a new PropertyType
INSERT INTO `PropertyType` (name) VALUES (:propertyTypeNameInput)

-- add a new Feature
INSERT INTO Feature (name) VALUES (:featureNameInput)

-- add a new Listing
INSERT INTO Listing (address, city, zip, propertyType, byOwner, dateListed, listPrice, dateSold, sellPrice) 
VALUES (:addressInput, :city_id_from_dropdown, :zipcode_id_from_dropdown, :propertytype_id_from_dropdown, :byOwnerInput, :dateListedInput, :listPriceInput, :dateSoldInput, :sellPriceInput)

-- associate a listing with a feature (M-to-M relationship addition)
INSERT INTO `ListingFeature` (listingId, featureId) VALUES (:listingIdInput, :featureId_from_dropdown_Input)

-- update a listing's data based on submission of the Update listing form 
UPDATE Listing SET 
	Address = :addressInput, 
	City = :city_id_from_dropdown, 
	`PropertyType` = :propertytype_id_from_dropdown, 
	`ByOwner` = :homeworld_id_from_dropdown_Input, 
	`DateListed` = :dateListedInput, 
	`ListPrice` = :listPriceInput, 
	`DateSold` = :dateSoldInput, 
	`SellPrice` = :sellPriceInput 
WHERE Id= :listing_ID_from_the_update_form

-- delete a Listing
DELETE FROM Listing WHERE id = :Listing_ID_selected_from_browse_listing_page

-- dis-associate a feature from a listing (M-to-M relationship deletion)
DELETE FROM `ListingFeature` WHERE Listing = :Listing_ID_selected_from_browse_listing_page AND Feature = :Feature_ID_selected_from_feature_list_for_Listing
