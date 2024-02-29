import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: Prisma.TaskUncheckedCreateInput): Promise<{
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    }>;
    findAll(userId?: any): Promise<({
        project: {
            id: number;
            title: string;
            description: string;
            createdAt: Date;
        };
        users: ({
            user: {
                id: number;
                admin: boolean;
                firstname: string;
                lastname: string;
                email: string;
                password: string;
                createdAt: Date;
            };
        } & {
            userId: number;
            taskId: number;
        })[];
    } & {
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    })[]>;
    findAllByProjectId(projectId: number): Promise<({
        project: {
            id: number;
            title: string;
            description: string;
            createdAt: Date;
        };
        users: {
            userId: number;
            taskId: number;
        }[];
    } & {
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    })[]>;
    findOne(taskWhereUniqueInput: Prisma.TaskWhereUniqueInput): Promise<{
        project: {
            id: number;
            title: string;
            description: string;
            createdAt: Date;
        };
        users: {
            userId: number;
            taskId: number;
        }[];
    } & {
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    }>;
    update(where: Prisma.TaskWhereUniqueInput, data: Prisma.TaskUpdateInput): Promise<{
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    }>;
    remove(where: Prisma.TaskWhereUniqueInput): Promise<{
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    }>;
}
