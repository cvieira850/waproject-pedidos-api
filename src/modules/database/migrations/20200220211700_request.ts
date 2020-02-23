import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Request', table => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.string('type', 50).nullable();
    table.integer('amount', 11).notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('Request');
}
