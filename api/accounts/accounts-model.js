const db = require("../../data/db-config");

const getAll = () => {
	return db("accounts");
	// DO YOUR MAGIC
};

const getById = (id) => {
	return db("accounts").where("id", id).first();
	// DO YOUR MAGIC
};

const create = async ({ name, budget }) => {
	const [id] = await db("accounts").insert({ name, budget });
	return getById(id);
	// DO YOUR MAGIC
};

const updateById = async (id, { name, budget }) => {
	await db("accounts").where("id", id).update({ name, budget });
	return getById(id);
	// DO YOUR MAGIC
};

const deleteById = async (id) => {
	const deletedAccount = await getById(id);
	await db("accounts").where("id", id).delete();
	return deletedAccount;
	// DO YOUR MAGIC
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};
