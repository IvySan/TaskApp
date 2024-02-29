import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(createUserDto: Prisma.UserUncheckedCreateInput): Promise<void>;
    login(user: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            tasks: {
                userId: number;
                taskId: number;
            }[];
            id: number;
            admin: boolean;
            firstname: string;
            lastname: string;
            email: string;
            createdAt: Date;
        };
    }>;
}
