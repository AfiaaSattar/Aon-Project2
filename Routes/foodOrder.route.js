const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodOrder.controller");

// GET /api/menu
router.get("/menu", (req, res) => {
  const id = req.query.id;
  const result = foodController.getMenu(id);
  res.json(result);
});

// POST /api/orders
router.post("/orders", (req, res) => {
  const orderResult = foodController.placeOrder(req.body);
  if (orderResult.error) {
    return res.status(400).json({ message: orderResult.error });
  }
  res.json(orderResult);
});

module.exports = router;
