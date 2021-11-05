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

async function getActiveExams(req, res, next) {
  try{
    const exams = await ExamLabService.getActiveExams();
    res.send(exams);
  }catch(err){
    next(err);
  }
}

async function updateExam(req, res, next) {
  try {
    const id = req.params.id;
    const exam = req.body;
    const keys = Object.keys(exam);
    const result = await ExamLabService.getExamById(id);
    if(result){
      if(!keys.includes('name') || !keys.includes('type') || !keys.includes('status')){
        throw new Error("Nome, tipo e status do exame são obrigatórios!");
      }
      const updatedExam = await ExamLabService.updateExam(exam, id);
      res.send(updatedExam); 
    } throw new Error("Exame não encontrado!");
    }catch(err){
    next(err);
  }
}

async function deleteExam(req, res, next) {
  try {
    const id = req.params.id;
    const result = await ExamLabService.getLabs_ExamsById(id); 
    if(result.rows){
      throw new Error("Existe uma associação para este exame. Faça a desassociação antes de inativar o exame.")
    } 
    await ExamLabService.deleteExam(id);
    res.send("Exame desativado com sucesso!").end();
  }catch(err){
    next(err);
  }
}

//-------------------------------------associates-------------------------------------//

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
    res.send(`O exame ${idExam} foi desassociado do laboratório ${idLab}`);
  }catch(err){
    next(err);
  }
}

async function getLabsByExamName(req, res, next) {
  try{
    const name = req.params.name;
    const exam = await ExamLabService.getLabsByExamName(name);
    res.send(exam);
  }catch(err){
    next(err);
  }
}

export default {
  createExam,
  getActiveExams,
  updateExam,
  deleteExam,
  doAssociate,
  doDisassociate,
  getLabsByExamName
}