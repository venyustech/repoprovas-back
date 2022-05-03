import { Request, Response } from "express";
import searchByService from "../services/searchByService.js";

async function searchBy(req: Request, res: Response) {
    const disciplineName = req.query.discipline;
    const teacherName = req.query.teacher;

    if(disciplineName){
        const searchByDiscipline = await searchByService.searchByDisciplines(disciplineName)
        return res.send({ searchByDiscipline });
    }
    if(teacherName){
        const searchByteacher = await searchByService.searchByTeacher(teacherName);
       return res.send({ searchByteacher });
    }

}

export default { searchBy };