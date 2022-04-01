const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (req, res) => {
  res.render('transfer');
});

router.post('/transfer', (req, res) => {
  const amount = parseInt(req.body.amount);

  accounts[req.body.from].balance -= amount;
  accounts[req.body.to].balance += amount;
  writeJSON();
  res.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

router.post('/payment', (req, res) => {
  const amount = parseInt(req.body.amount);

  accounts.credit.balance -= amount;
  accounts.credit.available += amount;
  writeJSON();
  res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

module.exports = router;
