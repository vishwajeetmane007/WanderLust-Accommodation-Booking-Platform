const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isreviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//reviews
//Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReviews));

// //Delete Review Route
router.delete("/:reviewId", isLoggedIn, isreviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;