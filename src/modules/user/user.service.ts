import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import {hash} from 'bcrypt';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User>{
    const {password,email}=createUserDto
    const existingUser = await this.userModel
    .findOne({ email })
    .exec();
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    
    const plainToHash= await hash(password, 10) 
    createUserDto={...createUserDto,password:plainToHash}
    
    const createdUser= await this.userModel.create(createUserDto)
    
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOneByEmailToRegister(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
