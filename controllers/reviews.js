const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.postReviews = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save(); // ✅ Save the review first

    listing.reviews.push(newReview._id); // ✅ Push only the ID
    await listing.save(); // ✅ Then save the listing
    req.flash("success", "New Review Created");
    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req, res) => {
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");

    res.redirect(`/listings/${id}`);
};