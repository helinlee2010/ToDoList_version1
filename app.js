//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Anywhere below the app variable, tell the app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

//To use EJS as view engine
app.set('view engine','ejs');

let items = ["Coding 👩‍💻", "Music 🎧", "Work out 🏄🏻‍♀️"];
let workItems =[];

let today = new Date();
let currentDay = today.toLocaleDateString('en-US',{ weekday: "long" });

app.get("/", (req,res)=>{
    
    let displayedTitle = "Home"
    //EJS method to render an ejs page ('first param') in views directory
    res.render("list", {day: currentDay, newListItems: items, title: displayedTitle});
    //First Param: an ejs file in views directory
    //Second Parm: an object {key: value} where they key must be exactly the same as variable in that ejs file: <%= key %>

});

// app.get("/", function(req,res){
//     res.sendFile(__dirname + "/index.html");
// });

app.post("/", (req,res)=>{
    if (req.body.list === "Work"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }else{
        //Below line requires body-parser, and it's REQ.body
        items.push(req.body.newItem);
        res.redirect("/");
    }

});

app.get("/work", (req,res)=>{
    displayedTitle = "Work";
    res.render("list", {day: currentDay, newListItems: workItems, title: displayedTitle});
    res.redirect("/work");
});


app.get("/about", (req, res)=>{
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server started on port 3000.");
});