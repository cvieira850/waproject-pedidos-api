import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IRequest } from 'modules/database/interfaces/request';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const requests = await knex
    .count()
    .from('Request')
    .first();

  if (Number(requests.count) !== 1) return;

  for (let x = 0; x < 100; x++) {
    const name = faker.commerce.productName();
    const type = faker.commerce.department();
    const amount = faker.random.number({ min: 2, max: 30 });
    const request: IRequest = {
      name,
      type,
      amount,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(request).into('Request');
  }
}
