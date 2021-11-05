import express from 'express';
import LabController from './controllers.js';

const router = express.Router();

router.post('/', LabController.createLab);
router.get('/active', LabController.getActiveLabs);
router.put('/:id', LabController.updateLab);
router.delete('/:id', LabController.deleteLab);

export default router;