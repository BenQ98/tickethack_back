const express = require("express");
const router = express.Router();
const Cart = require("../models/carts");

// GET: Récupérer tous les trajets du panier
router.get("/", async (req, res) => {
  const carts = await Cart.find();
  res.json({ result: true, carts });
});

// POST: Ajouter un trajet au panier
router.post("/", async (req, res) => {
  const { departure, arrival, date, price } = req.body;

  const newCart = new Cart({
    departure,
    arrival,
    date,
    price,
  });

  await newCart.save();
  res.json({ result: true, cart: newCart });
});

// DELETE: Supprimer un trajet du panier
router.delete("/:id", async (req, res) => {
  const deletedCart = await Cart.findByIdAndDelete(req.params.id);

  if (deletedCart) {
    res.json({ result: true });
  } else {
    res.json({ result: false, error: "Trip not found" });
  }
});

// DELETE: Vider tout le panier
router.delete("/", async (req, res) => {
  await Cart.deleteMany({});
  res.json({ result: true });
});

module.exports = router;
