
const { Model } = require('objection');
const knex = require('../../config/database')


Model.knex(knex);

class Meal extends Model {
    static tableName = 'meals';

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                price: { type: 'integer' },
                description: { type: 'string' },
                is_vegetarian: { type: 'string' },
                created_at: { type: 'boolean' },
                updated_at: { type: 'string' }
            }
        };
    };
  }

  module.exports = Meal;