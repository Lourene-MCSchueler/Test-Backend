import LabService from './services.js';

async function createLab(req, res, next) {
  try{
    const newLab = req.body;
    if(!newLab.name || !newLab.address){
      res.status(400).json({ message: "Nome e endereço do laboratório são obrigatórios!" });
    }
    const lab = await LabService.createLab(newLab)
    res.send(lab);
  }catch(err){
    next(err);
  }
}

async function getAllLabs(req, res, next) {
  try{
    const labs = await LabService.getAllLabs();
    res.send(labs);
  }catch(err){
    next(err);
  }
}

async function getActiveLabs(req, res, next) {
  try{
    const labs = await LabService.getActiveLabs();
    res.send(labs);
  }catch(err){
    next(err);
  }
}

async function getLabById(req, res, next) {
  try{
    const id = req.params.id;
    const lab = await LabService.getLabById(id);
    res.send(lab);
  }catch(err){
    next(err);
  }
}

async function updateLab(req, res, next) {
  try {
    const lab = req.body;
    if(!lab.id || !lab.name || !lab.address || !lab.status){
      throw new Error("Id, nome e endereço do laboratório são obrigatórios!");
     }
    const updatedLab = await LabService.updateLab(lab);
    res.send(updatedLab);
    }catch (err){
    next(err);
  }
}

async function deleteLab(req, res, next) {
  try {
    const id = req.params.id;
    await LabService.deleteLab(id);
    res.send(`Laboratório ${id} deletado com sucesso.`).end();
  }catch (err){
    next(err);
  }
}


export default {
createLab,
getAllLabs,
getActiveLabs,
getLabById,
updateLab,
deleteLab
}