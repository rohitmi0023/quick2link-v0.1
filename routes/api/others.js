const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Others = require("../../models/Others");
const auth = require("../../middleware/auth");
const router = express.Router();

// @route POST api/others
// desc others route
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json([errors]);
        }
        try {
            let others = await Others.findOne({ user: req.user.id });
            others = await Others.findOneAndUpdate(
                { user: req.user.id },
                { $push: { lists: [req.body] } },
                { new: true, safe: true, upsert: true }
            );
            let user = await User.findOne({ _id: req.user.id });
            user = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $push: {
                        othersList: others.lists[others.lists.length - 1].id
                    }
                },
                { new: true, safe: true, upsert: true }
            );
            return res.json(others);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Errors");
        }
    }
);

// @route GET api/others
// desc others route
// access Private
router.get("/", [auth], async (req, res) => {
    const othersListUser = await Others.find({ user: req.user.id }).populate(
        "othersList"
    );
    return res.json(othersListUser);
});

// @route DELETE api/others/:_id
// desc Delete selected list element from othersList
// access Private
router.delete("/:_id", [auth], async (req, res) => {
    try {
        const othersId = await Others.findOne({ user: req.user.id });
        //Get remove index
        const removeIndexOthers = othersId.lists
            .map(item => item.id)
            .indexOf(req.params._id);
        othersId.lists.splice(removeIndexOthers, 1);
        await othersId.save();
        const userId = await User.findOne({ _id: req.user.id });
        const removeIndexUser = userId.othersList
            .map(item => item.id)
            .indexOf(req.params.id);
        userId.othersList.splice(removeIndexUser, 1);
        await userId.save();
        return res.json(othersId);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
});

module.exports = router;
