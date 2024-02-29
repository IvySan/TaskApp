import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private prisma: PrismaService;
  
  constructor( prisma: PrismaService) {
    this.prisma = prisma;
  }

  // async create(createUserDto: Prisma.UserUncheckedCreateInput) {
  //   return this.prisma.user.create({
  //     data:createUserDto,
  //   });
  // }

  async create(createUserDto: Prisma.UserUncheckedCreateInput) {
    
    createUserDto.password = await bcrypt.hash(createUserDto.password,10);
   const user = await this.prisma.user.create({
      data:createUserDto,
    });

    const {password, ...userWithouthPassword} = user;

    return userWithouthPassword;
  }

  //getUsers
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        tasks: {
          include : {
            task : true
          }
        }
    },
    });
  }

  //getUser
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where:{id},
      include:{
        tasks:true
      }
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where:{email},
      include:{
        tasks:true
      }
    });
  }

  async findUsersOnProject(projectId:number){

    const relations =await this.prisma.userProject.findMany({
      where : {
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

  async findUsersNotOnProject(projectId:number) {
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

  async updateUserInfo(id: number, updateUserDto: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
          where:{id},
          data:updateUserDto
        });
  }

 

  async updateTimeOnTask(data : { userId : number, taskId: number, time : string, date: string}){

    const timeExsists = await this.prisma.userTaskTime.findMany({
      where:{
        userId: data.userId,
        taskId: data.taskId,
        date: data.date
      }
    })

    if(timeExsists[0]){
      await this.prisma.userTaskTime.deleteMany({
      where:{
        userId:data.userId,
        taskId:data.taskId,
        date: data.date
      }
    })
    }

    return await this.prisma.userTaskTime.create({
      data: {
        userId: data.userId,
        taskId: data.taskId,
        time: data.time,
        date: data.date,
      },
    })
  }
  


  async getTimesForUserAndTask(userId : number){
    return await this.prisma.userTaskTime.findMany({
      where : {
        userId
      }
    })
  }

  //brise usera i povezane taskove
  async remove(id: number) {

    const deleteTasks = this.prisma.userTask.deleteMany({
      where: {userId : id}
    })
    
    const deleteUser = this.prisma.user.delete({
      where: {id}
    })
    
    return await this.prisma.$transaction([deleteTasks, deleteUser])
  }


  async addTaskToUser(userId:number, info){
    const {taskId}=info;
    return this.prisma.userTask.create({
      data:{
        user:{
          connect:{ id:userId },
        },
        task:{
          connect: {id:taskId},
        },
      },
    });
  }

  async removeTaskFromUser(userId, data){
    const {taskId} = data;
    await this.prisma.userTaskTime.deleteMany({
      where: {
          userId,
          taskId,
        },
    });
    return this.prisma.userTask.delete({
      where: {
        userId_taskId : {
          userId,
          taskId 
        }
      }, 
    })
  }

  
}
