import pg from 'pg'; 

const pool = new pg.Pool({
  host: '192.168.1.20',
  user: 'postgres',
  database: 'esp_ota_manager',
  max: 20,
  password: 'postgresSuperUserPsw',
});

interface Callback {
  (err: null | Error, res?: pg.QueryResult): void | Error | pg.QueryResult
}

export const db = {
  query: (text:string, params: any[] = [], callback: Callback) => {
    return pool.query(text, params, callback);
  },
};             
