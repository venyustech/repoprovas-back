import disciplineRepository from "../repositories/disciplineRepository.js";

async function findDisciplines(discipline) {
  return disciplineRepository.findByDiscipline(discipline);
}

export default { findDisciplines };