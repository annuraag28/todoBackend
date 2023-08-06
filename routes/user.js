import express from "express";
import { getMyProfile, logout, login, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

// router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);

router.get('/me', isAuthenticated, getMyProfile);
router.get('/logout',logout);

export default router;

















//This is dynamic route and we should try putting it in the very last
// router.get('/userid/:id', getMyProfile);
// router.put('/userid/:id', updatedUser);
// router.delete('/userid/:id', deleteUser);

// all the three lines for userid can be done in a single line as follows
// router.route("/userid/:id").get(getMyProfile).put(updatedUser).delete(deleteUser);