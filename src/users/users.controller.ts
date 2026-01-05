import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'Usuário criado com sucesso',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      message: 'Usuários listados com sucesso',
      data: users,
      total: users.length,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return {
      message: 'Usuário encontrado com sucesso',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      message: 'Usuário atualizado com sucesso',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
