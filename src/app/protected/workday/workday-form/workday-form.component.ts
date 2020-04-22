import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: []
})
export class WorkdayFormComponent implements OnInit {

  workdayForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.workdayForm = this.createWorkdayForm();
  }

  submit() {
    console.log(this.workdayForm.value);
  }

  createWorkdayForm(): FormGroup {
    return this.formBuilder.group({
      dueDate: ['', [
        Validators.required
      ]],
      tasks: [this.formBuilder.array([]), [
        Validators.required,
        Validators.maxLength(6)
      ]],
      notes: ['', [
        Validators.maxLength(1000)
      ]]
    });
  }

  get dueDate() {
    return this.workdayForm.get('dueDate');
  }

  get tasks() {
    return this.workdayForm.get('tasks') as FormArray;
  }

  get notes() {
    return this.workdayForm.get('notes');
  }

}
