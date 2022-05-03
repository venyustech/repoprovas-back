import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import searchByRouter from "./searchByRouter.js";
import testRouter from "./testRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(testRouter);
router.use(categoryRouter);
router.use(searchByRouter);

export default router;
