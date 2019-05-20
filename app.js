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

//Provide access to static files
app.use('/public', express.static('public'));

//Renders index.html
app.get('/', function(req, res, next) {

    console.log("index handler has been fired.");

    var context = {};

    res.render('index', context);
})

app.get('/listing', function(req, res, next) {

    console.log("listing handler has been fired.");

    var context = {};

    res.render('listing', context);
})

app.get('/listingFeature', function(req, res, next) {

    console.log("listingFeature handler has been fired.");

    var context = {};

    res.render('listingFeature', context);
})

app.get('/property', function(req, res, next) {

    console.log("property handler has been fired.");

    var context = {};

    res.render('property', context);
})

app.get('/state', function(req, res, next) {

    console.log("state handler has been fired.");

    var context = {};

    res.render('state', context);
})

app.get('/zip', function(req, res, next) {

    console.log("zip handler has been fired.");

    var context = {};

    res.render('zip', context);
})

app.get('/city', function(req, res, next) {

    console.log("city handler has been fired.");

    var context = {};

    res.render('city', context);
})

app.get('/feature', function(req, res, next) {

    console.log("feature handler has been fired.");

    var context = {};

    res.render('feature', context);
})

//Selects a records from 'workouts' table, creates a list of name:value pairs from each field in the db
//Sends the list back to the home page to populate the table
//app.get('/cites', function(req, res, next){

//    console.log("Home page handler has been fired");

//    var context = {};
//    pool.query('SELECT * FROM workouts', function(err, rows, fields){
//    if(err){
//        next(err);
//        console.log(err);
//        return;
//    }
//    var params = [];
//    for(var row in rows){
//        var addItem = {'name': rows[row].name,
//                    'reps': rows[row].reps,
//                    'weight': rows[row].weight,
//                    'date':rows[row].date,
//                    'id':rows[row].id};
//        if(rows[row].lbs){
//            addItem.lbs = "lbs";
//        }
//        else{
//            addItem.lbs = "kg";
//        }
//        params.push(addItem);
//    }
//    context.results = params;
//    res.render('home', context);
//    })
//});

//Inserts a record into the database using AJAX calls from the home page via script
//app.get('/insert',function(req,res,next){
  
//    console.log("Insert handler has been fired");

//    var context = {};
    
//    pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
//        [req.query.name,
//        req.query.reps,
//        req.query.weight,
//        req.query.date,
//        req.query.unit],

//        function(err, result){
//            if(err){
//              next(err);
//              console.log(err);
//              return;
//            }
//            context.inserted = result.insertId;
//            res.send(JSON.stringify(context));
//    })
//});

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