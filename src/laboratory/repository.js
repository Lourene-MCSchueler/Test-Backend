import connect from '../db.js';

async function insertLab(lab){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `INSERT INTO labs (name, address, created_at, updated_at)
    VALUES($1, $2, $3, $4) RETURNING *`
    const values = [lab.name, lab.address, now, now];
    const result = await conn.query(sql, values);
    return result.rows[0];
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

async function getAllLabs(){
  const conn = await connect();
  try{
    const sql = `SELECT * FROM labs`
    const result = await conn.query(sql);
    return result.rows
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

async function updateLab(lab){
  const conn = await connect();
  try{
    const now = new Date();
    const sql = `UPDATE labs SET name = $1, address = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING *`
    const values = [lab.name, lab.address, lab.status, now, lab.id];
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
    const sql = `DELETE FROM labs WHERE id = $1`
    await conn.query(sql, [id]);
  }catch(err){
    throw err;
  }finally {
    conn.release();
  }
}

export default {
  insertLab,
  getAllLabs,
  getActiveLabs,
  getLabById,
  updateLab,
  deleteLab
}