"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tasks_service_1 = require("../tasks/tasks.service");
let ProjectsService = class ProjectsService {
    constructor(prisma, taskService) {
        this.prisma = prisma;
        this.taskService = taskService;
    }
    async create(createProjectDto) {
        return this.prisma.project.create({
            data: createProjectDto
        });
    }
    async findAll() {
        return this.prisma.project.findMany({
            include: {
                tasks: true,
                users: {
                    include: {
                        user: true
                    }
                }
            },
        });
    }
    async findOne(id) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                tasks: true,
                users: true
            }
        });
    }
    async findProjectsForUser(userId) {
        const relations = await this.prisma.userProject.findMany({
            where: {
                userId
            }
        });
        const projectIds = await relations.map(relation => relation.projectId);
        const projects = await this.prisma.project.findMany({
            where: {
                id: {
                    in: projectIds
                }
            }
        });
        return projects;
    }
    async updateProjectInfo(id, updateProjectDto) {
        return this.prisma.project.update({
            where: { id },
            data: updateProjectDto
        });
    }
    async addProjectToUser(userId, info) {
        const { projectId } = info;
        return this.prisma.userProject.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                project: {
                    connect: { id: projectId },
                },
            },
        });
    }
    async removeProjectFromUser(userId, data) {
        const { projectId } = data;
        return this.prisma.userProject.delete({
            where: {
                userId_projectId: {
                    userId,
                    projectId
                }
            },
        });
    }
    async remove(id) {
        const relations = await this.prisma.task.findMany({
            where: {
                projectId: id
            }
        });
        const taskIds = await relations.map(relation => relation.id);
        await this.prisma.userTaskTime.deleteMany({
            where: {
                taskId: {
                    in: taskIds
                }
            }
        });
        await this.prisma.task.deleteMany({
            where: {
                projectId: id,
            }
        });
        return this.prisma.project.delete({
            where: { id }
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, tasks_service_1.TasksService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map