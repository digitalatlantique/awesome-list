import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public readonly user$: Observable<User | null> = this.user.asObservable();

  constructor() { }

  public login(email: string, password: string): Observable<User | null> {
    return of(new User());
  }

  public register(name: string, email: string, password: string): Observable<User | null> {
    return of(new User());
  }

  public logout(): Observable<null> {
    return of(null);
  }
}
