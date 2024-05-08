import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional } from 'class-validator';
import { LoginAuthDto } from './login-auth.dyo';

export class RegisterAuthDto extends LoginAuthDto {
    @IsNotEmpty()
    name:string


    //no se que tan necesario es o no que cuando se registre un usuario este se pueda poner su rol
    @IsOptional()
    role:string
}
