import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(taskId: string): Task {
    const foundTask = this.tasks.find((task) => task.id === taskId);
    if (!foundTask) {
      throw new NotFoundException(`No task found with the id -- ${taskId} `);
    }
    return foundTask;
  }

  updateTaskStatus(taskId: string, status: TaskStatus): Task {
    const task = this.getTaskById(taskId);
    task.status = status;
    return task;
  }

  deleteTask(taskId: string): void {
    const foundTask = this.getTaskById(taskId);
    this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  }
}
