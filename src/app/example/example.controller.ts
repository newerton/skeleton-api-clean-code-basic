import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ErrorSchema } from '@app/@common/documentation/error.schema';
import { JoiValidationPipe } from '@app/@common/pipes/joi-validation.pipe';
import { CoreApiResponse } from '@core/@shared/domain/api/CoreApiResponse';
import { CreateExampleUseCase } from '@core/example/application/use-case/CreateExampleUseCase';
import { DeleteExampleUseCase } from '@core/example/application/use-case/DeleteExampleUseCase';
import { ExampleUseCaseDto } from '@core/example/application/use-case/dto/ExampleUseCaseDto';
import { GetExampleUseCase } from '@core/example/application/use-case/GetExampleUseCase';
import { ListAllExampleUseCase } from '@core/example/application/use-case/ListAllExampleUseCase';
import { UpdateExampleUseCase } from '@core/example/application/use-case/UpdateExampleUseCase';
import { ExampleDITokens } from '@core/example/domain/di/ExampleDITokens';
import { CreateExampleAdapter } from '@core/example/infrastructure/adapter/use-case/CreateExampleAdapter';
import { UpdateExampleAdapter } from '@core/example/infrastructure/adapter/use-case/UpdateExampleAdapter';

import {
  CreateExampleInputDto,
  CreateExampleOutputDto,
} from './dto/create-example.dto';
import { GetExampleOutputDto } from './dto/get-example.dto';
import { ListAllExampleOutputDto } from './dto/list-all-example.dto';
import {
  UpdateExampleInputDto,
  UpdateExampleOutputDto,
} from './dto/update-example.dto';
import { CreateExampleSchema } from './validations/create-example.schema.validation';
import { UpdateExampleSchema } from './validations/update-example.schema.validation';

@Controller('example')
@ApiTags('example')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
})
export class ExampleController {
  constructor(
    @Inject(ExampleDITokens.CreateExampleUseCase)
    private createUseCase: CreateExampleUseCase,

    @Inject(ExampleDITokens.ListAllExampleUseCase)
    private listAllUseCase: ListAllExampleUseCase,

    @Inject(ExampleDITokens.GetExampleUseCase)
    private getUseCase: GetExampleUseCase,

    @Inject(ExampleDITokens.UpdateExampleUseCase)
    private updateUseCase: UpdateExampleUseCase,

    @Inject(ExampleDITokens.DeleteExampleUseCase)
    private deleteUseCase: DeleteExampleUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateExampleInputDto })
  @ApiResponse({ status: HttpStatus.OK, type: ErrorSchema })
  async create(
    @Body(new JoiValidationPipe(new CreateExampleSchema()))
    body: CreateExampleInputDto,
  ): Promise<CreateExampleOutputDto> {
    const adapter: CreateExampleAdapter = await CreateExampleAdapter.new({
      name: body.name,
      password: body.password,
      is_active: body.is_active ?? false,
    });

    const created: ExampleUseCaseDto =
      await this.createUseCase.execute(adapter);

    return CoreApiResponse.success(created);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ListAllExampleOutputDto })
  async findAll() {
    const model: ExampleUseCaseDto[] = await this.listAllUseCase.execute();
    return CoreApiResponse.success(model);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: GetExampleOutputDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const model: ExampleUseCaseDto = await this.getUseCase.execute(id);
    return CoreApiResponse.success(model);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(new UpdateExampleSchema()))
    body: UpdateExampleInputDto,
  ): Promise<UpdateExampleOutputDto> {
    const adapter: UpdateExampleAdapter = await UpdateExampleAdapter.new({
      id,
      name: body.name,
      is_active: body.is_active ?? false,
    });

    const updated: ExampleUseCaseDto =
      await this.updateUseCase.execute(adapter);

    return CoreApiResponse.success(updated);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }
}
