import { UserService } from '../services/user.service';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { isNumber, IsNumber, IsPositive } from 'class-validator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }


  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(@Body() payload: UpdateUserDto, id: number) {
    return this.userService.update(id, payload);
  }

  @Patch(':id')
  updatePartial(@Body() payload: UpdateUserDto, id: number) {
    return this.userService.update(id, payload);
  }
}