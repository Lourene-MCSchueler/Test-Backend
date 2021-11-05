import ExamLabRepository from './repository.js';
import LabRepository from '../laboratory/repository.js';

async function createExam(exam) {
  return await ExamLabRepository.insertExam(exam)
}

async function getAllExams() {
  return await ExamLabRepository.getAllExams();
}

async function getActiveExams() {
  return await ExamLabRepository.getActiveExams();
}

async function getExamById(id) {
  return await ExamLabRepository.getExamById(id);
}

async function updateExam(exam){
  return await ExamLabRepository.updateExam(exam);
}

async function deleteExam(id){
  return await ExamLabRepository.deleteExam(id);
}

//----------------------------------associates------------------------------------------//

async function doAssociate({idLab, idExam}) {
  const lab = await LabRepository.getLabById(idLab);
  const exam = await ExamLabRepository.getExamById(idExam);
  if(lab.status === true && exam.status === true){
    return await ExamLabRepository.doAssociate(idExam, idLab);
  }throw new Error("Somente é possivel associar um exame ativo à um laboratório ativo.");   
}

async function doDisassociate(idLab, idExam) {
  const lab = await LabRepository.getLabById(idLab);
  const exam = await ExamLabRepository.getExamById(idExam);
  if(lab.status === true && exam.status === true){
    return await ExamLabRepository.doDisassociate(idExam, idLab);
  } throw new Error("Somente é possivel desassociar um exame ativo de um laboratório ativo.")
}

async function getLabs_Exams(id) {
  return await ExamLabRepository.getLabs_Exams(id);
}

export default {
  createExam,
  getAllExams,
  getActiveExams,
  getExamById,
  updateExam,
  deleteExam,
  doAssociate,
  doDisassociate,
  getLabs_Exams
}