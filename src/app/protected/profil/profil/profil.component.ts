import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'al-profil',
  templateUrl: './profil.component.html',
  styles: []
})
export class ProfilComponent implements OnInit {

  profilForm: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.profilForm = this.createProfilForm();
  }

  submit() {

    this.user.name = this.name.value;
    this.user.avatar = this.avatar.value;

    this.authService.updateUserState(this.user).subscribe();
  }

  private createProfilForm(): FormGroup {

    return this.formBuilder.group({
      name: [this.user.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_-éèêëàâäôöùûü]*$')
      ]],
      avatar: [this.user.avatar, [
        Validators.required, Validators.pattern('https?://.+')
      ]]
    });
  }

  get name() {
    return this.profilForm.get('name');
  }
  get avatar() {
    return this.profilForm.get('avatar');
  }
}
