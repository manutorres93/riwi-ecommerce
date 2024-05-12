import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../../libs/common/enums/role.enum';
import {  ApiProperty } from '@nestjs/swagger';


@Schema({ timestamps: true })
export class User extends Document {
 
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({  required: true, default:Role.USER, enum:Role })
  role: string;

  
}

export const UserSchema = SchemaFactory.createForClass(User);