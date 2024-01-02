import { Router } from "express";
import * as auth from '../controllers/auth'
import * as user from '../controllers/user'
import * as log from '../controllers/log'
import * as atm from '../controllers/atm'
import * as treasury from '../controllers/treasury'
import * as operationType from '../controllers/operation_type'
import * as orderType from '../controllers/order_type'

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
router.post("/atm", auth.validate, atm.create)
router.get("/atm/:id", auth.validate, atm.getAtm)
router.put("/atm/:id", auth.validate, atm.updateAtm)
router.delete("/atm/:id", auth.validate, atm.deleteAtm)
router.post("/atm/search", auth.validate, atm.searchAtm)

router.get("/treasury", auth.validate, treasury.getAll)
router.post("/treasury", auth.validate, treasury.create)
router.get("/treasury/:id", auth.validate, treasury.getTreasury)
router.put("/treasury/:id", auth.validate, treasury.updateTreasury)
router.delete("/treasury/:id", auth.validate, treasury.deleteTreasury)
router.post("/treasury/search", auth.validate, treasury.searchTreasury)

router.get("/operation_type", auth.validate, operationType.getAll)
router.post("/operation_type", auth.validate, operationType.create)
router.get("/operation_type/:id", auth.validate, operationType.getOperartionType)
router.put("/operation_type/:id", auth.validate, operationType.updateOperartionType)
router.delete("/operation_type/:id", auth.validate, operationType.deleteOperartionType)
router.post("/operation_type/search", auth.validate, operationType.searchOperartionType)

router.get("/order_type", auth.validate, orderType.getAll)
router.post("/order_type", auth.validate, orderType.create)
router.get("/order_type/:id", auth.validate, orderType.getOrderType)
router.put("/order_type/:id", auth.validate, orderType.updateOrderType)
router.delete("/order_type/:id", auth.validate, orderType.deleteOrderType)
router.post("/order_type/search", auth.validate, orderType.searchOrderType)

export default router;
