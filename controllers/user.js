
const User = require('../models/user.js');
const ExpressError = require("../utils/ExpressError.js");

module.exports.signupForm = (req ,res) => {
    res.render("./users/signup.ejs");

};

module.exports.signup = async(req ,res) => {
    try{
        let {email ,username ,password} = req.body;
        console.log(req.body);
        let user = new User({
            email : email,
            username : username,
        })
        let newUser = await User.register(user ,password);

        req.login(newUser ,(err) => {
            if(err){
                return next(err);
            }
            req.flash("success" ,"Welcome to WonderLust");
            res.redirect("/listings");
        });


        
    }catch(e){
        req.flash("error" ,e.message);
        res.redirect("/signup");
    }



};

module.exports.renderLoginForm = (req ,res) => {
    res.render("./users/login.ejs");
};

module.exports.login = (req ,res) => {
       req.flash("success" ,"Welcome to WonderLust");
       const redirectUrl = res.locals.redirectUrl || "/listings";
       delete req.session.redirectUrl; 
       res.redirect(redirectUrl);
    };

module.exports.logout = (req ,res ,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success" ,"you are loggrd out!!");
        res.redirect("/listings");
    })
};
