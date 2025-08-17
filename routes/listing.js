const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// INDEX
router.get("/", wrapAsync(listingController.index));

// NEW
router.get("/new", isLoggedIn, listingController.renderForm);

// SHOW
router.get("/:id", wrapAsync(listingController.showListing));

// CREATE
router.post("/", isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing));
// router.post("/", upload.single('listing[image]'), (req, res) => {
//     res.send(req.file);
// });

// EDIT
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

// UPDATE
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// DELETE
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Listing = require("../models/listing.js");
// const wrapAsync = require("../utils/wrapasync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema, reviewSchema} = require("../schema.js");

// const validateListing = (req, res, next) => {
//     let {error} = listingSchema.validate(req.body);
//     if(error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };

// //Index Route
// app.get("/", wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", {allListings});
// }));

// //New Route
// app.get("/new", wrapAsync(async (req, res) => {
//     res.render("listings/new.ejs");
// }));

// //Show Route
// app.get("/:id", wrapAsync(async (req, res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs", {listing});
// }));  

// //Create Route
// app.post(
//   "/", validateListing, 
//   wrapAsync(async (req, res) => {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//   })
// );

// //Edit Route
// app.get("/:id/edit", wrapAsync(async (req, res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", {listing});
// }));

// //Update Route
// app.put("/:id", validateListing, wrapAsync( async (req, res) => {
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id, {...req.body.listing});
//     res.redirect(`/listings/${id}`);
// }));

// //Delete Route
// app.delete("/:id", wrapAsync(async (req, res) => {
//     let {id} = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
// }));

// module.exports = router;
