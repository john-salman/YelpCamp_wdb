const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose');

const port = 3601;
const IP = '127.0.0.1';

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);
/*
Campground.create( {
    name: "Dog River",
    image: "https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "A river that smells like dog."
    }, (err, campground) => {
        console.log(err ? err : `New campground created: ${campground}`);// trying to create the least readable error reporting statement
    });
*/
/*
var campgrounds = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Dog River", image: "https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Cat Valley", image: ""},
    {name: "Goat Lake", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Dog River", image: "https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Cat Valley", image: "https://images.unsplash.com/photo-1503377984674-b81eeeedbb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Goat Lake", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Dog River", image: "https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Cat Valley", image: "https://images.unsplash.com/photo-1503377984674-b81eeeedbb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Goat Lake", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
];
*/
app.get('/', (req, res) => {
    res.render("landing");
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, _campgrounds) => {
       if (err) {
           console.log(err);
       } else {
           res.render("index", {campgrounds: _campgrounds});

       }
    });

});


app.post('/campgrounds', (req, res) => {
    let newCampground = {name: req.body.name, image: req.body.image, description: req.body.description};
    Campground.create(newCampground, (err, newObj) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`New object added to collection: ${newObj}`);
            res.redirect('/campgrounds');
        }
    });

});

app.get('/campgrounds/new', (req, res) => { // this needs to be declared first so that "new" doesn't get recognized as an ":id"
    res.render("new");
});

app.get('/campgrounds/:id', (req, res) => { // show route
    Campground.findById(req.params.id, (err, foundCampground) => {
       if (err) {
            console.log(err);
       } else {
           res.render("show", {campground: foundCampground})
       }
    });
});

app.listen(port, IP, () => {
    console.log(`App listening on port: ${port}, at address: ${IP}`);
});