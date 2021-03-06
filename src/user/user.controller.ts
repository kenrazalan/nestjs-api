import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, Param, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthCreateInput, AuthLoginInput } from './user.type';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private authService: UserService) { }
  @Post('signup')
  async create(@Body() body: AuthCreateInput, @Res() res: Response) {

    const data = await this.authService.create(body);
    res.json({
      data,
      status: "SUCCESS",
      message: "Signup Successfully. "
    });
  }

  @Post('login')
  async login(@Body() body: AuthLoginInput, @Res() res: Response) {

    const data = await this.authService.login(body);
    res.json(data);
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
