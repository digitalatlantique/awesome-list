import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BsLocaleService} from 'ngx-bootstrap';
import {DateService} from '../../../core/services/date.service';

@Component({
  selector: 'al-workday-form-date',
  templateUrl: './workday-form-date.component.html',
  styles: []
})
export class WorkdayFormDateComponent implements OnInit {

  @Input()
  dueDate: FormControl;

  @Output()
  dateSelected = new EventEmitter<string>();

  constructor(private localeService: BsLocaleService, private dateService: DateService) { }

  ngOnInit(): void {
    this.localeService.use('fr');
  }

  selectDate(date: Date = new Date()): void {
    const displayDate: string = this.dateService.getDisplayDate(date);
    this.dateSelected.emit(displayDate);
  }

}
