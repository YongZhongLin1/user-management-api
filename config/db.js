const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'arrivo',
  password: 'ArR1V0PWd',
  port: 5432,
});

async function executeQuery(queryText, params = []) {
  let client;
  try {
    client = await pool.connect();
    console.log(queryText, params)
    const result = await client.query(queryText, params);
    console.log(result.rowCount)
    client.release();
    return [result.rowCount, result.rows];
  } catch (error) {
    if (client) {
      client.release();
    }
    throw error;
  }
}

module.exports = {
  executeQuery
};
