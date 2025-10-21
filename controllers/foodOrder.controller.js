const menu = require("../db/menu.json");
const coupons = require("../db/coupons.json");

// GET /menu
const getMenu = (id) => {
  if (id) {
    return menu.filter(item => item.id === id);
  }
  return menu;
};

// POST /orders
const placeOrder = (orderData) => {
  const { items, coupon } = orderData;
 //   1. Validate that "items" exists and is a non-empty array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return { error: "Items array is required" };
  }

  //   2. For each item:
  //        - Ensure id and qty are valid integers
  //        - Ensure item exists in menu
  //        - Ensure enough stock

  let orderItems = [];
  let subtotal = 0;
 
  for (let item of items) {
    const menuItem = menu.find(m => m.id === item.id);
    if (!menuItem) return { error: `Menu item with id ${item.id} not found` };
    if (item.qty > menuItem.stock) return { error: `Not enough stock for ${menuItem.name}` };

    orderItems.push({
      id: menuItem.id,
      qty: item.qty,
      price: menuItem.price
    });
  //   3. Calculate subtotal (sum of item.price * qty)
    subtotal += menuItem.price * item.qty;
    menuItem.stock -= item.qty;
  }
  //   4. Apply coupon if valid
  let discount = 0;
  let couponCode = null;

  if (coupon) {
    const appliedCoupon = coupons.find(c => c.code === coupon);
    if (appliedCoupon) {
      discount = Math.min(subtotal * (appliedCoupon.percent / 100), appliedCoupon.maxDiscount);
      couponCode = appliedCoupon.code;
    }
  }

  const total = subtotal - discount;
  //   5. Return final JSON response:
  //
  // Example response:
  // {
  //   "currency": "IQD",
  //   "items": [
  //     { "id": 1, "qty": 2, "price": 6000 },
  //     { "id": 4, "qty": 1, "price": 3000 }
  //   ],
  //   "subtotal": 15000,
  //   "coupon": "SAVE10",
  //   "discount": 1500,
  //   "total": 13500,
  //   "createdAt": "2025-10-20T12:34:56.000Z"
  // }
//});
  return {
    currency: "IQD",
    items: orderItems,
    subtotal,
    coupon: couponCode,
    discount,
    total,
    createdAt: new Date().toISOString()
  };
};

module.exports = {
  getMenu,
  placeOrder
};
