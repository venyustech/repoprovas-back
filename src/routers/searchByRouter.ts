import { Router } from "express";
import disciplineController from "../controllers/disciplineController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const searchByRouter = Router();

searchByRouter.get("/disciplines/searchBy", ensureAuthenticatedMiddleware, disciplineController.searchBy);

export default searchByRouter;