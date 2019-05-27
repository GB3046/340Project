var express = require("express");               
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var mysql = require("mysql");

//MySQL Credentials
var pool = mysql.createConnection({
    host:'classmysql.engr.oregonstate.edu',
    user:'cs340_bauergr',
    password:'3228',
    database:'cs340_bauergr'
});

app.engine("handlebars", handlebars.engine);       
app.set("view engine", "handlebars");
app.set("port", 2743);                              
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Provide access to static files (CSS & JS)
app.use('/public', express.static('public'));

//Renders index.html
app.get('/', function(req, res, next) {

    console.log("index handler has been fired.");

    var context = {};

    res.render('index', context);
});

app.get('/listing', function(req, res, next) {

    console.log("listing handler has been fired.");

    console.log("Listing SELECT has been fired");

    var context = {};
	
    pool.query('SELECT * FROM Listing', function(err, rows, fields){
		
		if(err){
		
			(err);
			console.log(err);
			return;
		}
		
		var params = [];
	
		for(var row in rows){
		//console.log(rows[row]);
			var addItem = {'Id': rows[row].Id,
					   'Address': rows[row].Address,
                       'City': rows[row].City,
                       'ZipCode': rows[row].ZipCode,
                       'PropertyType': rows[row].PropertyType,
                       'ByOwner': rows[row].ByOwner,
					   'DateListed': rows[row].DateListed,
					   'ListPrice': rows[row].ListPrice,
					   'DateSold': rows[row].DateSold,
					   'SellPrice': rows[row].SellPrice};
					
			params.push(addItem);
		}
	
		context.results = params;

		res.render('listing', context);
	
	})
});

app.get('/listingFeature', function(req, res, next) {

    console.log("listingFeature handler has been fired.");

    console.log("ListingFeature SELECT has been fired");

    var context = {};
	
    pool.query('SELECT * FROM `ListingFeature`', function(err, rows, fields){
		
    if(err){
		
        next(err);
        console.log(err);
        return;
    }
	
    var params = [];
	
    for(var row in rows){
		
        var addItem = {'Listing': rows[row].Listing,
					   'Feature': rows[row].Feature};
						
        params.push(addItem);
    }
	
    context.results = params;

    res.render('listingFeature', context);
	
	})
});

app.get('/property', function(req, res, next) {

    console.log("property handler has been fired.");
	
	console.log("property-type SELECT has been fired");

    var context = {};
	
    pool.query('SELECT * FROM `PropertyType`', function(err, rows, fields){
		
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

    console.log("state handler has been fired.");

    console.log("state SELECT has been fired");

    var context = {};
	
    pool.query('SELECT * FROM State', function(err, rows, fields){
		
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

    console.log("zip handler has been fired.");

    console.log("zip-code SELECT has been fired");

    var context = {};
	
    pool.query('SELECT * FROM `ZipCode`', function(err, rows, fields){
		
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

    console.log("city handler has been fired.");

    console.log("city SELECT has been fired");

    var context = {};
	
    pool.query('SELECT * FROM City', function(err, rows, fields){
		
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

		res.render('city', context);
		
	})
});

app.get('/feature', function(req, res, next) {

    console.log("feature handler has been fired.");

    console.log("feature SELECT has been fired");

    var context = {};
	
    pool.query('SELECT * FROM Feature', function(err, rows, fields){
		
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
  
    console.log("Insert Property-Type handler has been fired");

    var context = {};
    
    pool.query("INSERT INTO `PropertyType` (`Name`) VALUES (?)",
        [req.query.Name],

        function(err, result){
            if(err){
              next(err);
              console.log(err);
              return;
            }
			
            context.inserted = result.insertId;
            res.send(JSON.stringify(context));
    })
});

//Inserts a record into State using AJAX calls from the home page via script
app.get('/insertState',function(req,res,next){
  
    console.log("Insert State handler has been fired");

    var context = {};
    
    pool.query("INSERT INTO `State` (`Name`) VALUES (?)",
        [req.query.Name],

        function(err, result){
            if(err){
              next(err);
              console.log(err);
              return;
            }
			
            context.inserted = result.insertId;
            res.send(JSON.stringify(context));
    })
});

//Inserts a record into Zip-Code using AJAX calls from the home page via script
app.get('/insertZip',function(req,res,next){
  
    console.log("Insert Zip-Code handler has been fired");

    var context = {};
    
    pool.query("INSERT INTO `ZipCode` (`Code`) VALUES (?)",
        [req.query.Code],

        function(err, result){
            if(err){
              next(err);
              console.log(err);
              return;
            }
			
            context.inserted = result.insertId;
            res.send(JSON.stringify(context));
    })
});

//Inserts a record into City using AJAX calls from the home page via script
app.get('/insertCity',function(req,res,next){
  
    console.log("Insert City handler has been fired");

    var context = {};
    
    pool.query("INSERT INTO `City` (`Name`, `State`) VALUES (?, ?)",
        [req.query.Name,
		 req.query.State], 

        function(err, result){
            if(err){
              next(err);
              console.log(err);
              return;
            }
			
            context.inserted = result.insertId;
            res.send(JSON.stringify(context));
    })
		
});

//Inserts a record into Feature using AJAX calls from the home page via script
app.get('/insertFeature',function(req,res,next){
  
    console.log("Insert Feature handler has been fired");

    var context = {};
    
    pool.query("INSERT INTO `Feature` (`Name`) VALUES (?)",
        [req.query.Name], 

        function(err, result){
            if(err){
              next(err);
              console.log(err);
              return;
            }
			
            context.inserted = result.insertId;
            res.send(JSON.stringify(context));
    })
});

//Inserts a record into Listing using AJAX calls from the home page via script
app.get('/insertListing',function(req,res,next){
  
    console.log("Insert Listing handler has been fired");

    var context = {};
    
    pool.query("INSERT INTO `Listing` (`Address`, `City`, `ZipCode`, `PropertyType`, `ByOwner`, `DateListed`, `ListPrice`, `DateSold`, `SellPrice`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
            if(err){
              next(err);
              console.log(err);
              return;
            }
			
            context.inserted = result.insertId;
            res.send(JSON.stringify(context));
    })
});

//Deletes a record in the database using an id generated from the home page via script
//app.get('/delete', function(req, res, next) {
//    var context = {};
//    pool.query("DELETE FROM `workouts` WHERE id = ?",
//        [req.query.id],
//        function(err, result) {
//            if(err){
//                next(err);
//                console.log(err);
//                return;
//            }
//        });
//});

//Handler gets called when user selects edit from the home page. A separate view with form
//is rendered to facilitate edit of a single record. All records are displayed.
//app.get('/editRecord',function(req, res, next){
//    var context = {};
//    pool.query('SELECT * FROM `workouts` WHERE id=?',
//        [req.query.id],
//        function(err, rows, fields){
//            if(err){
//                next(err);
//                return;
//            }
//            var param = [];

 //           for(var row in rows){
//                var addItem = {'name': rows[row].name,
//                            'reps': rows[row].reps,
//                            'weight': rows[row].weight,
//                            'date':rows[row].date,
//                            'lbs':rows[row].lbs,
//                            'id':rows[row].id};

 //               param.push(addItem);
 //           }

 //       context.results = param[0];
//        res.render('editRecord', context);
//    });
//});

//Selects a single record by 'id' and updates the field(s) with user entered value(s). If no value
//is provided, the existing value is used.
//app.get('/editRecordReturn', function(req, res, next){
//    var context = {};

//    pool.query("SELECT * FROM `workouts` WHERE id=?",
 //       [req.query.id],
//        function(err, result){
 //           if(err){
//                next(err);
//                return;
//            }
 //           if(result.length == 1){
 //               var current = result[0];

                
//                if(req.query.unitCheck === "on"){
//                    req.query.unitCheck = "1";
//               }
 //               else{
//                    req.query.unitCheck = "0";
 //               }

//                pool.query('UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',  //Make a query to UPDATE and require either what the name is now or the updated name
 //               [req.query.exercise || current.name,
 //               req.query.reps || current.reps,
 //               req.query.weight || current.weight,
 //               req.query.date || current.date,
 //               req.query.unitCheck,
 //               req.query.id],
 //               function(err, result){
 //                   if(err){
 //                       next(err);
 //                       return;
  //                  }

 //                   pool.query('SELECT * FROM `workouts`', function(err, rows, fields){
 //                       if(err){
 //                           next(err);
 //                           return;
 //                       }
 //                       var param = [];

  //                      for(var row in rows){
  //                          var addItem = {'name': rows[row].name,
 //                           'reps': rows[row].reps,
 //                           'weight': rows[row].weight,
 //                           'date':rows[row].date,
 //                           'id':rows[row].id};

  //                          if(rows[row].lbs){
  //                              addItem.lbs = "lbs";
  //                          }
  //                          else{
  //                              addItem.lbs = "kg";
  //                          }
  //                          param.push(addItem);
  //                      }

   //                     context.results = param;
   //                     res.render('home', context);
    //                });
    //            });
   //         }
   // });
//  });

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