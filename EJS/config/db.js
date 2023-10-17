const knex = require('knex')
require('dotenv').config();
const knexfile = require('./knexfile')

const db = knex(knexfile.development)

async function create_users_table() {
    const tableExists = await db.schema.hasTable('users');
    
        if(!tableExists) {
    
           return db.schema.createTable('restaurant', (table) => {
           
                }).then(() => {
                console.log('restaurant" table created');
                });
                }
    }



create_users_table();

module.exports = db;