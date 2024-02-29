import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(
    private prisma:PrismaService
 ) {}

  //jednina jer je model u jednini(Task) Prisma.TaskCreateInput
  //samo kreira task
  // create(createTaskDto: Prisma.TaskCreateInput) {
  //   return this.prisma.task.create({
  //     data:createTaskDto
  //   });
  // }

  //kreira i task i dodeljuje mu projekat u okviru kog ce da bude
  async create(createTaskDto: Prisma.TaskUncheckedCreateInput) { 
    const data = {
      ...createTaskDto
    };

    if(createTaskDto.users && createTaskDto.users[0]){
      data.users = {
        create : [
          { user: { connect: { id: createTaskDto.users[0] } } },
        ]
      }
    }
    
    return this.prisma.task.create({
      data
    });
  }

  async findAll(userId?) {
    const options = userId ? {  users: {
      some: {
        user: {id : Number(userId)},
      }}} : {};

    return this.prisma.task.findMany({
      where : options,
      include:{
        project: true,
        users: {
          include : {
            user : true
          }
        }
      }
    });
  }


  async findAllByProjectId(projectId:number){
    return this.prisma.task.findMany({
      where: {projectId},
      include:{
        project:true,
        users:true
      }
    });

  }

  
  //ista kao funkcija findOne(id:number)
  async findOne(taskWhereUniqueInput: Prisma.TaskWhereUniqueInput) {
    return this.prisma.task.findUnique({
          where: taskWhereUniqueInput,
          include:{
            project:true,
            users:true
          }
    });
  }

  // findOne(id: number) {
  //   return this.prisma.task.findUnique({
  //         where:{id}
  //   });
  // }

  async update(where:Prisma.TaskWhereUniqueInput, data: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({
      where,
      data
    });
  }

  // update(id:number, updateTaskDto: Prisma.TaskUpdateInput) {
  //   return this.prisma.task.update({
  //     where:{id},
  //     data:updateTaskDto
  //   });
  // }

  async remove(where:Prisma.TaskWhereUniqueInput) {
    await this.prisma.userTaskTime.deleteMany({
      where: {
        taskId: where.id, 
      },
    });

    return this.prisma.task.delete({
      where
    });
  }

//   remove(id: number) {
//     return this.prisma.task.delete({
//       where: {id}
//     });
//  }

}
