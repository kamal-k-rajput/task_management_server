import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus, Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './Dto/create-task.dto';
import { GetTasksFilterDto } from './Dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor() {}

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    // do something with status
    if (status) {
      tasks = tasks.filter((task) => (task.status = status));
    }
    //do something with search

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
      });
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TasksStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  findTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  deleteTaskById(id: string): Task {
    const taskId = this.tasks.findIndex((task) => (task.id = id));
    const task = this.tasks[taskId];
    this.tasks = this.tasks.splice(taskId, 1);
    return task;
  }

  updateTaskStatus(id: string, status: TasksStatus) {
    const task = this.findTaskById(id);
    task.status = status;
    return task;
  }
}
