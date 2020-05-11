import {Task} from './task';

export class Workday {

  readonly id: string;
  notes?: string;
  dueDate: number;
  displayDate: string;
  tasks: Task[];
  userId: string;

  constructor(options: {
    id?: string,
    notes?: string,
    dueDate?: number,
    displayDate?: string,
    tasks?: Task[],
    userId: string
  }) {
    this.id = options.id || '';
    this.notes = options.notes || '';
    this.dueDate = options.dueDate || 0;
    this.displayDate = options.displayDate || '';
    this.tasks = options.tasks || [new Task()];
    this.userId = options.userId;
  }

}
