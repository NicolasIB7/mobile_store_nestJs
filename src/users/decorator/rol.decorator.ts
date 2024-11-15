import { SetMetadata } from "@nestjs/common";
import { Role } from "../entities/rol.enum";


export const ROLES_KEY = "rolES";
export const Roles =(...roles:Role[])=>SetMetadata(ROLES_KEY, roles);