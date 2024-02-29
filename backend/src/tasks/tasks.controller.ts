import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Prisma } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto:Prisma.TaskUncheckedCreateInput) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('userId') userId: number) {
    return this.tasksService.findAll(userId);
  }

  @Get()
  findAllByProjectId(@Param('project/:projectId') projectId:number) {
    return this.tasksService.findAllByProjectId(projectId);
  }

  //za metodu sa tipovima iz Prisma.
  @Get(':id')
  findOne(@Param('id') id:number) {
    return this.tasksService.findOne({id:+id});
  }

  // @Get(':id')
  // findOne(@Param('id') id:number) {
  //   return this.tasksService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id:number, @Body() updateTaskDto: Prisma.TaskUncheckedUpdateInput) {
    return this.tasksService.update({id:+id}, updateTaskDto);
  }
  
  // @Put(':id')
  // update(@Param('id') id:number, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove({id:+id});
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tasksService.remove(+id);
  // }
}
