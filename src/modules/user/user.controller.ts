import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Role } from '../../libs/common/enums/role.enum';
import { UserActiveInterface } from '../../libs/common/interfaces/user-active.interface';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ActiveUser, Auth } from '../../libs/decorators';




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
