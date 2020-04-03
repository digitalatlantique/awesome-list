import { Component, OnInit } from '@angular/core';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: []
})
export class PlanningWorkdayListComponent implements OnInit {

  // TODO gérer subject

  public workdays$;

  public workdays;

  constructor() { }

  ngOnInit(): void {
    this.workdays = [
      { dueDate: 'Lundi', doneTasks: 1, remainingTasks: 3 },
      { dueDate: 'Mardi', doneTasks: 0, remainingTasks: 2 },
      { dueDate: 'Mercredi', doneTasks: 1, remainingTasks: 0 }
    ];

    this.workdays$ = of(this.workdays).pipe(delay(1000));
  }

  onWorkdayRemoved(dueDate: string) {
    this.workdays = this.workdays.filter(workday =>
      !dueDate.includes(workday.dueDate)
    );
    this.workdays$ = of(this.workdays);
  }

}
