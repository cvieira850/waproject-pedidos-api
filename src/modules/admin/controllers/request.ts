import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { Request } from 'modules/database/models/request';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RequestRepository } from '../repositories/request';
import { RequestService } from '../services/request';
import { ListValidator } from '../validators/request/list';
import { SaveValidator } from '../validators/request/save';

@ApiTags('Admin: Request')
@Controller('/request')
@AuthRequired([enRoles.admin])
export class RequestController {
  constructor(private RequestRepository: RequestRepository, private requestService: RequestService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Request] })
  public async list(@Query() model: ListValidator) {
    console.log(this.RequestRepository.list(model));
    return this.RequestRepository.list(model);
  }

  @Get(':requestId')
  @ApiResponse({ status: 200, type: Request })
  public async details(@Param('requestId', ParseIntPipe) requestId: number) {
    return this.RequestRepository.findById(requestId);
  }

  @Delete(':requestId')
  public async delete(@Param('requestId', ParseIntPipe) requestId: number) {
    return this.requestService.remove(requestId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Request })
  public async save(@Body() model: SaveValidator) {
    return this.requestService.save(model);
  }
}
