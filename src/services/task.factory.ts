import { Injectable } from '@angular/core';
import { Task } from '../models';

@Injectable()
export class TaskFactory {
  public tasks: Task[] = [];
  
  constructor() {}
}
