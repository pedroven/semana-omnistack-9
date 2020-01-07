const User = require('../models/User');

module.exports = {
	async store(req, res) {
		const { email } = req.body;

		let user = await User.findOne({ email });

		if (!user) {
			user = await User.create({ email });
			// .then((res) => {
			// 	console.log(res);
			// 	return res.json(user);
			// })
			// .catch((err) => {
			// 	return res.status(500).send(err);
			// });
		}
		// return res.json({ msg: 'User is already created' });
		return res.json(user);
	}
};
