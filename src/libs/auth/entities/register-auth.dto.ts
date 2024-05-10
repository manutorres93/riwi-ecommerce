import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional } from 'class-validator';
import { LoginAuthDto } from './login-auth.dyo';

export class RegisterAuthDto extends LoginAuthDto {
    @IsNotEmpty()
    name:string

    @IsOptional()
    role:string

   
}
