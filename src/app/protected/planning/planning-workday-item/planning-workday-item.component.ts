import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Workday} from '../../../shared/models/workday';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styleUrls: ['./planning-workday-item.component.scss']
})
export class PlanningWorkdayItemComponent implements OnChanges {

  @Input()
  workday: Workday;

  @Output()
  workdayRemoved = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {

    for (const propName in changes) {
      this.update(propName, changes[propName].currentValue);
    }
  }
  update(propName, propValue) {

  }

  removeWorkday(dueDate: string) {

    this.workdayRemoved.emit(dueDate);
  }
}
