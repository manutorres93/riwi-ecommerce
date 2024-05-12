import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional } from 'class-validator';
import { LoginAuthDto } from './login-auth.dyo';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto extends LoginAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsOptional()
    role:string

   
}
