const Spot = require('../models/Spot');
const Booking = require('../models/Booking');
const User = require('../models/User');

module.exports = {
	async store(req, res) {
		const { user_id } = req.headers;
		const { spot_id } = req.params;
		const { date } = req.body;

		let spot = await Spot.findById(spot_id);

		if (!spot) {
			return res.status(400).json({ error: 'Spot does not exists' });
		}

		const booking = await Booking.create({
			user: user_id,
			date,
			spot: spot_id
		});

		await booking.populate('spot').populate('user').execPopulate();

		return res.json(booking);
	}
};
