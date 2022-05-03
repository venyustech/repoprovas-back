import searchByRepository from "../repositories/searchByRepository.js";

async function searchByDisciplines(discipline) {
  return searchByRepository.findByDiscipline(discipline);
}
async function searchByTeacher(teacher) {
  return searchByRepository.findByTeacher(teacher);
}

export default { searchByDisciplines,  searchByTeacher};