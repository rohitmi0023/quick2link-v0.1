const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();

//@route GET api/auth
//@desc Auth route
//@access Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        console.log("Error from server");
        res.status(403).send(`Forbidden`);
    }
});

//@route POST api/auth
//@desc LogIn route
//@access Public
router.post(
    "/",
    [
        check("email", `Please include a valid Email`).isEmail(),
        check("password", `Password is required!`).exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: `Invalid Credentials` }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: `Invalid Credentials` }] });
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 36050595 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            return res.status(500).send(`Server Error...`);
        }
    }
);

module.exports = router;
