import { TasksService } from './tasks.service';
import { Prisma } from '@prisma/client';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: Prisma.TaskUncheckedCreateInput): Promise<{
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    }>;
    findAll(userId: number): Promise<({
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
    findOne(id: number): Promise<{
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
    update(id: number, updateTaskDto: Prisma.TaskUncheckedUpdateInput): Promise<{
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        status: string;
        description: string;
        createdAt: Date;
        projectId: number;
    }>;
}
