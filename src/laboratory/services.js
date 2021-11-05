import LabRepository from './repository.js';

async function createLab(exam) {
  return await LabRepository.insertLab(exam);
}

async function getAllLabs() {
  return await LabRepository.getAllLabs();
}

async function getActiveLabs() {
  return await LabRepository.getActiveLabs();
}

async function getLabById(id) {
  return await LabRepository.getLabById(id);
}

async function updateLab(exam){
  return await LabRepository.updateLab(exam);
}

async function deleteLab(id){
  return await LabRepository.deleteLab(id);
}

export default {
  createLab,
  getAllLabs,
  getActiveLabs,
  getLabById,
  updateLab,
  deleteLab
}