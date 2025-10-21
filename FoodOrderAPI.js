const express = require("express");
const app = express();
app.use(express.json());
const foodRoutes = require("./Routes/foodOrder.route");

// ===============================
// Food Order API
// ===============================
// GOAL:
// Build a small Express.js API with only TWO routes:
//   1️⃣ GET  /menu     -> list available food items
//   2️⃣ POST /orders   -> place a new order (with simple coupon support)

// -------------------------------
// ✅ Example of "database"
// -------------------------------
app.use("/api", foodRoutes);

// ===============================
// ROUTE 1: GET /menu
// ===============================

//app.get("/menu", (req, res) => {
  
  // TODO(1): return the list of all menu items in JSON format.
  // Example response:
  // [
  //   { "id":1, "name":"Margherita Pizza", "price":6000, "stock":20, "tags":["pizza","veg"] },
  //   ...
  // ]
  //
  // Optional:
  // - Support ?tag=pizza to filter items by tag (e.g. GET /menu?tag=pizza)
//});
if (item){
  for ()
}
// ===============================
// ROUTE 2: POST /orders
// ===============================
//app.post("/orders", (req, res) => {
  // TODO(2): receive JSON body with the format:
  // {
  //   "items": [ { "id": 1, "qty": 2 }, { "id": 4, "qty": 1 } ],
  //   "coupon": "SAVE10"
  // }
  // Steps to implement:





const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Food Order API running on http://localhost:${PORT}`)
);
