const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Social = require("../../models/Social");
const auth = require("../../middleware/auth");
const router = express.Router();

// @route POST api/social
// desc social route
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
            // let socialListLinkName = await Social.findOne({
            //     [lists.map(list => {
            //         const { linkName } = list;
            //         return linkName;
            //     })]: req.body.linkName
            // });
            // if (socialListLinkName) {
            //     return res.status(400).json({
            //         msg: `LinkName ${req.body.linkName} already exist!`
            //     });
            // }
            // let socialListLink = await Social.findOne({
            //     [lists.map(list => {
            //         const { link } = list;
            //         return link;
            //     })]: req.body.link
            // });
            // if (socialListLink) {
            //     return res
            //         .status(400)
            //         .json({ msg: `Link ${req.body.link} already exist!` });
            // }
            let social = await Social.findOne({ user: req.user.id });
            social = await Social.findOneAndUpdate(
                { user: req.user.id },
                { $push: { lists: [req.body] } },
                { new: true, safe: true, upsert: true }
            );
            let user = await User.findOne({ _id: req.user.id });
            user = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $push: {
                        socialList: social.lists[social.lists.length - 1].id
                    }
                },
                { new: true, safe: true, upsert: true }
            );
            return res.json(social);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(`Server Errors`);
        }
    }
);

// @route GET api/social
// desc social route
// access Private
router.get("/", [auth], async (req, res) => {
    const socialListUser = await Social.find({ user: req.user.id }).populate(
        "socialList"
    );
    return res.json(socialListUser);
});

// @route DELETE api/social/:_id
// desc Delete selected list element from socialList
// access Private
router.delete("/:_id", [auth], async (req, res) => {
    try {
        const socialId = await Social.findOne({ user: req.user.id });
        //Get remove index
        const removeIndexSocial = socialId.lists
            .map(item => item.id)
            .indexOf(req.params._id);
        socialId.lists.splice(removeIndexSocial, 1);
        await socialId.save();
        const userId = await User.findOne({ _id: req.user.id });
        const removeIndexUser = userId.socialList
            .map(item => item.id)
            .indexOf(req.params.id);
        userId.socialList.splice(removeIndexUser, 1);
        await userId.save();
        return res.json(socialId);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
});

module.exports = router;
