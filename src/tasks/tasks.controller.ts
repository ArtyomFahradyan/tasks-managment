import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksModel, TasksStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {  }

  @Get()
  getAllTasks(): TasksModel[] {
    return this.tasksService.allTasks;
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): TasksModel {
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TasksStatus
  ) {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): TasksModel[] {
    return this.tasksService.deleteTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): TasksModel {
    return this.tasksService.createTask(createTaskDto);
  }

}
