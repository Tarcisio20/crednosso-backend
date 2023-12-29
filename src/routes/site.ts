import { Router } from "express";
import * as auth from '../controllers/auth'
const router = Router();

router.get("/ping", (req, res) => res.json({ pong: true }));
router.get("/login",(req, res)=>{
    return 'Home'
});
router.post("/login", auth.login);


export default router;
