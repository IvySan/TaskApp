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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTaskDto) {
        const data = {
            ...createTaskDto
        };
        if (createTaskDto.users && createTaskDto.users[0]) {
            data.users = {
                create: [
                    { user: { connect: { id: createTaskDto.users[0] } } },
                ]
            };
        }
        return this.prisma.task.create({
            data
        });
    }
    async findAll(userId) {
        const options = userId ? { users: {
                some: {
                    user: { id: Number(userId) },
                }
            } } : {};
        return this.prisma.task.findMany({
            where: options,
            include: {
                project: true,
                users: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findAllByProjectId(projectId) {
        return this.prisma.task.findMany({
            where: { projectId },
            include: {
                project: true,
                users: true
            }
        });
    }
    async findOne(taskWhereUniqueInput) {
        return this.prisma.task.findUnique({
            where: taskWhereUniqueInput,
            include: {
                project: true,
                users: true
            }
        });
    }
    async update(where, data) {
        return this.prisma.task.update({
            where,
            data
        });
    }
    async remove(where) {
        await this.prisma.userTaskTime.deleteMany({
            where: {
                taskId: where.id,
            },
        });
        return this.prisma.task.delete({
            where
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map