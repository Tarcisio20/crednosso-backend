import { Router } from "express";
import * as auth from '../controllers/auth'
import * as user from '../controllers/user'
import * as log from '../controllers/log'
import * as atm from '../controllers/atm'

const router = Router();

router.get("/ping", auth.validate,  (req, res) => res.json({ pong: true, admin : true }));
router.get("/user",auth.validate, user.getAll);
router.post("/user",auth.validate, user.create);
router.get("/user/:id",auth.validate, user.getUser);
router.put("/user/:id",auth.validate, user.updateUser);
router.delete("/user/:id",auth.validate, user.deleteUser);
router.post("/user/search",auth.validate, user.searchUser);

router.get("/log", auth.validate, log.getAll)
router.get("/log/user/:id", auth.validate, log.getForUser)

router.get("/atm", auth.validate, atm.getAll)

export default router;
