import { ProjectsService } from './projects.service';
import { Prisma } from '@prisma/client';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
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
    findOne(id: string): Promise<{
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
    getProjectsForUser(userId: string): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    }[]>;
    update(id: string, updateProjectDto: Prisma.ProjectUncheckedUpdateInput): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
    }>;
    addProjectToUser(id: string, data: {
        projectId: number;
    }): Promise<{
        userId: number;
        projectId: number;
    }>;
    removeProjectFromUser(id: string, data: {
        projectId: number;
    }): Promise<{
        userId: number;
        projectId: number;
    }>;
}
