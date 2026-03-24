import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.query("select 1")
  .then(() => console.log("Postgres conectado"))
  .catch(err => console.error("Error Postgres:", err));


export default pool;
