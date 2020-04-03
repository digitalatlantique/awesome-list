export class Task {

  static readonly pomodoroLimit: number = 5;
  title: string;
  todo: number;
  done: number;
  completed: boolean;

  constructor(options: {
    title?: string,
    todo?: number,
    done?: number,
    completed?: boolean,
  } = {})  {

    this.title = options.title || '';
    this.todo = options.todo || 1;
    this.done = options.done || 0;
    this.completed = options.completed || false;
  }

}
