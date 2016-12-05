import { Injectable } from '@angular/core';
import { Task } from './task.class';

@Injectable()
export class TaskFactory {
  public tasks: Task[] = [];
  
  constructor() {}
}
