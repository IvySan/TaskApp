import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: Prisma.UserUncheckedCreateInput): Promise<{
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        createdAt: Date;
    }>;
    updateTimeOnTask(data: {
        userId: number;
        taskId: number;
        time: string;
        date: string;
    }): Promise<{
        id: number;
        time: string;
        date: string;
        createdAt: Date;
        userId: number;
        taskId: number;
    }>;
    findAll(): Promise<({
        tasks: ({
            task: {
                id: number;
                title: string;
                status: string;
                description: string;
                createdAt: Date;
                projectId: number;
            };
        } & {
            userId: number;
            taskId: number;
        })[];
    } & {
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    })[]>;
    getTimesForUserAndTask(userId: number): Promise<{
        id: number;
        time: string;
        date: string;
        createdAt: Date;
        userId: number;
        taskId: number;
    }[]>;
    getUsersOnProject(projectId: number): Promise<{
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    }[]>;
    getUsersNotOnProject(projectId: number): Promise<{
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        tasks: {
            userId: number;
            taskId: number;
        }[];
    } & {
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    updateUserInfo(id: number, updateUserDto: Prisma.UserUncheckedUpdateInput): Promise<{
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    addTaskToUser(id: string, data: {
        taskId: number;
    }): Promise<{
        userId: number;
        taskId: number;
    }>;
    remove(id: string): Promise<[Prisma.BatchPayload, {
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    }]>;
    removeTaskFromUser(id: string, data: {
        taskId: number;
    }): Promise<{
        userId: number;
        taskId: number;
    }>;
}
