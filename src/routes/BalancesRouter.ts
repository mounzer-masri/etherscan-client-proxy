import express  from "express";
import controller from "../controllers/BalancesController"

const router = express.Router();
router.get('/get-balances-of-addresses', controller.getAccountsBalancesApi);

export = router;
