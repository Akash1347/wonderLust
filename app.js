if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require('mongoose');

const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");

const flash = require('connect-flash');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require('passport');
const localStrategy = require('passport-local');

const Listing = require('./models/listing.js');
const User = require('./models/user.js');


const listingRoutes = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require('./routes/user.js');


const port = process.env.PORT;
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
const mongoUrl = process.env.ATLASDB_URL;


const store = MongoStore.create({
    mongoUrl: mongoUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
    console.log("session store error", e);
});

const seesionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
 

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);




async function main() {
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(mongoUrl);

}
main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });


//flash config
app.use(session(seesionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;

    next();
});
app.get("/", (req, res) => {
    res.redirect("/listings");
});
app.use('/listings', listingRoutes);
app.use('/listings/:id/review', reviewRouter);
app.use('/', userRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;

    res.status(statusCode).render("error.ejs", { message });
});


app.listen(port, () => {
    console.log(`connected to port ${port}`)

});