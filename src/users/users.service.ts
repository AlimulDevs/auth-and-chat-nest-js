// users.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    private jwtService: JwtService
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<Users> {
    return this.userModel.findById(id).exec();
  }

  async create(user: Users): Promise<Users> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async login(user : Users) {
    const getUser = await this.userModel.findOne({
      email : user.email
    }).exec();
console.log(user.password)
console.log(getUser.password)
    if (getUser && await bcrypt.compare(user.password, getUser.password)) {
      const payload = { sub: getUser.id, email: user.email };
      return {
        id : getUser.id,
        email : getUser.email,
        access_token: await this.jwtService.signAsync(payload),
      };

    }
    throw new UnauthorizedException();
  }
}
