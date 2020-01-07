const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = middleware = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.sendStatus(401).json({ msg: `No token, authorization denied` });
	}
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		next();
	} catch (err) {
		res.sendStatus(401).json({ msg: `Invalid token` });
	}
};
