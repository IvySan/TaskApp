import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma:PrismaService, private taskService: TasksService) {}

  async create(createProjectDto: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({
      data:createProjectDto
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        tasks: true,
        users: {
          include : {
            user : true
          }
        }
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where:{id},
      include:{
        tasks: true,
        users: true
      }
    });
  }

  async findProjectsForUser(userId){

    const relations = await this.prisma.userProject.findMany({
      where : {
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

  async updateProjectInfo(id: number, updateProjectDto: Prisma.ProjectUncheckedUpdateInput) {
    return this.prisma.project.update({
          where:{id},
          data:updateProjectDto
        });
  }

  async addProjectToUser(userId:number, info){
    const {projectId} = info;
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

  async removeProjectFromUser(userId, data){
    const {projectId} = data;
    return this.prisma.userProject.delete({
      where: {
        userId_projectId : {
          userId,
          projectId 
        }
      }, 
    })
  }

  async remove(id: number) {

    const relations = await this.prisma.task.findMany({
      where : {
        projectId:id
      }
    });

    const taskIds = await relations.map(relation=>relation.id);

    await this.prisma.userTaskTime.deleteMany({
      where:{
        taskId:{
          in: taskIds
        }

      }
    })
    
    await this.prisma.task.deleteMany({
      where:{
        projectId:id,
      }
    });

    return this.prisma.project.delete({
      where: {id}
    });
  }
}
