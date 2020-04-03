import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styleUrls: ['./planning-workday-item.component.scss']
})
export class PlanningWorkdayItemComponent implements OnChanges {

  @Input()
  dueDate: string;

  @Input()
  doneTasks: number | string;

  @Input()
  remainingTasks: number | string;

  @Output()
  workdayRemoved = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {

    for (const propName in changes) {
      this.update(propName, changes[propName].currentValue);
    }
  }
  update(propName, propValue) {

    switch (propName) {
      // TODO vérifier valeurs tableau
      case 'dueDate': {
        if ('Lundi' === this.dueDate) {
          this.dueDate += '(Aujourd\'hui)';
        }
        break;
      }

      case 'doneTasks': {
        if (0 === propValue) {
          this.doneTasks = 'Aucune tâche terminée.';
        }
        break;
      }

      case 'remainingTasks': {
        if (0 === propValue) {
          this.remainingTasks = 'Journée de travail terminée';
        }
        break;
      }
    }
  }

  removeWorkday(dueDate: string) {
    this.workdayRemoved.emit(dueDate);
  }
}
