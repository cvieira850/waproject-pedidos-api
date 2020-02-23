import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IRequest } from '../interfaces/request';

export class Request extends Model implements IRequest {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public name: string;
  @ApiProperty({ type: 'string' })
  public type?: string;
  @ApiProperty({ type: 'integer' })
  public amount: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Request';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatJson(data: IRequest): IRequest {
    return data;
  }
}
