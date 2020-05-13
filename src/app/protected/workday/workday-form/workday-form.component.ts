import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {WorkdaysService} from '../../../core/services/workdays.service';
import {Workday} from '../../../shared/models/workday';
import {Task} from '../../../shared/models/task';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: []
})
export class WorkdayFormComponent implements OnInit {

  workdayForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private workdayService: WorkdaysService,
              private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.workdayForm = this.createWorkdayForm();
  }

  submit(): void {

    const cUserId: string = this.authService.currentUser.id;

    const workday = new Workday({...{userId: cUserId}, ...this.workdayForm.value});
    this.workdayService.save(workday).subscribe(
      _ => this.router.navigate(['/app/planning']),
      _ => this.workdayForm.reset()
    );

    console.log(this.workdayForm.value);
  }
  // TODO limiter le nombre de tâche à 6
  createWorkdayForm(): FormGroup {
    return this.formBuilder.group({
      dueDate: ['', [
        Validators.required
      ]],
      tasks: this.formBuilder.array([], [
        Validators.required,
        Validators.maxLength(6)
      ]),
      notes: ['', [
        Validators.maxLength(1000)
      ]]
    });
  }

  onDateSelected(displayDate: string) {
    this.workdayService.getWorkdayByDate(displayDate).subscribe(workday => {
      this.resetWorkdayForm();
      if (workday) {
        this.fillInForm(workday);
      }
    });
  }

  fillInForm(workday: Workday) {
    this.notes.setValue(workday.notes);
    workday.tasks.forEach(task => {
      const taskField: FormGroup = this.formBuilder.group({
        title: task.title,
        todo: task.todo,
        done: task.done
      });
      this.tasks.push(taskField);
    });
  }

  resetWorkdayForm() {
    while (this.tasks.length !== 0) {
      this.tasks.removeAt(0);
    }
    this.notes.reset();
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
