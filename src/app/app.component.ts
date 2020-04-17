import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {UsersService} from './core/services/users.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.tryAutoLogin();
  }

  private tryAutoLogin() {

    const token = localStorage.getItem('token');

    if (token) {
      const expirationDate = + localStorage.getItem('expirationDate');
      const now = new Date().getTime();

      if (now < expirationDate) {
        const userId = localStorage.getItem('userId');
        this.usersService.get(userId, token).subscribe(user => {
          this.authService.autoLogin(user);
        });
      }
    }
  }
}
