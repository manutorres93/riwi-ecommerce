import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Request} from 'express'
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){  

    constructor(private readonly jwtService: JwtService) {
        super(); // Call the parent constructor
      }
    
      async canActivate(context: ExecutionContext): Promise<boolean> {
       
    
        const request = context.switchToHttp().getRequest();
        console.log(request.headers.authorization);
        
        const token = this.extractTokenFromHeader(request);
    
        if (!token) {
          throw new UnauthorizedException();
        }
    
        try {
          const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET, 
          });
          request.user = payload;
        } catch (error) {
          throw new UnauthorizedException();
        }
    
        return true;
      }
    
      private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
      }
    
}