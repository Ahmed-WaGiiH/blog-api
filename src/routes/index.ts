import { Router } from "express";
import authRouter from "./auth.routes";
import postRouter from "./post.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);

export default router;
