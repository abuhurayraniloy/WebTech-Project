import express from "express";
import {
  countByCity,
  countByType,
  createTurf,
  deleteTurf,
  getTurf,
  getTurfSlots,
  getTurfs,
  updateTurf,
} from "../controllers/turf.js";
import Turf from "../models/Turf.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createTurf);

//UPDATE
router.put("/:id", verifyAdmin, updateTurf);
//DELETE
router.delete("/:id", verifyAdmin, deleteTurf);
//GET

router.get("/find/:id", getTurf);
//GET ALL

router.get("/", getTurfs);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/slot/:id", getTurfSlots);

export default router;