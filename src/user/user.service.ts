import { Users } from './user.entity';
import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCreateInput, AuthLoginInput, STATUS } from './user.type';
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
        status: STATUS.failed,
        message: "Empty Input Fields",
      }, HttpStatus.NOT_FOUND);
    }
    else if (!new Date(dob).getTime()) {
      throw new HttpException({
        status: STATUS.failed,
        message: "Invalid Date",
      }, HttpStatus.NOT_FOUND);
    }
    else {
      const user = await this.UserRepo.findOne({ where: { email } })
      if (user) {
        throw new HttpException({
          status: STATUS.failed,
          message: "Email already registered.",
        }, HttpStatus.NOT_FOUND);
      }
      else {
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

  async login(params: AuthLoginInput) {
    let { email, password } = params;
    email = email.trim()
    password = password.trim()
    if ( !email || !password) {
      throw new HttpException({
        status: STATUS.failed,
        message: "Please provide email or password",
      }, HttpStatus.NOT_FOUND);
    }
    else {
      const user = await this.UserRepo.findOne({ where: { email } })
      if (!user) {
        throw new HttpException({
          status: STATUS.failed,
          message: "Email not found.",
        }, HttpStatus.NOT_FOUND);
      }
      else {
        const hashedPassword = user.password
        const result = await bcrypt.compare(password, hashedPassword)
        if(result) {
          user.password = undefined
          return {
            user,
            status: STATUS.success,
            message: "Login Success"
          }
        }
        else {

            throw new HttpException({
              status: STATUS.failed,
              message: "Email or password incorrect.",
            }, HttpStatus.NOT_FOUND);
          
        }
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
