import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks-item',
  templateUrl: './workday-form-tasks-item.component.html',
  styleUrls: ['./workday-form-tasks-item.component.scss']
})
export class WorkdayFormTasksItemComponent implements OnInit {

  @Input()
  index: number;

  @Input()
  isFirst: boolean;

  @Input()
  isLast: boolean;

  @Input()
  task: FormGroup;

  @Output()
  removedTask = new EventEmitter<number>();

  todoNumber = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit(): void {
  }

  selectTodo(pTodo: number) {
    this.task.patchValue({todo: pTodo});
  }

  removeTask(index: number) {
    this.removedTask.emit(index);
  }
}
