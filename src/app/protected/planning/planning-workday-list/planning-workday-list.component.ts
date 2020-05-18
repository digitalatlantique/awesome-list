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

  }

  onWorkdayRemoved(dueDate: string) {
    console.log(dueDate);
  }

}
