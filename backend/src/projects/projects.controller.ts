import { AdminGuard } from './../users/admin.guards/admin.guard';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';

import { Prisma } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProjectDto:Prisma.ProjectCreateInput) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Get(':userId/getProjectsForUser')
  getProjectsForUser(@Param('userId') userId: string) {
    return this.projectsService.findProjectsForUser(+userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Prisma.ProjectUncheckedUpdateInput) {
    return this.projectsService.updateProjectInfo(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @Post(':id/addProject')
  addProjectToUser(@Param('id') id: string, @Body() data : {projectId : number}){
    return this.projectsService.addProjectToUser(+id, data)
  }

  @Delete(':id/removeProject')
  removeProjectFromUser(@Param('id') id: string, @Body() data : {projectId : number}){
    return this.projectsService.removeProjectFromUser(+id, data)
  }
  
}
