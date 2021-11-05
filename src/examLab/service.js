import ExamLabRepository from './repository.js';
import LabRepository from '../laboratory/repository.js';

async function createExam(exam) {
  return await ExamLabRepository.insertExam(exam)
}

async function getActiveExams() {
  return await ExamLabRepository.getActiveExams();
}

async function updateExam(exam, id){
  return await ExamLabRepository.updateExam(exam, id);
}

async function deleteExam(id){
  return await ExamLabRepository.deleteExam(id);
}

async function getLabs_ExamsById(id) {
  return await ExamLabRepository.getLabs_ExamsById(id);
}

async function getExamById(id) {
  return await ExamLabRepository.getExamById(id);
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

async function getLabsByExamName(name) {
  return await ExamLabRepository.getLabsByExamName(name);
}

export default {
  createExam,
  getActiveExams,
  updateExam,
  deleteExam,
  getLabs_ExamsById,
  getExamById,
  doAssociate,
  doDisassociate,
  getLabsByExamName
}