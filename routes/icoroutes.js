const express = require("express");
const router = express.Router();

const icoController = require("../controller/icocontroller");

router.get("/balance", icoController.getethBalance);

router.get("/ico", icoController.getICO);

// some routes were removed

router.get("/buyico", icoController.BuyICOToken);

router.get("/sellico", icoController.SellICOToken);

router.get("/changePrice", icoController.ChangePrice);

router.get("/withdraw", icoController.EtherWithdraw);

router.get("/time", icoController.getCurrentTime);

// Installments
router.get("/totalinstallment", icoController.getTotalInstallmentToken);

router.get("/myinstallment", icoController.getMyInstallmentToken);

router.get("/myallinstallment/:address", icoController.getMyAllInstallment);

router.get("/installment", icoController.Installment);

router.get("/icoinstallment", icoController.getICOInstallment);

module.exports = router;
