import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: Prisma.UserUncheckedCreateInput): Promise<void>;
}
