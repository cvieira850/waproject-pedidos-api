import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IRequest } from 'modules/database/interfaces/request';
import { Request } from 'modules/database/models/request';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RequestRepository } from '../repositories/request';

@Injectable()
export class RequestService {
  constructor(private RequestRepository: RequestRepository) {}

  public async save(model: IRequest): Promise<Request> {
    if (!model.name || model.name === '') {
      throw new BadRequestException('name-required');
    }
    if (!model.amount || model.amount === 0) {
      throw new BadRequestException('amount-required');
    }
    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(requestId: number): Promise<void> {
    const request = await this.RequestRepository.findById(requestId);

    if (!request) {
      throw new NotFoundException('not-found');
    }

    return this.RequestRepository.remove(requestId);
  }

  private async create(model: IRequest): Promise<Request> {
    const request = await this.RequestRepository.insert(model);

    return request;
  }

  private async update(model: IRequest): Promise<Request> {
    const request = await this.RequestRepository.findById(model.id);

    if (!request) throw new NotFoundException('not-found');
    return this.RequestRepository.update({ ...request, ...model });
  }
}
