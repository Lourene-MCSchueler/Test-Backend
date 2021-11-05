import LabRepository from './repository.js';

async function createLab(lab) {
  return await LabRepository.insertLab(lab);
}

async function getActiveLabs() {
  return await LabRepository.getActiveLabs();
}

async function updateLab(lab, id){
  return await LabRepository.updateLab(lab, id);
}

async function deleteLab(id){
  return await LabRepository.deleteLab(id);
}

async function getLabs_ExamsById(id) {
  return await LabRepository.getLabs_ExamsById(id);
}

async function getLabById(id) {
  return await LabRepository.getLabById(id);
}

export default {
  createLab,
  getActiveLabs,
  updateLab,
  deleteLab,
  getLabs_ExamsById,
  getLabById
}