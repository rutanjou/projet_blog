var express = require("express"); 
var app = express(); 

app.use(express.static(__dirname + "/public")); 

app.listen(2000, function(){
	console.log("Hello World on 2000")
})