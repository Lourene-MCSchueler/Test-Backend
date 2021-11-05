import LabService from './services.js';

async function createLab(req, res, next) {
  try{
    const newLab = req.body;
    if(!newLab.name || !newLab.address){
      throw new Error("Nome e endereço do laboratório são obrigatórios!");
    }
    const lab = await LabService.createLab(newLab)
    res.send(lab);
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

async function updateLab(req, res, next) {
  try {
    const id = req.params.id;
    const lab = req.body;
    const keys = Object.keys(lab);
    const result = await LabService.getLabById(id)
    if(result){
      if(!keys.includes('name') || !keys.includes('address') || !keys.includes('status')){
        throw new Error("Nome, endereço e status do laboratório são obrigatórios!");
      }
      const updatedLab = await LabService.updateLab(lab, id);
      res.send(updatedLab);
    } throw new Error("Laboratório não encontrado!");
    }catch (err){
    next(err);
  }
}

async function deleteLab(req, res, next) {
  try {
    const id = req.params.id;
    const result = await LabService.getLabs_ExamsById(id); 
    if(result.rows){
      throw new Error("Existe uma associação para este laboratório. Faça a desassociação antes de inativar o laboratório.")
    } 
    await LabService.deleteLab(id);
    res.send("Laboratório desativado com sucesso!").end();
  }catch (err){
    next(err);
  }
}

export default {
createLab,
getActiveLabs,
updateLab,
deleteLab
}