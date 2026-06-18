import { Router } from "express";
import authRouter from "./auth.routes";

const router = Router();

router.use("/auth", authRouter);

// router.use('/posts', postRouter);

export default router;
