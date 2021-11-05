import express from 'express';
import ExamLabController from './controller.js';

const router = express.Router();

router.post('/', ExamLabController.createExam);
router.get('/active', ExamLabController.getActiveExams);
router.put('/:id', ExamLabController.updateExam);
router.delete('/:id', ExamLabController.deleteExam);

router.post('/associate', ExamLabController.doAssociate);
router.delete('/disassociate/exam/:exam_id/lab/:lab_id', ExamLabController.doDisassociate);
router.get('/name/:name', ExamLabController.getLabsByExamName);

export default router;