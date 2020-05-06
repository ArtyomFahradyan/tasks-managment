import { Injectable } from '@nestjs/common';
import { TasksModel, TasksStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: TasksModel[] = [];

  get allTasks(): TasksModel[] {
    return this.tasks;
  }

  set allTasks(tasks: TasksModel[]) {
    this.tasks = tasks;
  }

  getTaskById(id: string): TasksModel {
    return this.tasks.find(task => task.id === id);
  }

  updateTaskStatus(id: string, status: TasksStatus): TasksModel {
    let retTask: TasksModel;
    this.allTasks = this.tasks.map(task => {
      if (task.id === id) {
        task.status = TasksStatus[status];
        retTask = task;
      }
      return task;
    });

    return retTask;
  }

  deleteTask(id: string): TasksModel[] {
    const tasks: TasksModel[] = this.tasks.filter(task => task.id !== id);
    this.allTasks = tasks;
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const task: TasksModel = {
      ...createTaskDto,
      status: TasksStatus.OPEN,
      id: uuidv4()
    };

    this.tasks.push(task);
    return task;
  }
}
