import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean  {

    console.log(context);
    

    const role= this.reflector.getAllAndOverride<Role>(ROLES_KEY,[
      context.getHandler(),
      context.getClass(),
    ])

    console.log(role);
    

    if(!role){
      return true;
    }
    
   const {user} =context.switchToHttp().getRequest()
   console.log(user); 

   if(user.role === Role.ADMIN){
    return true;
   }


    return role ===user.role;
  }
}