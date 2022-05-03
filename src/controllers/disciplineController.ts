import { Request, Response } from "express";
import disciplineService from "../services/disciplineService.js";

async function searchByDiscipline(req: Request, res: Response) {
    const disciplineName = req.query.discipline;
    const disciplines = await disciplineService.findDisciplines(disciplineName);
    res.send({ disciplines });
}

export default { searchByDiscipline };