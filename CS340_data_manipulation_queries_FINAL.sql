-- These are some Database Manipulation queries for our real estate listings website

-- get all Cities and State Ids and Names to populate dropdowns when creating or editing a listing
SELECT City.Id, City.Name, State.Name as State 
FROM City 
INNER JOIN State ON City.State = State.Id 
ORDER BY City.Name ASC

--get all zip-codes for dropdowns in listing
SELECT Code 
FROM ZipCode 
ORDER BY Code


--get all zip-codes for dropdowns in listing
SELECT Id, Name 
FROM PropertyType 
ORDER BY Name


-- get all listings for the browse listings 
SELECT Listing.Id, Listing.Address, City.Name as City, Listing.ZipCode, PropertyType.Name as PropertyType, Listing.ByOwner, Listing.DateListed, Listing.ListPrice, Listing.DateSold, Listing.SellPrice 
FROM Listing 
INNER JOIN City ON Listing.City = City.Id 
INNER JOIN PropertyType ON Listing.PropertyType = PropertyType.Id

--get all listing features for listing feature page
SELECT ListingFeature.Listing, ListingFeature.Feature, Feature.Name as FeatureName 
FROM `ListingFeature`
INNER JOIN Feature on ListingFeature.Feature = Feature.Id 
WHERE ListingFeature.Listing=:idpassedinurl

--get all features for feature page and dropdown on listing feature page
SELECT Id, Name FROM Feature

--get all property types for property-type page
SELECT * FROM `PropertyType`

--get all states for the state page and dropdown for city page
SELECT * FROM State

--get all zip codes for zip code page
SELECT * FROM `ZipCode`

--get all cities for city page
SELECT City.Id, City.Name, State.Name as State 
FROM City 
INNER JOIN State 
WHERE City.State = State.Id 
ORDER BY State.Name, City.Name

-- get a single state's data for the Update state form
SELECT Id, Name FROM State WHERE Id = :id_selected_from_browse_state_page LIMIT 1
-- get a single city's data for the Update city form
SELECT Id, Name, State FROM City WHERE Id = :id_selected_from_browse_city_page LIMIT 1
-- get a single feature's data for the Update feature form
SELECT Id, Name FROM Feature WHERE Id = :id_selected_from_browse_features_page LIMIT 1
-- get a single property-type's data for the Update property-type form
SELECT Id, Name FROM PropertyType WHERE Id = :id_selected_from_browse_propertytypes_page LIMIT 1

-- get a single listing's data for the Update Listing form or view a specific listing page
SELECT Listing.Address, City.Name, State.Name, `PropertyType`.Name, Listing.`ZipCode`, Listing.`ByOwner`, Listing.`DateListed`, Listing.`ListPrice`, Listing.`DateSold`, Listing.`SellPrice` 
FROM Listing 
INNER JOIN City ON City.Id = Listing.City 
INNER JOIN State ON State.Id = City.State 
INNER JOIN `PropertyType` ON `PropertyType`.Id = Listing.`PropertyType`  
WHERE Listing.Id = :listing_ID_selected_from_browse_listing_page


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

--check for duplicate state when adding a new state
SELECT Id FROM State WHERE Name = ? LIMIT 1

-- add a new State
INSERT INTO State (name) VALUES (:stateNameInput)

--check for duplicate city
SELECT Id FROM City WHERE Name = ? and State = ? LIMIT 1

-- add a new City
INSERT INTO City (name, state) VALUES (:cityNameInput, :state_id_from_dropdown)

--check for duplicate zip code
SELECT Code FROM ZipCode WHERE Code = ? LIMIT 1

-- add a new ZipCode
INSERT INTO `ZipCode` (code) VALUES (:zipCodeInput)

--check for duplicate property type when a adding a property
SELECT Id FROM PropertyType WHERE Name = ? LIMIT 1

-- add a new PropertyType
INSERT INTO `PropertyType` (name) VALUES (:propertyTypeNameInput)

--check for duplicate feature
SELECT Id FROM Feature WHERE Name = ? LIMIT 1

-- add a new Feature
INSERT INTO Feature (name) VALUES (:featureNameInput)

-- add a new Listing
INSERT INTO Listing (address, city, zip, propertyType, byOwner, dateListed, listPrice, dateSold, sellPrice) 
VALUES (:addressInput, :city_id_from_dropdown, :zipcode_id_from_dropdown, :propertytype_id_from_dropdown, :byOwnerInput, :dateListedInput, :listPriceInput, :dateSoldInput, :sellPriceInput)

--check for duplicate listing feature when adding a listing feature
SELECT Listing FROM ListingFeature WHERE Listing = ? and Feature = ? LIMIT 1

-- associate a listing with a feature (M-to-M relationship addition)
INSERT INTO `ListingFeature` (listingId, featureId) VALUES (:listingIdInput, :featureId_from_dropdown_Input)


--check for duplicate state when updating a state
SELECT Id FROM State WHERE Name = :nameInput and Id <> :id_from_the_update_form LIMIT 1
--update a single state
UPDATE State SET Name=:nameInput WHERE Id=:id_from_the_update_form

--check for duplicate city when updating a city
SELECT Id FROM City WHERE Name = :nameInput and State= :state_id_from_dropdown and Id <> :id_from_the_update_form LIMIT 1
--update a single city
UPDATE City SET Name=:nameInput, State=:state_id_from_dropdown WHERE Id=:id_from_the_update_form

--check for duplicate feature when updating a feature
SELECT Id FROM Feature WHERE Name = :nameInput and Id <> :id_from_the_update_form LIMIT 1
--update a single feature
UPDATE Feature SET Name=:nameInput WHERE Id=:id_from_the_update_form

--check for duplicate PropertyType when updating a PropertyType
SELECT Id FROM PropertyType WHERE Name = :nameInput and Id <> :id_from_the_update_form LIMIT 1
--update a single PropertyType
UPDATE PropertyType SET Name=:nameInput WHERE Id=:id_from_the_update_form


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

--delete a state
DELETE FROM State WHERE Id=:state_ID_selected_from_browse_state_page
--delete a zipcode
DELETE FROM ZipCode WHERE Code=:zipcode_selected_from_browse_zipcode_page
--delete a city
DELETE FROM City WHERE Id=:city_ID_selected_from_browse_city_page
--delete a feature
DELETE FROM Feature WHERE Id=:feature_ID_selected_from_browse_feature_page
--delete a propertytype
DELETE FROM PropertyType WHERE Id=:propertytype_ID_selected_from_browse_propertytype_page
--delete a listing
DELETE FROM Listing WHERE id = :Listing_ID_selected_from_browse_listing_page

-- dis-associate a feature from a listing (M-to-M relationship deletion)
DELETE FROM `ListingFeature` WHERE Listing = :Listing_ID_selected_from_browse_listing_page AND Feature = :Feature_ID_selected_from_feature_list_for_Listing
