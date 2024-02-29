import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(loginUser: {
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
    validate(req: any): any;
}
