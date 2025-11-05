const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Cart = require("../models/carts");

// GET: Récupérer toutes les réservations
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json({ result: true, bookings });
});

// POST: Créer des réservations depuis le panier
router.post("/", async (req, res) => {
  // Récupérer tous les trajets du panier
  const carts = await Cart.find();

  if (carts.length === 0) {
    return res.json({ result: false, error: "Cart is empty" });
  }

  // Créer les bookings
  const bookingsData = carts.map((cart) => ({
    departure: cart.departure,
    arrival: cart.arrival,
    date: cart.date,
    price: cart.price,
  }));

  const bookings = await Booking.insertMany(bookingsData);

  // Vider le panier
  await Cart.deleteMany({});

  res.json({ result: true, bookings });
});

module.exports = router;
