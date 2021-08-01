import { Users } from './user.entity';
import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCreateInput } from './user.type';
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private UserRepo: Repository<Users>,
  ) { }
  async create(params: AuthCreateInput): Promise<Users> {
    const { fullname, email, dob, password } = params
    if (!fullname || !email || !dob || !password) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: "Empty Input Fields",
        error: "Failed"
      }, HttpStatus.NOT_FOUND);
    }
    else if (!new Date(dob).getTime()) {

      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: "Invalid Date",
        error: "Failed"
      }, HttpStatus.NOT_FOUND);

    } else {
      const user = await this.UserRepo.findOne({ where: { email } })
      if (user) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: "Email already registered.",
          error: "Failed"
        }, HttpStatus.NOT_FOUND);
      } else {
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const episode = this.UserRepo.create({
          ...params,
          password: hashedPassword
        });

        return episode.save();
      }
    }
  }
  async findByEmail(email: string): Promise<Users> {
    try {
      const user = await this.UserRepo.findOne({ where: { email } })
      return user
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Users[]> {
    try {
      return this.UserRepo.find();
    } catch (error) {
      throw error;
    }

  }
}
