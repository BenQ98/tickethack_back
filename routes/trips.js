const express = require("express");
const router = express.Router();
const Trip = require("../models/trips");
const moment = require("moment");

// // Route GET pour rechercher des trajets
// router.get("/:departure/:arrival/:date", async (req, res) => {
//   const { departure, arrival, date } = req.params;

//   // Créer les dates de début et fin pour le jour recherché
//   const startDate = moment(date).startOf("day").toDate();
//   const endDate = moment(date).endOf("day").toDate();

//   const trips = await Trip.find({
//     departure: { $regex: new RegExp(departure, "i") },
//     arrival: { $regex: new RegExp(arrival, "i") },
//     date: { $gte: startDate, $lte: endDate },
//   });

//   if (trips.length > 0) {
//     res.json({ result: true, trips });
//   } else {
//     res.json({ result: false, message: "No trips found" });
//   }
// });

router.get("/", async (req, res) => {
  const { departure, arrival, date } = req.query;

  // Construction dynamique du filtre MongoDB
  const filter = {};

  if (departure) filter.departure = { $regex: new RegExp(departure, "i") }; // Exact match (meilleur pour filtrer correctement)
  if (arrival) filter.arrival = { $regex: new RegExp(arrival, "i") };

  // Filtrage de la date au bon format (00:00 → 23:59)
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    filter.date = { $gte: startDate, $lte: endDate };
  }

  try {
    const trips = await Trip.find(filter);

    if (trips.length > 0) {
      res.json({ result: true, trips });
    } else {
      res.json({ result: false, message: "No trips found" });
    }
  } catch (err) {
    res.status(500).json({ result: false, error: err.message });
  }
});

module.exports = router;
