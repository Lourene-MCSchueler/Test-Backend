import connect from '../db.js';

async function insertLab(lab){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `INSERT INTO labs (name, address, created_at)
    VALUES($1, $2, $3) RETURNING *`
    const values = [lab.name, lab.address, now];
    const result = await conn.query(sql, values);
    return result.rows[0];
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function getActiveLabs(){
  const conn = await connect();
  try{
    const sql = `SELECT * FROM labs WHERE status = true`
    const result = await conn.query(sql);
    return result.rows;
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function updateLab(lab, id){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `UPDATE labs SET name = $1, address = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING *`
    const values = [lab.name, lab.address, lab.status, now, id];
    const result = await conn.query(sql, values);
    return result.rows[0];
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function deleteLab(id){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `UPDATE labs SET status = $1, deleted_at = $2 WHERE id = $3`
    const values = [false, now, id]
    await conn.query(sql, values)
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function getLabs_ExamsById(id){
  const conn = await connect();
  try{
    const sql = `SELECT exams.id as exame_id, exams.name as exame, labs.id as lab_id, labs.name as laboratorio, labs.address as lab_endereco 
    FROM exams INNER JOIN labs_exams ON labs_exams.exam_id = exams.id INNER JOIN labs ON labs.id = labs_exams.lab_id WHERE labs.id = $1`
    const result = await conn.query(sql, [id]);
    return result.rows;
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function getLabById(id){
  const conn = await connect();
  try{
    const sql = `SELECT * FROM labs WHERE id = $1`
    const result = await conn.query(sql, [id]);
    return result.rows[0];
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

export default {
  insertLab,
  getActiveLabs,
  updateLab,
  deleteLab,
  getLabs_ExamsById,
  getLabById
}