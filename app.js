var express = require("express");               
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require("express-handlebars").create({ defaultLayout: "main" });
var mysql = require('./dbcon.js'); //moved Mysql credentials to dbcon.js

app.engine("handlebars", handlebars.engine);       
app.set("view engine", "handlebars");
app.set("port", 2743);                              
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//function to format a number into formatted usd string: https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-currency-string-in-javascript
function formatMoney(n) {
    if (!n || n == null) {
        return '';
    } else {
        var c = 0,
            d = ".",
            t = ",",
            s = n < 0 ? "-$" : "$",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

};

function formatDate(date) {
    if (!date || date == null) {
        return '';
    } else {
        var d = new Date(date);
        if (isNaN(d.getMonth())) {
            return '';
        } else {
            month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [month, day, year].join('/');
        }
    }

}


//format date string for a date input
function formatDate_Input(date) {
    if (!date || date == null) {
        return '';
    } else {
        var d = new Date(date);
        if (isNaN(d.getMonth())) {
            return '';
        } else {
            month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
    }

}

//Provide access to static files (CSS & JS)
app.use('/public', express.static('public'));

//Renders index.html
app.get('/', function(req, res, next) {
    var context = {};

    res.render('index', context);
});

app.get('/listing', function(req, res, next) {

    var context = {};
	
    mysql.pool.query('SELECT Listing.Id, Listing.Address, City.Name as City, '+
        'Listing.ZipCode, PropertyType.Name as PropertyType, Listing.ByOwner, ' +
        'Listing.DateListed, Listing.ListPrice, Listing.DateSold, Listing.SellPrice ' +
        'FROM Listing INNER JOIN City ON Listing.City = City.Id INNER JOIN PropertyType ON Listing.PropertyType = PropertyType.Id', function(err, rows, fields){
		
		if(err){
			(err);
			console.log(err);
			return;
		}
		
		var params = [];
	
		for(var row in rows){
            var addItem = {
                'Id': rows[row].Id,
                'Address': rows[row].Address,
                'City': rows[row].City,
                'ZipCode': rows[row].ZipCode,
                'PropertyType': rows[row].PropertyType,
                'ByOwner': (rows[row].ByOwner? "Yes" : ""),
                'DateListed': formatDate(rows[row].DateListed),
                'ListPrice': formatMoney(rows[row].ListPrice),
                'DateSold': formatDate(rows[row].DateSold),
                'SellPrice': formatMoney(rows[row].SellPrice)
            };
					
			params.push(addItem);
		}
	
        context.results = params;

            mysql.pool.query('SELECT City.Id, City.Name, State.Name as State FROM City INNER JOIN State ON City.State = State.Id ORDER BY City.Name ASC', function (err, rows, fields) {

                if (err) {
                    next(err);
                    console.log(err);
                    return;
                }

                context.cities = rows;

                mysql.pool.query('SELECT Code FROM ZipCode ORDER BY Code', function (err, rows, fields) {

                    if (err) {
                        next(err);
                        console.log(err);
                        return;
                    }

                    context.zips = rows;

                    mysql.pool.query('SELECT Id, Name FROM PropertyType ORDER BY Name', function (err, rows, fields) {

                        if (err) {
                            next(err);
                            console.log(err);
                            return;
                        }

                        context.property = rows;

                        res.render('listing', context);
                    });

                });

            });
	})
});

app.get('/listingFeature', function(req, res, next) {

    var context = {};
    context.Listing = {
        Id: [req.query.id]
    };
    mysql.pool.query('SELECT ListingFeature.Listing, ListingFeature.Feature, Feature.Name as FeatureName FROM `ListingFeature` ' +
        'INNER JOIN Feature on ListingFeature.Feature = Feature.Id WHERE ListingFeature.Listing=?', [req.query.id], function (err, rows, fields) {

            if (err) {

                next(err);
                console.log(err);
                return;
            }

            var params = [];

            for (var row in rows) {

                var addItem = {
                    'Listing': rows[row].Listing,
                    'Feature': rows[row].Feature,
                    'FeatureName': rows[row].FeatureName,
                };

                params.push(addItem);
            }

            context.results = params;
            mysql.pool.query('SELECT Id, Name FROM Feature', function (err, rows, fields) {

                if (err) {

                    next(err);
                    console.log(err);
                    return;
                }

                context.features = rows;

                res.render('listingFeature', context);

            })
        })
});

app.get('/property', function(req, res, next) {

    var context = {};
	
    mysql.pool.query('SELECT * FROM `PropertyType`', function(err, rows, fields){
		
		if(err){
		
			next(err);
			console.log(err);
			return;
		}
	
		var params = [];
	
		for(var row in rows){
		
			var addItem = {'Id': rows[row].Id,
						   'Name': rows[row].Name};
		
			params.push(addItem);
		}
	
		context.results = params;

		res.render('property', context);
	
	})
});

app.get('/state', function(req, res, next) {

    var context = {};
	
    mysql.pool.query('SELECT * FROM State', function(err, rows, fields){
		
		if(err){
		
			next(err);
			console.log(err);
			return;
		}
	
		var params = [];
	
		for(var row in rows){
		
			var addItem = {'Id': rows[row].Id,
						   'Name': rows[row].Name};
		
			params.push(addItem);
		}
	
		context.results = params;

		res.render('state', context);
		
	})
});

app.get('/zip', function(req, res, next) {

    var context = {};
	
    mysql.pool.query('SELECT * FROM `ZipCode`', function(err, rows, fields){
		
		if(err){
		
			next(err);
			console.log(err);
			return;
		}
	
		var params = [];
	
		for(var row in rows){
		
			var addItem = {'Code': rows[row].Code};
		
			params.push(addItem);
		}
	
		context.results = params;

		res.render('zip', context);
		
	})
});

app.get('/city', function(req, res, next) {

    var context = {};
	
    mysql.pool.query('SELECT City.Id, City.Name, State.Name as State FROM City INNER JOIN State WHERE City.State = State.Id ORDER BY State.Name, City.Name', function(err, rows, fields){
		
		if(err){
	
			next(err);
			console.log(err);
			return;
        }
	
		var params = [];
	
		for(var row in rows){
		
			var addItem = {'Id': rows[row].Id,
						   'Name': rows[row].Name, 
					       'State': rows[row].State};
		
			params.push(addItem);
		}
	
        context.results = params;

        mysql.pool.query('SELECT Id, Name FROM State ORDER BY Name ASC', function (err, rows, fields) {

            if (err) {
                next(err);
                console.log(err);
                return;
            }

            var states = [];

            for (var row in rows) {

                var thisItem = {
                    'Id': rows[row].Id,
                    'Name': rows[row].Name
                };

                states.push(thisItem);
            }

            context.states = states;

            res.render('city', context);

        });

		
	})
});

app.get('/feature', function(req, res, next) {

    var context = {};
	
    mysql.pool.query('SELECT * FROM Feature', function(err, rows, fields){
		
		if(err){
		
			next(err);
			console.log(err);
			return;
		}
	
		var params = [];
	
		for(var row in rows){
		
			var addItem = {'Id': rows[row].Id,
						   'Name': rows[row].Name};
		
			params.push(addItem);
		}
	
		context.results = params;

		res.render('feature', context);
		
	})
});

//Inserts a record into Property-Type using AJAX calls from the home page via script
app.get('/insertPropertyType',function(req,res,next){
  
    var context = {};
    context.inserted = 0;

    mysql.pool.query('SELECT Id FROM PropertyType WHERE Name = ? LIMIT 1', [req.query.Name], function (err, rows, fields) {

        if (err) {
            context.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(context));
        } else if (rows.length > 0) {
            //duplicate!
            context.msg = "This property-type already exists.";
            res.send(JSON.stringify(context));
        } else {
            mysql.pool.query("INSERT INTO `PropertyType` (`Name`) VALUES (?)", [req.query.Name],

                function (err, result) {
                    if (err) {
                        context.msg = "An unexpected error has occurred";
                    } else {
                        context.inserted = result.insertId;
                    }
                    res.send(JSON.stringify(context));

                })
        }

    })
    

});

//Inserts a record into Listing-Feature using AJAX calls from the home page via script
app.get('/insertListingFeature', function (req, res, next) {

    var context = {};
    context.insertedListing = 0;
    context.insertedFeature = 0;

    mysql.pool.query('SELECT Listing FROM ListingFeature WHERE Listing = ? and Feature = ? LIMIT 1', [req.query.Listing, req.query.Feature], function (err, rows, fields) {

        if (err) {
            context.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(context));
        } else if (rows.length > 0) {
            //duplicate!
            context.msg = "This feature has already been noted for this listing.";
            res.send(JSON.stringify(context));
        } else {
            mysql.pool.query("INSERT INTO `ListingFeature` (`Listing`, `Feature`) VALUES (?, ?)", [req.query.Listing, req.query.Feature],

                function (err, result) {
                    if (err) {
                        context.msg = "An unexpected error has occurred.";
                    } else {
                        context.insertedListing = req.query.Listing;
                        context.insertedFeature = req.query.Feature;
                    }

                    res.send(JSON.stringify(context));
                })
        }
    })


});

//Inserts a record into State using AJAX calls from the home page via script
app.get('/insertState',function(req,res,next){
  
    var context = {};
    context.inserted = 0;

    mysql.pool.query('SELECT Id FROM State WHERE Name = ? LIMIT 1', [req.query.Name], function (err, rows, fields) {

        if (err) {
            context.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(context));
        } else if (rows.length > 0) {
            //duplicate!
            context.msg = "This state already exists.";
            res.send(JSON.stringify(context));
        } else {

            mysql.pool.query("INSERT INTO `State` (`Name`) VALUES (?)", [req.query.Name],

                function (err, result) {
                    if (err) {
                        context.msg = "An unexpected error has occurred";
                    } else {
                        context.inserted = result.insertId;
                    }

                    res.send(JSON.stringify(context));
                })
        }
    })


});

//Inserts a record into Zip-Code using AJAX calls from the home page via script
app.get('/insertZip',function(req,res,next){
  
    var context = {};
    context.inserted = "";

    mysql.pool.query('SELECT Code FROM ZipCode WHERE Code = ? LIMIT 1', [req.query.Code], function (err, rows, fields) {

        if (err) {
            context.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(context));
        } else if (rows.length > 0) {
            //duplicate!
            context.msg = "This zip-code already exists.";
            res.send(JSON.stringify(context));
        } else {
            mysql.pool.query("INSERT INTO `ZipCode` (`Code`) VALUES (?)",
                [req.query.Code],

                function (err, result) {
                    if (err) {
                        context.msg = "An unexpected error has occurred";
                    } else {
                        context.inserted = req.query.Code;
                    }

                    res.send(JSON.stringify(context));
                })
        }
    })


});

//Inserts a record into City using AJAX calls from the home page via script
app.get('/insertCity',function(req,res,next){
  
    var context = {};
    context.inserted = 0;

    mysql.pool.query('SELECT Id FROM City WHERE Name = ? and State = ? LIMIT 1', [req.query.Name, req.query.State], function (err, rows, fields) {

        if (err) {
            context.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(context));
        } else if (rows.length > 0) {
            //duplicate!
            context.msg = "This city already exists.";
            res.send(JSON.stringify(context));
        } else {
            mysql.pool.query("INSERT INTO `City` (`Name`, `State`) VALUES (?, ?)", [req.query.Name, req.query.State],

                function (err, result) {
                    if (err) {
                        context.msg = "An unexpected error has occurred";
                    } else {
                        context.inserted = result.insertId;
                    }

                    res.send(JSON.stringify(context));
                })

        }
    })
		
});

//Inserts a record into Feature using AJAX calls from the home page via script
app.get('/insertFeature',function(req,res,next){
  
    var context = {};
    context.inserted = 0;

    mysql.pool.query('SELECT Id FROM Feature WHERE Name = ? LIMIT 1', [req.query.Name], function (err, rows, fields) {

        if (err) {
            context.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(context));
        } else if (rows.length > 0) {
            //duplicate!
            context.msg = "This feature already exists.";
            res.send(JSON.stringify(context));
        } else {
            mysql.pool.query("INSERT INTO `Feature` (`Name`) VALUES (?)",
                [req.query.Name],

                function (err, result) {
                    if (err) {
                        context.msg = "An unexpected error has occurred";
                    } else {
                        context.inserted = result.insertId;
                    }

                    res.send(JSON.stringify(context));
                })
        }
    })
});

//Inserts a record into Listing using AJAX calls from the home page via script
app.get('/insertListing',function(req,res,next){
  
    var context = {};
    context.inserted = 0;

    mysql.pool.query("INSERT INTO `Listing` (`Address`, `City`, `ZipCode`, `PropertyType`, `ByOwner`, `DateListed`, `ListPrice`, `DateSold`, `SellPrice`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [req.query.Address,
		 req.query.City,
		 req.query.ZipCode,
		 req.query.PropertyType,
		 req.query.ByOwner,
		 req.query.DateListed,
		 req.query.ListPrice,
		 req.query.DateSold,
		 req.query.SellPrice], 

        function(err, result){
            if (err) {
                context.msg = "An unexpected error has occurred";
                res.send(JSON.stringify(context));

            } else {
                mysql.pool.query('SELECT Listing.Id, Listing.Address, City.Name as City, ' +
                    'Listing.ZipCode, PropertyType.Name as PropertyType, Listing.ByOwner, ' +
                    'Listing.DateListed, Listing.ListPrice, Listing.DateSold, Listing.SellPrice ' +
                    'FROM Listing INNER JOIN City ON Listing.City = City.Id INNER JOIN PropertyType ON Listing.PropertyType = PropertyType.Id WHERE Listing.Id = ? LIMIT 1', [result.insertId], function (err, rows, fields) {
                        if (err) {
                            context.msg = "An unexpected error has occurred";
                        } else {
                            context.Address = rows[0].Address;
                            context.City = rows[0].City;
                            context.ZipCode = rows[0].ZipCode;
                            context.PropertyType = rows[0].PropertyType;
                            context.ByOwner = (rows[0].ByOwner ? "Yes" : "");
                            context.DateListed = formatDate(rows[0].DateListed);
                            context.ListPrice = formatMoney(rows[0].ListPrice);
                            context.DateSold = formatDate(rows[0].DateSold);
                            context.SellPrice = formatMoney(rows[0].SellPrice);
                        }

                        context.inserted = result.insertId;
                        res.send(JSON.stringify(context));

                    }
                )
            }
			

    })
});


//Displays a State record in an edit form
app.get('/updateState', function (req, res, next) {

    var context = {};

    mysql.pool.query('SELECT Id, Name FROM State WHERE Id = ? LIMIT 1', [req.query.id], function (err, rows, fields) {

        if (err) {
            next(err);
            console.log(err);
            return;
        }

        var thisItem = {
            'Id': rows[0].Id,
            'Name': rows[0].Name,
        };

        context.results = thisItem;
        res.render('update_state', context);
    })
});

//Displays a zip-code record in an edit form
app.get('/updateZip', function (req, res, next) {

    var context = {};

    mysql.pool.query('SELECT Code FROM ZipCode WHERE Code = ? LIMIT 1', [req.query.id], function (err, rows, fields) {

        if (err) {
            next(err);
            console.log(err);
            return;
        }

        var thisItem = {
            'Code': rows[0].Code,
        };

        context.results = thisItem;
        res.render('update_zip', context);
    })
});


//Displays a City record in an edit form with State options to select from
app.get('/updateCity', function (req, res, next) {

    var context = {};

    mysql.pool.query('SELECT Id, Name, State FROM City WHERE Id = ? LIMIT 1', [req.query.id], function (err, rows, fields) {

        if (err) {
            next(err);
            console.log(err);
            return;
        }

        var states = [];

        var thisItem = {
            'Id': rows[0].Id,
            'Name': rows[0].Name,
            'State': rows[0].State
        };

        context.results = thisItem;

        mysql.pool.query('SELECT Id, Name FROM State ORDER BY Name ASC', function (err, rows, fields) {

            if (err) {
                next(err);
                console.log(err);
                return;
            }

            for (var row in rows) {

                var thisItem = {
                    'Id': rows[row].Id,
                    'Name': rows[row].Name
                };

                states.push(thisItem);
            }

            context.states = states;

            res.render('update_city', context);
        });

    })
});


//Displays a Feature record in an edit form
app.get('/updateFeature', function (req, res, next) {

    var context = {};

    mysql.pool.query('SELECT Id, Name FROM Feature WHERE Id = ? LIMIT 1', [req.query.id], function (err, rows, fields) {

        if (err) {
            next(err);
            console.log(err);
            return;
        }

        var thisItem = {
            'Id': rows[0].Id,
            'Name': rows[0].Name,
        };

        context.results = thisItem;
        res.render('update_feature', context);
    })
});


//Displays a property-type record in an edit form
app.get('/updateProperty', function (req, res, next) {

    var context = {};

    mysql.pool.query('SELECT Id, Name FROM PropertyType WHERE Id = ? LIMIT 1', [req.query.id], function (err, rows, fields) {

        if (err) {
            next(err);
            console.log(err);
            return;
        }

        var thisItem = {
            'Id': rows[0].Id,
            'Name': rows[0].Name,
        };

        context.results = thisItem;
        res.render('update_property', context);
    })
});

//Displays a Listing record in an edit form with options to select from
app.get('/updateListing', function (req, res, next) {

    var context = {};

    mysql.pool.query('SELECT Id, Address, City, ZipCode, PropertyType, ByOwner, DateListed, ListPrice, DateSold, SellPrice FROM Listing WHERE Id = ? LIMIT 1', [req.query.id], function (err, rows, fields) {

        if (err) {
            next(err);
            console.log(err);
            return;
        }

        var cities = [];

        context.results = rows[0];
        context.results.DateListed = formatDate_Input(context.results.DateListed);
        context.results.DateSold = formatDate_Input(context.results.DateSold);




        mysql.pool.query('SELECT City.Id, City.Name, State.Name as State FROM City INNER JOIN State ON City.State = State.Id ORDER BY City.Name ASC', function (err, rows, fields) {

            if (err) {
                next(err);
                console.log(err);
                return;
            }

            context.cities = rows;

            mysql.pool.query('SELECT Code FROM ZipCode ORDER BY Code', function (err, rows, fields) {

                if (err) {
                    next(err);
                    console.log(err);
                    return;
                }

                context.zips = rows;

                mysql.pool.query('SELECT Id, Name FROM PropertyType ORDER BY Name', function (err, rows, fields) {

                    if (err) {
                        next(err);
                        console.log(err);
                        return;
                    }

                    context.property = rows;

                    res.render('update_listing', context);
                });

            });

        });

    })
});


//updates a state record with values submitted by the user.
app.put('/updateState/:id', function (req, res) {
    var response = {success: 0, msg: ""} 
    var inserts = [req.body.Name, req.params.id];

    mysql.pool.query('SELECT Id FROM State WHERE Name = ? and Id <> ? LIMIT 1', inserts, function (err, rows, fields) {
        if (err) {
            response.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(response));
        } else if (rows.length > 0) {
            //duplicate!
            response.msg = "This state already exists.";
            res.send(JSON.stringify(response));
        } else {
            sql = mysql.pool.query("UPDATE State SET Name=? WHERE Id=?", inserts, function (error, results, fields) {
                res.setHeader('Content-Type', 'application/json');
                console.log(results);
                if (error) {
                    response.msg = "An unexpected error has occurred.";
                    res.end(JSON.stringify(error));
                } else {
                    response.status = 200;
                    response.success = 1

                    res.status(200);
                    res.end(JSON.stringify(response));
                }
            });
        }
    })


});




//updates a City record with values submitted by the user.
app.put('/updateCity/:id', function (req, res) {
    var response = { success: 0, msg: "" } 

    mysql.pool.query('SELECT Id FROM City WHERE Name = ? and State= ? and Id <> ? LIMIT 1', [req.body.Name, req.body.State, req.params.id], function (err, rows, fields) {
        if (err) {
            response.msg = "An unexpected error has occurred.";
            res.send(JSON.stringify(response));
        } else if (rows.length > 0) {
            //duplicate!
            response.msg = "This city already exists.";
            res.send(JSON.stringify(response));
        } else {
            sql = mysql.pool.query("UPDATE City SET Name=?, State=? WHERE Id=?", [req.body.Name, req.body.State, req.params.id], function (error, results, fields) {
                res.setHeader('Content-Type', 'application/json');
                if (error) {
                    response.msg = "An unexpected error has occurred.";
                    res.end(JSON.stringify(error));
                } else {
                    response.status = 200;
                    response.success = 1

                    res.status(200);
                    res.end(JSON.stringify(response));
                }
            });
        }
    })


});


//updates a Feature record with values submitted by the user.
app.put('/updateFeature/:id', function (req, res) {
    var response = { success: 0, msg: "" } 

    mysql.pool.query('SELECT Id FROM Feature WHERE Name = ? and Id <> ? LIMIT 1', [req.body.Name, req.params.id], function (err, rows, fields) {
        if (err) {
            response.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(response));
        } else if (rows.length > 0) {
            //duplicate!
            response.msg = "This property-type already exists.";
            res.send(JSON.stringify(response));
        } else {
            sql = mysql.pool.query("UPDATE Feature SET Name=? WHERE Id=?", [req.body.Name, req.params.id], function (error, results, fields) {
                res.setHeader('Content-Type', 'application/json');
                if (error) {
                    response.msg = "An unexpected error has occurred.";
                    res.end(JSON.stringify(error));
                } else {
                    response.status = 200;
                    response.success = 1

                    res.status(200);
                    res.end(JSON.stringify(response));
                }
            });
        }
    })


});


//updates a Property-Type record with values submitted by the user.
app.put('/updateProperty/:id', function (req, res) {
    var response = { success: 0, msg: "" } 

    mysql.pool.query('SELECT Id FROM PropertyType WHERE Name = ? and Id <> ? LIMIT 1', [req.body.Name, req.params.id], function (err, rows, fields) {
        if (err) {
            response.msg = "An unexpected error has occurred";
            res.send(JSON.stringify(response));
        } else if (rows.length > 0) {
            //duplicate!
            response.msg = "This property-type already exists.";
            res.send(JSON.stringify(response));
        } else {
            sql = mysql.pool.query("UPDATE PropertyType SET Name=? WHERE Id=?", [req.body.Name, req.params.id], function (error, results, fields) {
                res.setHeader('Content-Type', 'application/json');
                if (error) {
                    response.msg = "An unexpected error has occurred.";
                    res.end(JSON.stringify(error));
                } else {
                    response.status = 200;
                    response.success = 1

                    res.status(200);
                    res.end(JSON.stringify(response));
                }
            });
        }
    })


});




//updates a listing record with values submitted by the user.
app.put('/updateListing/:id', function (req, res) {
    var response = { success: 0, msg: "" } 

    var sql = "UPDATE Listing SET Address=?, City=?, ZipCode=?, PropertyType=?, ByOwner=?, DateListed=?, ListPrice=?, DateSold=?, SellPrice=? WHERE Id=?";
    var inserts = [
        req.body.Address,
        req.body.City,
        req.body.ZipCode,
        req.body.PropertyType,
        req.body.ByOwner,
        (req.body.DateListed == "" ? null : req.body.DateListed),
        (req.body.ListPrice == "" ? null : req.body.ListPrice),
        (req.body.DateSold == "" ? null : req.body.DateSold),
        (req.body.SellPrice == "" ? null : req.body.SellPrice),
        req.params.id];

    sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            response.msg = "An unexpected error has occurred.";
            res.end(JSON.stringify(error));
        } else {
            response.status = 200;
            response.success = 1

            res.status(200);
            res.end(JSON.stringify(response));
        }
    });
});


// deletes the Property-Type belonging to the passed ID
app.delete('/deleteState/:id', function (req, res) {
    mysql.pool.query("DELETE FROM State WHERE Id=?", [req.params.id], function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log(error)
            res.end(JSON.stringify(error));
        } else {
            var response = {
                status: 200,
                success: 'Updated Successfully'
            }
            res.status(200);
            res.end(JSON.stringify(response));
        }
    });
});

// deletes the Zip-Code belonging to the passed code
app.delete('/deleteZip/:id', function (req, res) {
    mysql.pool.query("DELETE FROM ZipCode WHERE Code=?", [req.params.id], function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log(error)
            res.end(JSON.stringify(error));
        } else {
            var response = {
                status: 200,
                success: 'Updated Successfully'
            }
            res.status(200);
            res.end(JSON.stringify(response));
        }
    });
});

// deletes the City belonging to the passed Id
app.delete('/deleteCity/:id', function (req, res) {
    mysql.pool.query("DELETE FROM City WHERE Id=?", [req.params.id], function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log(error)
            res.end(JSON.stringify(error));
        } else {
            var response = {
                status: 200,
                success: 'Delete Successful'
            }
            res.status(200);
            res.end(JSON.stringify(response));
        }
    });
});


// deletes the Feature belonging to the passed Id
app.delete('/deleteFeature/:id', function (req, res) {
    mysql.pool.query("DELETE FROM Feature WHERE Id=?", [req.params.id], function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log(error)
            res.end(JSON.stringify(error));
        } else {
            var response = {
                status: 200,
                success: 'Delete Successful'
            }
            res.status(200);
            res.end(JSON.stringify(response));
        }
    });
});


// deletes the Property-Type belonging to the passed ID
app.delete('/deleteProperty/:id', function (req, res) {
    mysql.pool.query("DELETE FROM PropertyType WHERE Id=?", [req.params.id], function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log(error)
            res.end(JSON.stringify(error));
        } else {
            var response = {
                status: 200,
                success: 'Delete Successful'
            }
            res.status(200);
            res.end(JSON.stringify(response));
        }
    });
});


// deletes the Listing belonging to the passed ID
app.delete('/deleteListing/:id', function (req, res) {
    mysql.pool.query("DELETE FROM Listing WHERE Id=?", [req.params.id], function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log(error)
            res.end(JSON.stringify(error));
        } else {
            var response = {
                status: 200,
                success: 'Delete Successful'
            }
            res.status(200);
            res.end(JSON.stringify(response));
        }
    });
});


// deletes the Listing-Feature with the passed listing id and feature id
app.delete('/deleteListingFeature/:id', function (req, res) {
    mysql.pool.query("DELETE FROM ListingFeature WHERE Listing=? and Feature=?", [req.body.lid, req.body.fid], function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log(error)
            res.end(JSON.stringify(error));
        } else {
            var response = {
                status: 200,
                success: 'Delete Successful'
            }
            res.status(200);
            res.end(JSON.stringify(response));
        }
    });
});


app.use(function(req, res){                
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});