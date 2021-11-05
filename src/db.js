import pg from 'pg';

async function connect(){
  if(global.connection){
    return global.connection.connect();
  }
  const connectionString = process.env.DB_CONNECTION;

  const pool = new pg.Pool({connectionString})
  global.connection = pool;

  return pool.connect();
}

export default connect