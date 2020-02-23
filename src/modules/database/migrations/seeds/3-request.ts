import * as Knex from 'knex';
import { IRequest } from 'modules/database/interfaces/request';

export async function seed(knex: Knex): Promise<void> {
  const firstRequest: IRequest = {
    name: 'Cadeira',
    type: 'Escritorio',
    amount: 10,
    createdDate: new Date(),
    updatedDate: new Date()
  };

  await knex.insert(firstRequest).into('Request');
}
