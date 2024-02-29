import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TasksService } from 'src/tasks/tasks.service';
export declare class ProjectsService {
    private prisma;
    private taskService;
    constructor(prisma: PrismaService, taskService: TasksService);
    create(createProjectDto: Prisma.ProjectCreateInput): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        tasks: {
            id: number;
            title: string;
            status: string;
            description: string;
            createdAt: Date;
            projectId: number;
        }[];
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
            projectId: number;
        })[];
    } & {
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        tasks: {
            id: number;
            title: string;
            status: string;
            description: string;
            createdAt: Date;
            projectId: number;
        }[];
        users: {
            userId: number;
            projectId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    }>;
    findProjectsForUser(userId: any): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    }[]>;
    updateProjectInfo(id: number, updateProjectDto: Prisma.ProjectUncheckedUpdateInput): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    }>;
    addProjectToUser(userId: number, info: any): Promise<{
        userId: number;
        projectId: number;
    }>;
    removeProjectFromUser(userId: any, data: any): Promise<{
        userId: number;
        projectId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    }>;
}
