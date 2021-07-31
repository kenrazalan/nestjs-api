import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, Param, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthCreateInput } from './user.type';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private authService: UserService) { }
  @Post()
  async create(@Body() body: AuthCreateInput, @Res() res: Response) {
  const user = await this.authService.findByEmail(body.email)
    if (user) {
      throw new HttpException('Email already registered.', HttpStatus.BAD_REQUEST);
    }
    const newAuth = await this.authService.create(body);
    res.json(newAuth);
  }

  @Get('/:id')
  async getUser(@Body() body, @Res() res: Response) {
    const user = await this.authService.findByEmail(body)
    res.json(user)
  }
  @Get()
  getEpisodes(): Promise<any> {
    return this.authService.findAll();
  }
}
