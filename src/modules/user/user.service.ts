import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {hash} from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>) {}
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
    const users = await this.userModel.find().exec();
    
    if (users.length === 0){
            throw new NotFoundException('Records not found in database');
    }

    return users;
  }

  async findOneById(id: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
  }
    const user = await this.userModel.findById(id).exec();
    console.log(user);

    
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
      throw new HttpException(`User email ${email} already exists`, HttpStatus.CONFLICT);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
  }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<string> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
  }
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return 'User deleted successfully'
  }

}
