const  { Pool, Client } = require('pg');
const path = require('path'); 

const dotenvResult = require('dotenv').config({
  override: true,
  path: path.join(__dirname, 'dev.env')
});
if (dotenvResult.error) {
  throw dotenvResult.error;
}

const pool =  new Pool({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.PORT
    });
pool.connect((err)=>{
  if(err){
    console.log(err)
    return;
  }
  else{
    console.log("conncet to database on Aws server")
  }
});
module.exports = pool;
