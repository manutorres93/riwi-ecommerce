import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "src/libs/common/enums/role.enum";
import { Roles } from "./roles.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../auth/guard/roles.guard";


export function Auth(role: Role) {
  return applyDecorators(
    Roles(role), 
    UseGuards(JwtAuthGuard, RolesGuard)
);
}