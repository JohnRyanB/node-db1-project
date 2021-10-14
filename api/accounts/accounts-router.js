const router = require("express").Router();
const Accounts = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
	try {
		const data = await Accounts.getAll();
		res.json(data);
	} catch (err) {
		next(err);
	}
	// DO YOUR MAGIC
});

router.get("/:id", mw.checkAccountId, async (req, res, next) => {
	const id = req.params.id;
	try {
		const data = await Accounts.getById(id);
		res.json(data);
	} catch (err) {
		next(err);
	}
	// DO YOUR MAGIC
});

router.post(
	"/",
	mw.checkAccountPayload,
	mw.checkAccountNameUnique,
	async (req, res, next) => {
		try {
			const data = await Accounts.create(req.body);
			res.json(data);
		} catch (err) {
			next(err);
		}
		// DO YOUR MAGIC
	}
);

router.put("/:id", async (req, res, next) => {
	const id = req.params.id;
	try {
		const data = await Accounts.updateById(id, req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
	// DO YOUR MAGIC
});

router.delete("/:id", async (req, res, next) => {
	const id = req.params.id;
	try {
		const data = await Accounts.deleteById(id);
		res.json(data);
	} catch (err) {
		next(err);
	}
	// DO YOUR MAGIC
});

router.use((err, req, res) => {
	// eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
	// DO YOUR MAGIC
});

module.exports = router;
