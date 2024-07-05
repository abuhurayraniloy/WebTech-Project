import Turf from "../models/Turf.js";
import Slot from "../models/Slot.js";

export const createTurf = async (req, res, next) => {
  const newTurf = new Turf(req.body);

  try {
    const savedTurf = await newTurf.save();
    res.status(200).json(savedTurf);
  } catch (err) {
    next(err);
  }
};
export const updateTurf = async (req, res, next) => {
  try {
    const updatedTurf = await Turf.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTurf);
  } catch (err) {
    next(err);
  }
};
export const deleteTurf = async (req, res, next) => {
  try {
    await Turf.findByIdAndDelete(req.params.id);
    res.status(200).json("Turf has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getTurf = async (req, res, next) => {
  try {
    const turf = await Turf.findById(req.params.id);
    res.status(200).json(turf);
  } catch (err) {
    next(err);
  }
};
export const getTurfs = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const turfs = await Turf.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(turfs);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Turf.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const turfCount = await Turf.countDocuments({ type: "turf" });
    const apartmentCount = await Turf.countDocuments({ type: "apartment" });
    const resortCount = await Turf.countDocuments({ type: "resort" });
    const villaCount = await Turf.countDocuments({ type: "villa" });
    const cabinCount = await Turf.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "turf", count: turfCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getTurfSlots = async (req, res, next) => {
  try {
    const turf = await Turf.findById(req.params.id);
    const list = await Promise.all(
      turf.slots.map((slot) => {
        return Slot.findById(slot);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};