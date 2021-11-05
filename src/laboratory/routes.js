import express from 'express';
import LabController from './controllers.js';

const router = express.Router();

router.post('/', LabController.createLab);
router.get('/', LabController.getAllLabs);
router.get('/active', LabController.getActiveLabs);
router.get('/:id',LabController.getLabById);
router.put('/', LabController.updateLab);
router.delete('/:id', LabController.deleteLab);

export default router;