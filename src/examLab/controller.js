import ExamLabService from './service.js';

async function createExam(req, res, next) {
  try{
    const newExam = req.body;
    if(!newExam.name || !newExam.type){
       throw new Error("Nome e tipo do exame são obrigatórios!");
    }
    const exam = await ExamLabService.createExam(newExam);
    res.send(exam);
  }catch(err){
    next(err);
  }
}

async function getAllExams(req, res, next) {
  try{
    const exams = await ExamLabService.getAllExams();
    res.send(exams);
  }catch(err){
    next(err);
  }
}

async function getActiveExams(req, res, next) {
  try{
    const exams = await ExamLabService.getActiveExams();
    res.send(exams);
  }catch(err){
    next(err);
  }
}

async function getExamById(req, res, next) {
  try{
    const id = req.params.id;
    const exam = await ExamLabService.getExamById(id);
    res.send(exam);
  }catch(err){
    next(err);
  }
}

async function updateExam(req, res, next) {
  try {
    const exam = req.body;
    console.log(exam)
    const keys = Object.keys(exam)
    const hasAllRequiredKeys = keys.some((key) => !['id','name', 'type', 'status'].includes(key))
    console.log(hasAllRequiredKeys);
    if(!hasAllRequiredKeys){
      throw new Error("Nome, tipo do exame são obrigatórios!");
    }
    const updatedExam = await ExamLabService.updateExam(exam);
    res.send(updatedExam);
  }catch(err){
    next(err);
  }
}

async function deleteExam(req, res, next) {
  try {
    const id = req.params.id;
    await ExamLabService.deleteExam(id);
    res.end();
  }catch(err){
    next(err);
  }
}

async function doAssociate(req, res, next) {
  try{
    const idExam = req.body.exam_id;
    const idLab = req.body.lab_id;
    const associate = await ExamLabService.doAssociate({idLab, idExam});
    res.send(associate);
  }catch(err){
    next(err);
  }
}

async function doDisassociate(req, res, next) {
  try{
    const idExam = req.params.exam_id;
    const idLab = req.params.lab_id;
    const disassociate = await ExamLabService.doDisassociate(idLab, idExam);
    res.send(disassociate);
  }catch(err){
    next(err);
  }
}

async function getLabs_Exams(req, res, next) {
  try{
    const name = req.params.name;
    const exam = await ExamLabService.getLabs_Exams(name);
    res.send(exam);
  }catch(err){
    next(err);
  }
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