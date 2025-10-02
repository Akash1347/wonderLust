const mongoose = require('mongoose');
const Review = require("./review.js");

const Schema = mongoose.Schema;

const default_img = "https://s3.envato.com/files/ddb708ea-bb7c-4a08-b30a-497c03878227/inline_image_preview.jpg";
const listingShema = new Schema({
    title :{
        type : String,
        required : true,
    },
    description : String,
    image : {
         url : String,
         finalname : String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },

    geometry : {
        type : {
            type : String,
            enum : ['Point'],
            required : true,
        },
        coordinates : {
            type : [Number],
            required : true,
        }
    }


});

listingShema.post('findOneAndDelete' ,async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id : {
                $in : listing.reviews
            }
        });
    }
});
const Listing = mongoose.model("Listing" ,listingShema);
module.exports = Listing;
