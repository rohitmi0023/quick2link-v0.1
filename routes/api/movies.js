const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Movies = require("../../models/Movies");
const auth = require("../../middleware/auth");
const router = express.Router();

// @route POST api/movies
// desc movies route
// access Private

router.post(
    "/",
    [
        check("linkName", `LinkName is required`)
            .not()
            .isEmpty(),
        check("link", `Link is required`)
            .not()
            .isEmpty()
    ],
    [auth],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            let movies = await Movies.findOne({ user: req.user.id });
            movies = await Movies.findOneAndUpdate(
                { user: req.user.id },
                { $push: { lists: [req.body] } },
                { new: true, safe: true, upsert: true }
            );
            let user = await User.findOne({ _id: req.user.id });
            user = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $push: {
                        moviesList: movies.lists[movies.lists.length - 1].id
                    }
                },
                { new: true, safe: true, upsert: true }
            );
            return res.json(movies);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Errors");
        }
    }
);

// @route GET api/movies
// desc movies route
// access Private
router.get("/", [auth], async (req, res) => {
    const moviesListUser = await Movies.find({ user: req.user.id }).populate(
        "moviesList"
    );
    return res.json(moviesListUser);
});

// @route DELETE api/movies/:_id
// desc Delete selected list element from moviesList
// access Private
router.delete("/:_id", [auth], async (req, res) => {
    try {
        const moviesId = await Movies.findOne({ user: req.user.id });
        //Get remove index
        const removeIndexMovies = moviesId.lists
            .map(item => item.id)
            .indexOf(req.params._id);
        moviesId.lists.splice(removeIndexMovies, 1);
        await moviesId.save();
        const userId = await User.findOne({ _id: req.user.id });
        const removeIndexUser = userId.moviesList
            .map(item => item.id)
            .indexOf(req.params.id);
        userId.moviesList.splice(removeIndexUser, 1);
        await userId.save();
        return res.json(moviesId);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
});

module.exports = router;
