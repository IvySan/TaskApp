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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: createUserDto,
        });
        const { password, ...userWithouthPassword } = user;
        return userWithouthPassword;
    }
    async findAll() {
        return this.prisma.user.findMany({
            include: {
                tasks: {
                    include: {
                        task: true
                    }
                }
            },
        });
    }
    async findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                tasks: true
            }
        });
    }
    async findOneByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                tasks: true
            }
        });
    }
    async findUsersOnProject(projectId) {
        const relations = await this.prisma.userProject.findMany({
            where: {
                projectId: {
                    equals: projectId,
                },
            }
        });
        const userIds = await relations.map(relation => relation.userId);
        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            }
        });
        return users;
    }
    async findUsersNotOnProject(projectId) {
        const relations = await this.prisma.userProject.findMany({
            where: {
                projectId: {
                    equals: projectId,
                },
            }
        });
        const projectUserIds = await relations.map(relation => relation.userId);
        const allUsers = await this.prisma.user.findMany();
        const usersNotOnProject = allUsers.filter(user => !projectUserIds.includes(user.id));
        return usersNotOnProject;
    }
    async updateUserInfo(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto
        });
    }
    async updateTimeOnTask(data) {
        const timeExsists = await this.prisma.userTaskTime.findMany({
            where: {
                userId: data.userId,
                taskId: data.taskId,
                date: data.date
            }
        });
        if (timeExsists[0]) {
            await this.prisma.userTaskTime.deleteMany({
                where: {
                    userId: data.userId,
                    taskId: data.taskId,
                    date: data.date
                }
            });
        }
        return await this.prisma.userTaskTime.create({
            data: {
                userId: data.userId,
                taskId: data.taskId,
                time: data.time,
                date: data.date,
            },
        });
    }
    async getTimesForUserAndTask(userId) {
        return await this.prisma.userTaskTime.findMany({
            where: {
                userId
            }
        });
    }
    async remove(id) {
        const deleteTasks = this.prisma.userTask.deleteMany({
            where: { userId: id }
        });
        const deleteUser = this.prisma.user.delete({
            where: { id }
        });
        return await this.prisma.$transaction([deleteTasks, deleteUser]);
    }
    async addTaskToUser(userId, info) {
        const { taskId } = info;
        return this.prisma.userTask.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                task: {
                    connect: { id: taskId },
                },
            },
        });
    }
    async removeTaskFromUser(userId, data) {
        const { taskId } = data;
        await this.prisma.userTaskTime.deleteMany({
            where: {
                userId,
                taskId,
            },
        });
        return this.prisma.userTask.delete({
            where: {
                userId_taskId: {
                    userId,
                    taskId
                }
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map