const router = require("express").Router();

const { find, create, deleteCustomer } = require("../controllers/customer");
const { checkRole } = require("../middlewares/checkRole");

router.get("/", find);

router.delete("/customerId", checkRole(["director"]), deleteCustomer);

router.post("/", create);

module.exports = router;
