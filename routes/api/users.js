const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

const router = express.Router();

//@route POST api/users
//@desc Registers User
//@access Public
router.post(
    "/",
    [
        check("name", `Name is required`)
            .not()
            .isEmpty(),
        check("email", `Email is required`).isEmail(),
        check("password", `Please enter a password with 6 or more characters`)
            .isLength({ min: 6 })
            .custom((value, { req, loc, path }) => {
                if (value !== req.body.password2) {
                    throw new Error("Passwords don't match");
                } else {
                    return value;
                }
            })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: `User already exists! ` }] });
            }
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            });
            user = new User({
                name,
                email,
                password,
                avatar
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: "356d" },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.mesaage);
            res.status(500).send(`Server Error...`);
        }
    }
);

module.exports = router;
