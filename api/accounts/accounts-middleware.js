const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
	const payload = req.body;
	console.log(typeof payload.name);
	if (!payload.name || !payload.budget) {
		res.status(400).json();
	} else {
		if (
			typeof payload.name === undefined ||
			typeof payload.body === undefined
		) {
			res.status(400).json({ message: "name and budget are required" });
		} else {
			if (typeof payload.name !== "string") {
				res.status(400).json({ message: "name of account must be a string" });
			} else {
				if (
					payload.name.trim().length < 3 ||
					payload.name.trim().length > 100
				) {
					res
						.status(400)
						.json({ message: "name of account must be between 3 and 100" });
				} else {
					if (typeof payload.budget !== "number") {
						res
							.status(400)
							.json({ message: "budget of account must be a number" });
					} else {
						if (payload.budget < 0 || payload.budget > 1000000) {
							res.status(400).json({
								message: "budget of account is too large or too small",
							});
						} else {
							next();
						}
					}
				}
			}
		}
	}

	// DO YOUR MAGIC
};

exports.checkAccountNameUnique = (req, res, next) => {
	const body = req.body;
	Accounts.getAll().then((res) => {
		if (body.name === res.name) {
			res.status(400).json({ message: "that name is taken" });
		} else {
			next();
		}
	});
};

exports.checkAccountId = (req, res, next) => {
	const id = req.params.id;
	Accounts.getById(id).then((accounts) => {
		if (!accounts) {
			res.status(404).json({ message: "account not found" });
		} else {
			next();
		}
	});
	// DO YOUR MAGIC
};
