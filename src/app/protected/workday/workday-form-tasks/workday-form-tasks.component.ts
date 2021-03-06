import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from '../../../core/services/toastr.service';

@Component({
  selector: 'al-workday-form-tasks',
  templateUrl: './workday-form-tasks.component.html',
  styles: []
})
export class WorkdayFormTasksComponent implements OnInit {

  @Input()
  tasks: FormArray;

  @Input()
  workdayForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  createTaskForm(): FormGroup {

    return  this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ]],
      todo: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(6)
      ]],
      done: 0
    });
  }

  onAddedTask() {

      const task = this.createTaskForm();
      this.tasks.push(task);
  }

  onRemovedTask(index: number) {

    this.tasks.removeAt(index);
  }

}
