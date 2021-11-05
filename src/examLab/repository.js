import connect from '../db.js';

async function insertExam(exam){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `INSERT INTO exams (name, type, created_at)
    VALUES($1, $2, $3) RETURNING *`
    const values = [exam.name, exam.type, now];
    const result = await conn.query(sql, values);
    return result.rows[0];
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function getActiveExams(){
  const conn = await connect();
  try{
    const sql = `SELECT * FROM exams WHERE status = true`
    const result = await conn.query(sql);
    return result.rows;
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function updateExam(exam, id){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `UPDATE exams SET name = $1, type = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING *`
    const values = [exam.name, exam.type, exam.status, now, id];
    const result = await conn.query(sql, values);
    return result.rows[0];
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function deleteExam(id){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `UPDATE exams SET status = $1, deleted_at = $2 WHERE id = $3`
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
    FROM exams INNER JOIN labs_exams ON labs_exams.exam_id = exams.id INNER JOIN labs ON labs.id = labs_exams.lab_id WHERE exams.id = $1`
    const result = await conn.query(sql, [id]);
    return result.rows;
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}



//----------------------------------associates------------------------------------------//

async function doAssociate(idExam, idLab){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `INSERT INTO labs_exams (exam_id, lab_id, created_at)
    VALUES($1, $2, $3) RETURNING *`
    const values = [idExam, idLab, now];
    const result = await conn.query(sql, values);
    return result.rows[0];
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function doDisassociate(idExam, idLab){
  const conn = await connect();
  try{
    const sql = `DELETE FROM labs_exams WHERE exam_id = $1 AND lab_id = $2`
    const values = [idExam, idLab];
    await conn.query(sql, values);
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function getExamById(id){
  const conn = await connect();
  try{
    const sql = `SELECT * FROM exams WHERE id = $1`
    const result = await conn.query(sql, [id]);
    return result.rows[0];
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function getLabsByExamName(name){
  const conn = await connect();
  try{
    const sql = `SELECT exams.id as exame_id, exams.name as exame, labs.id as lab_id, labs.name as laboratorio, labs.address as lab_endereco 
    FROM exams INNER JOIN labs_exams ON labs_exams.exam_id = exams.id INNER JOIN labs ON labs.id = labs_exams.lab_id WHERE exams.name = $1`
    const result = await conn.query(sql, [name]);
    return result.rows;
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

export default {
  insertExam,
  getActiveExams,
  updateExam,
  deleteExam,
  getLabs_ExamsById,
  doAssociate,
  doDisassociate,
  getExamById,
  getLabsByExamName,
}

