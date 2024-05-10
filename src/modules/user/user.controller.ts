import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/libs/auth/guard/jwt-auth.guard';
import { RequestWithUser } from './interfaces/request-user.interface';
import { Roles } from 'src/libs/decorators/roles.decorator';
import { RolesGuard } from 'src/libs/auth/guard/roles.guard';
import { Role } from '../../libs/common/enums/role.enum';
import { Auth } from 'src/libs/decorators/auth.decorator';
import { ActiveUser } from 'src/libs/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/libs/common/interfaces/user-active.interface';



@ApiBearerAuth()
@Auth(Role.ADMIN)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()  
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get()
  findAll(@ActiveUser() user:UserActiveInterface) {
    console.log(user);
    return this.userService.findAll();
  }


  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
