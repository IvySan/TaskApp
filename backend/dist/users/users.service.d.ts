import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: Prisma.UserUncheckedCreateInput): Promise<{
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        createdAt: Date;
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
    findOne(id: number): Promise<{
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
    findOneByEmail(email: string): Promise<{
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
    findUsersOnProject(projectId: number): Promise<{
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    }[]>;
    findUsersNotOnProject(projectId: number): Promise<{
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    }[]>;
    updateUserInfo(id: number, updateUserDto: Prisma.UserUncheckedUpdateInput): Promise<{
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
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
    getTimesForUserAndTask(userId: number): Promise<{
        id: number;
        time: string;
        date: string;
        createdAt: Date;
        userId: number;
        taskId: number;
    }[]>;
    remove(id: number): Promise<[Prisma.BatchPayload, {
        id: number;
        admin: boolean;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        createdAt: Date;
    }]>;
    addTaskToUser(userId: number, info: any): Promise<{
        userId: number;
        taskId: number;
    }>;
    removeTaskFromUser(userId: any, data: any): Promise<{
        userId: number;
        taskId: number;
    }>;
}
