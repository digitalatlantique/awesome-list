import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Workday} from '../../../shared/models/workday';
import {AuthService} from '../../../core/services/auth.service';
import {WorkdaysService} from '../../../core/services/workdays.service';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: []
})
export class PlanningWorkdayListComponent implements OnInit {

  public workdays$: Observable<Workday>;

  public workdays;

  constructor(private authService: AuthService,
              private workdaysService: WorkdaysService) { }

  ngOnInit(): void {
    const id: string = this.authService.currentUser.id;
    this.workdays$ = this.workdaysService.getWorkDayByUser(id);
  }

  onWorkdayRemoved(dueDate: string) {
    console.log(dueDate);
  }

}
