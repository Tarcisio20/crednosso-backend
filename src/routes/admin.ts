import { Router } from "express";
import * as auth from '../controllers/auth'
import * as user from '../controllers/user'
import * as log from '../controllers/log'
import * as atm from '../controllers/atm'
import * as treasury from '../controllers/treasury'
import * as operationType from '../controllers/operation_type'
import * as orderType from '../controllers/order_type'
import * as order from '../controllers/order'
import * as supply from '../controllers/supply'
import * as confirmationType from '../controllers/confirmation_type'

const router = Router();

router.get("/ping", auth.validate,  (req, res) => res.json({ pong: true, admin : true }));

router.get("/user",auth.validate, user.getAll);
router.post("/user",auth.validate, user.create);
router.get("/user/:id",auth.validate, user.getUser);
router.put("/user/:id",auth.validate, user.updateUser);
router.delete("/user/:id",auth.validate, user.deleteUser);
router.post("/user/search",auth.validate, user.searchUser);
router.post("/user/reset/:id",auth.validate, user.resetUser);

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

router.get("/order", auth.validate, order.getAll)
router.post("/order", auth.validate, order.create)
router.get("/order/:id", auth.validate, order.getOrder)
router.put("/order/:id", auth.validate, order.updateOrder)
router.delete("/order/:id", auth.validate, order.deleteOrder)
router.post("/order/search", auth.validate, order.searchOrder)

router.get("/supply", auth.validate, supply.getAll)
router.post("/supply", auth.validate, supply.create)
router.get("/supply/:id", auth.validate, supply.getSupply)
router.put("/supply/:id", auth.validate, supply.updateSupply)
router.delete("/supply/:id", auth.validate, supply.deleteSupply)
router.post("/supply/search/:id", auth.validate, supply.searchSupply)
router.post("/supply/search/atm/:id", auth.validate, supply.searchForIdAtmSupply)

router.get("/confirmation_type", auth.validate, confirmationType.getAll)
router.post("/confirmation_type", auth.validate, confirmationType.create)
router.get("/confirmation_type/:id", auth.validate, confirmationType.getConfirmationType)
router.put("/confirmation_type/:id", auth.validate, confirmationType.updateConfirmationType)
router.delete("/confirmation_type/:id", auth.validate, confirmationType.deleteConfirmationType)

export default router;
