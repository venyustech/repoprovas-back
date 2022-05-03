import { Router } from "express";
import disciplineController from "../controllers/disciplineController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const disciplineRouter = Router();

disciplineRouter.get("/disciplines/searchBy", ensureAuthenticatedMiddleware, disciplineController.searchBy);

export default disciplineRouter;