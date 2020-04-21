import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'al-parameters',
  templateUrl: './parameters.component.html',
  styles: []
})
export class ParametersComponent implements OnInit {

  parametersForm: FormGroup;
  pomodos: number[] = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  constructor(public formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.parametersForm = this.formBuilder.group({
      pomodoro: ['', [Validators.required]]
    });
  }
  onSubmit() {
    const user: User = this.authService.currentUser;
    user.pomodoroDuration = this.parametersForm.get('pomodoro').value * 60
    this.authService.updateUserState(user).subscribe();
    console.log(user);
  }
}
