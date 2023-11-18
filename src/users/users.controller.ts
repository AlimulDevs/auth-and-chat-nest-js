// users.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.model';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const data = await this.usersService.findAll();
      res.status(200).json({
        isSuccess: true,
        message: 'success delete user',
        data: data,
      });
      return;
    } catch (error) {
      res.status(500).json({
        isSuccess: false,
        message: 'failed delete user',
        error: error,
      });
      return;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const data = await this.usersService.findById(id);

      res.status(200).json({
        isSuccess: true,
        message: 'success get user by id',
        data: data,
      });
      return;
    } catch (error) {
      res.status(500).json({
        isSuccess: false,
        message: 'failed get user by id',
        error: error,
      });
    }
  }

  @Post()
  async create(
    @Body() createUserDto: Users,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.usersService.create(createUserDto);

      res.status(200).json({
        isSuccess: true,
        message: 'success create user',
        data: data,
      });

      return;
    } catch (error) {
      res.status(500).json({
        isSuccess: false,
        message: 'failed create user',
        error: error,
      });
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res: Response): void {
    try {
      this.usersService.delete(id);

      res.status(200).json({
        isSuccess: true,
        message: 'success delete user',
      });
    } catch (error) {
      res.status(500).json({
        isSuccess: false,
        message: 'failed delete user',
        error: error,
      });
    }
  }

  @Post("login")
  async login(
    @Body() createUserDto: Users,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.usersService.login(createUserDto);

      res.status(200).json({
        isSuccess: true,
        message: 'success login user',
        data: data,
      });

      return;
    } catch (error) {
      res.status(500).json({
        isSuccess: false,
        message: 'failed login user',
        error: error,
      });
    }
  }

}
