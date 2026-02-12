import express from "express";
import {
  getProfile,
  updateProfile,
  updateAvatar,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/profileController";
import { protect } from "../middleware/auth";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Profile routes
router.get("/", getProfile);
router.put("/", updateProfile);
router.put("/avatar", updateAvatar);

// Address routes
router.get("/addresses", getAddresses);
router.post("/addresses", addAddress);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);
router.put("/addresses/:addressId/default", setDefaultAddress);

export default router;
