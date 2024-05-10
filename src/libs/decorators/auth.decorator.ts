import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../libs/common/enums/role.enum";
import { Roles } from "./roles.decorator";
import { JwtAuthGuard, RolesGuard } from "../auth/guard";



export function Auth(role: Role) {
  return applyDecorators(
    Roles(role), 
    UseGuards(JwtAuthGuard, RolesGuard)
);
}