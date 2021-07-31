import { Users } from './user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCreateInput } from './user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private UserRepo: Repository<Users>,
  ) { }
  async create(params: AuthCreateInput): Promise<Users> {
    const { fullname, email, dob, password } = params
    if (!fullname || !email || !dob || !password) {
      throw new HttpException('Empty Input', HttpStatus.BAD_REQUEST);
    }
    else if (!new Date(dob).getTime()) {
      throw new HttpException(' Invalid Date', HttpStatus.BAD_REQUEST);
    } else {
      const User = await this.UserRepo.find({email})
      console.log(User)
      // if(User.length){
      //     throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
      // }
      const episode = this.UserRepo.create(params);
      return episode.save();

    }
  }
  async findByEmail(email: string): Promise<Users> {
    try {
      const user = await this.UserRepo.findOne({where: {email}})
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
