import {
  Body,
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../domain/interfaces/user.service.interface';
import { BaseController } from 'src/shared/application/controllers/base.controller';
import { CreateUserDto } from '../dto/user.create.dto';
import { UpdateUserDto } from '../dto/user.update.dto';
import { UserDto } from 'src/users/application/dto/user.dto';
import { UserMapper } from '../mapper/user.mapper';
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { User } from 'src/users/domain/entities/user.type';
import { Request, Response } from 'express';
import { Roles } from 'src/shared/application/decorators/roles.decorator';
import { SelectDto } from 'src/shared/application/dto/select.dto';

@Controller('users')
export class UserController extends BaseController {
  private mapper: UserMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject('UserService') private readonly service: UserService) {
    super();
    this.mapper = new UserMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<UserDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: User) => this.mapper.toDto(d)),
    };
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Get('select')
  async findSelect(@Query() query): Promise<SelectDto[]> {
    const search = query.search || '';
    const data = await this.service.findSearch(search);
    return data.map((d: UserDto) => this.mapper.toDtoSelect(d));
  }

  @Roles(null)
  @UseGuards(AuthGuard)
  @Get('roles')
  async getUserRoles(@Req() req: Request): Promise<string[]> {
    const id = req['user']?.id;
    const data = await this.service.getRolesById(id);
    return data;
  }

  @Roles(null)
  @UseGuards(AuthGuard)
  @Get('profile')
  async getOwnData(@Req() req: Request): Promise<UserDto> {
    const id = req['user']?.id;
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(user));
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Post('export')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename=users.xlsx')
  async export(@Res() res: Response) {
    const data = await this.service.export();
    res.send(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(user),
    );
    return this.mapper.toDto(data);
  }
}
