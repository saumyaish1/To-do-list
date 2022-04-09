//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const app = express();


var items = ["2 hours DSA \n (lecture and implementation)", "1/2 day of 100 days of Python ", "5 cp problems"];
var workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(req, res) {

    var day = date();
    res.render('lists', { listTitle: day, newListItems: items });
});



app.post("/", function(req, res) {
    var item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    }
    items.push(item);
    res.redirect("/");
});



app.get("/work", function(req, res) {
    res.render("lists", { listTitle: "Work List", newListItems: workItems });
});
app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});

//  if (today.getDay() == 4 || today.getDay() == 1) {
//         day = "Weekend";
//     } else {
//         day = "Weekday";
//     }