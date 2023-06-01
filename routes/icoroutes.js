const express = require('express')
const router = express.Router();

const icoController = require('../controller/icocontroller');

router.get('/balance', icoController.getethBalance );

router.get('/ico', icoController.getICO );

router.get('/allico', icoController.getallICO );

router.get('/icomap/:id', icoController.getICOMap );

router.get('/tokenbalance', icoController.gettokenBalance );

router.get('/mybalance', icoController.getMyTokenBalance );

router.get('/events', icoController.getEvents );

router.get('/createico', icoController.CreateICO );

router.get('/buyico', icoController.BuyICOToken );

router.get('/sellico', icoController.SellICOToken );

router.get('/changePrice', icoController.ChangePrice );

router.get('/withdraw', icoController.EtherWithdraw );

router.get('/time', icoController.getCurrentTime );

// Installments
router.get('/totalinstallment', icoController.getTotalInstallmentToken );

router.get('/myinstallment', icoController.getMyInstallmentToken );

router.get('/myallinstallment/:address', icoController.getMyAllInstallment );

router.get('/installment', icoController.Installment );

router.get('/icoinstallment', icoController.getICOInstallment );

module.exports = router;